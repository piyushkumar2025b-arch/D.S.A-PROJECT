"""
╔══════════════════════════════════════════════════════════════════════╗
║   SAAP — Smart Autonomous Agent Platform                            ║
║   Streamlit Research Prototype  |  Powered by Groq (Free API)      ║
║   Model: llama-3.3-70b-versatile  |  No credit card required       ║
╚══════════════════════════════════════════════════════════════════════╝

Get your FREE Groq API key (no credit card):
  → https://console.groq.com  →  Sign up  →  API Keys  →  Create Key

Free tier limits (more than enough for demos & research):
  • 30 requests/minute  |  14,400 requests/day
  • 6,000 tokens/minute  |  500,000 tokens/day  (on llama-3.3-70b)
"""

import streamlit as st
import sqlite3
import uuid
import json
import os
import datetime
import time
from collections import Counter

# ─── Page config ──────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="SAAP – Smart Autonomous Agent Platform",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ─── Inject CSS for a polished look ───────────────────────────────────────────
st.markdown("""
<style>
    .stApp { background-color: #0f172a; }
    .stSidebar { background-color: #1e293b; }
    h1, h2, h3 { color: #f1f5f9; }
    .stMetric label { color: #94a3b8; }
    .stMetric value { color: #f1f5f9; }
    div[data-testid="stExpander"] { background: #1e293b; border: 1px solid #334155; border-radius: 8px; }
    .agent-card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 16px; margin: 6px 0; }
    .status-completed { color: #4ade80; font-weight: bold; }
    .status-failed    { color: #f87171; font-weight: bold; }
    .status-running   { color: #fbbf24; font-weight: bold; }
    .pill { display:inline-block; padding:2px 10px; border-radius:99px; font-size:0.75rem;
            background:#334155; color:#94a3b8; margin:2px; }
</style>
""", unsafe_allow_html=True)

# ─── SQLite Database ───────────────────────────────────────────────────────────
DB_PATH = os.path.join(os.path.dirname(__file__), "saap.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.executescript("""
    CREATE TABLE IF NOT EXISTS agents (
        id TEXT PRIMARY KEY, name TEXT UNIQUE NOT NULL, description TEXT,
        category TEXT, icon TEXT, actions TEXT DEFAULT '[]',
        timeout_seconds INTEGER DEFAULT 120
    );
    CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY, agent_name TEXT NOT NULL,
        status TEXT DEFAULT 'PENDING',
        payload TEXT DEFAULT '{}', result TEXT,
        started_at TEXT, completed_at TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS pipelines (
        id TEXT PRIMARY KEY, name TEXT NOT NULL,
        description TEXT DEFAULT '',
        steps TEXT DEFAULT '[]',
        created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS pipeline_runs (
        id TEXT PRIMARY KEY, pipeline_id TEXT, pipeline_name TEXT,
        status TEXT DEFAULT 'RUNNING',
        steps_completed INTEGER DEFAULT 0,
        total_steps INTEGER DEFAULT 0,
        results TEXT DEFAULT '[]',
        created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS knowledge_base (
        id TEXT PRIMARY KEY, title TEXT NOT NULL, content TEXT NOT NULL,
        tags TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now'))
    );
    """)

    agents = [
      ("ag-01","gmail-summary",    "Fetch unread Gmail emails and generate a smart digest with priorities and action items",
       "Google","📧",'["summarize_unread","send_digest","mark_read","search_emails"]',120),
      ("ag-02","calendar-manager", "Create, update, delete calendar events and summarise your daily/weekly schedule",
       "Google","📅",'["summarize_day","create_event","find_free_slots","weekly_agenda"]',60),
      ("ag-03","drive-manager",    "Organise Google Drive files, summarise documents, list folders and share files",
       "Google","📁",'["organize_root","summarize_docs","list_folder","search_files","share_file"]',180),
      ("ag-04","slack-agent",      "Summarise Slack channels, send messages and create standup reports",
       "Messaging","💬",'["summarize_channel","send_message","create_standup","list_channels"]',60),
      ("ag-05","github-agent",     "Generate PR digests, weekly engineering reports and create GitHub issues",
       "Dev Tools","🐙",'["pr_digest","weekly_report","create_issue","review_summary"]',90),
      ("ag-06","sheets-agent",     "Sync task results to Google Sheets, read/write data and create formatted reports",
       "Google","📊",'["create_report","sync_tasks","read_sheet","write_sheet"]',90),
      ("ag-07","notion-agent",     "Create Notion pages, search databases, append content and export data",
       "Productivity","📝",'["create_page","search_pages","append_block","export_database"]',90),
      ("ag-08","web-scraper",      "Scrape URLs, monitor page changes and extract structured data at scale",
       "Web","🌐",'["scrape_url","monitor_changes","extract_structured","bulk_scrape"]',60),
      ("ag-09","jira-agent",       "List, create and update Jira issues and generate sprint velocity reports",
       "Dev Tools","🎯",'["list_issues","create_issue","update_issue","weekly_report","add_comment"]',90),
      ("ag-10","airtable-agent",   "Read, write, bulk-create and AI-summarise Airtable tables",
       "Productivity","🗃️",'["list_records","create_record","update_record","bulk_create","ai_summary"]',60),
      ("ag-11","linear-agent",     "Manage Linear issues, generate sprint reports and list projects",
       "Dev Tools","🔷",'["list_issues","create_issue","update_issue","weekly_report","list_projects"]',60),
      ("ag-12","hubspot-agent",    "Manage HubSpot CRM contacts, update deals and generate pipeline reports",
       "CRM","🏢",'["list_contacts","create_contact","update_contact","list_deals","create_deal","crm_report"]',90),
    ]
    c.executemany(
        "INSERT OR IGNORE INTO agents (id,name,description,category,icon,actions,timeout_seconds) VALUES (?,?,?,?,?,?,?)",
        agents
    )

    # Seed knowledge base
    kb_items = [
        (str(uuid.uuid4()), "SAAP Architecture Overview",
         "SAAP uses a microservices architecture: Next.js frontend → Fastify API Gateway → FastAPI Orchestrator → Redis Queue → Python Worker Pool → PostgreSQL. All 12 agents run in the worker pool and communicate via Redis pub/sub for real-time SSE streaming.",
         '["architecture","overview"]'),
        (str(uuid.uuid4()), "Agent SDK Usage",
         "Custom agents extend BaseAgent and implement validate(payload) and async run(task_id, user_id, payload). Use _emit_progress() for streaming updates and _get_google_credentials() for OAuth. Install via: pip install saap-agent-sdk",
         '["sdk","development"]'),
        (str(uuid.uuid4()), "Research Roadmap",
         "Future research directions: (1) Multi-agent coordination patterns, (2) LLM cost optimisation per agent type, (3) Autonomous error recovery, (4) Cross-agent memory sharing, (5) Real-time collaboration between human and AI agents.",
         '["research","roadmap"]'),
    ]
    c.executemany(
        "INSERT OR IGNORE INTO knowledge_base (id,title,content,tags) VALUES (?,?,?,?)",
        kb_items
    )

    conn.commit(); conn.close()

init_db()

# ─── DB helpers ───────────────────────────────────────────────────────────────
def db():
    c = sqlite3.connect(DB_PATH)
    c.row_factory = sqlite3.Row
    return c

def get_agents():
    with db() as c:
        rows = c.execute("SELECT * FROM agents ORDER BY category, name").fetchall()
    return [dict(r) for r in rows]

def get_tasks(limit=100, agent_filter=None, status_filter=None):
    q = "SELECT * FROM tasks"
    params, conditions = [], []
    if agent_filter:  conditions.append("agent_name=?"); params.append(agent_filter)
    if status_filter: conditions.append("status=?");     params.append(status_filter)
    if conditions: q += " WHERE " + " AND ".join(conditions)
    q += " ORDER BY created_at DESC LIMIT ?"
    params.append(limit)
    with db() as c:
        rows = c.execute(q, params).fetchall()
    return [dict(r) for r in rows]

def save_task(task_id, agent_name, payload, status, result=None):
    now = datetime.datetime.utcnow().isoformat()
    completed = now if status in ("COMPLETED", "FAILED") else None
    with db() as c:
        c.execute(
            "INSERT OR REPLACE INTO tasks (id,agent_name,status,payload,result,started_at,completed_at,created_at) VALUES (?,?,?,?,?,?,?,?)",
            (task_id, agent_name, status, json.dumps(payload),
             json.dumps(result) if result else None, now, completed, now)
        )

def get_pipelines():
    with db() as c:
        rows = c.execute("SELECT * FROM pipelines ORDER BY created_at DESC").fetchall()
    return [dict(r) for r in rows]

def save_pipeline(pid, name, description, steps):
    with db() as c:
        c.execute(
            "INSERT OR REPLACE INTO pipelines (id,name,description,steps) VALUES (?,?,?,?)",
            (pid, name, description, json.dumps(steps))
        )

def delete_pipeline(pid):
    with db() as c:
        c.execute("DELETE FROM pipelines WHERE id=?", (pid,))

def save_pipeline_run(run_id, pipeline_id, pipeline_name, status, steps_done, total, results):
    with db() as c:
        c.execute(
            "INSERT OR REPLACE INTO pipeline_runs (id,pipeline_id,pipeline_name,status,steps_completed,total_steps,results) VALUES (?,?,?,?,?,?,?)",
            (run_id, pipeline_id, pipeline_name, status, steps_done, total, json.dumps(results))
        )

def get_kb():
    with db() as c:
        rows = c.execute("SELECT * FROM knowledge_base ORDER BY created_at DESC").fetchall()
    return [dict(r) for r in rows]

def add_kb(title, content, tags):
    with db() as c:
        c.execute(
            "INSERT INTO knowledge_base (id,title,content,tags) VALUES (?,?,?,?)",
            (str(uuid.uuid4()), title, content, json.dumps(tags))
        )

def delete_kb(kid):
    with db() as c:
        c.execute("DELETE FROM knowledge_base WHERE id=?", (kid,))

# ─── AI Runner (Groq – free, no credit card) ──────────────────────────────────
AGENT_PROMPTS = {
"gmail-summary": """You are a Gmail Summary Agent for an organisation.
Simulate reading the user's Gmail inbox and produce a realistic, detailed email digest.
Return ONLY valid JSON (no markdown, no explanation) with this exact structure:
{
  "action": "summarize_unread",
  "unread_count": <int>,
  "top_senders": [{"name":"..","email":"..","count":<int>}],
  "priority_items": [{"subject":"..","from":"..","urgency":"high|medium","summary":"..","action_needed":".."}],
  "digest_summary": "..",
  "action_items": ["..",".."],
  "labels_breakdown": {"INBOX":<int>,"STARRED":<int>,"IMPORTANT":<int>}
}""",

"calendar-manager": """You are a Calendar Manager Agent.
Simulate realistic Google Calendar operations and return ONLY valid JSON:
{
  "action": "..",
  "date": "..",
  "events": [{"time":"..","title":"..","duration_min":<int>,"attendees":[".."],"location":"..","notes":".."}],
  "free_slots": ["09:00-10:00","14:00-15:30"],
  "summary": "..",
  "productivity_tip": "..",
  "upcoming_deadlines": [".."]
}""",

"drive-manager": """You are a Google Drive Manager Agent.
Simulate Drive file organisation and return ONLY valid JSON:
{
  "action": "..",
  "files_processed": <int>,
  "folders_created": ["..",".."],
  "files_moved": [{"file":"..","from":"..","to":".."}],
  "documents_summarised": [{"name":"..","type":"..","size_kb":<int>,"summary":".."}],
  "space_reclaimed_mb": <float>,
  "recommendations": ["..",".."]
}""",

"slack-agent": """You are a Slack Agent for an organisation.
Simulate Slack channel operations and return ONLY valid JSON:
{
  "action": "..",
  "channel": "..",
  "messages_scanned": <int>,
  "key_topics": ["..",".."],
  "decisions_made": ["..",".."],
  "action_items": [{"task":"..","owner":"..","due":".."}],
  "standup_draft": "..",
  "sentiment": "positive|neutral|mixed",
  "active_members": ["..",".."]
}""",

"github-agent": """You are a GitHub Agent for an engineering team.
Simulate GitHub operations and return ONLY valid JSON:
{
  "action": "..",
  "repository": "..",
  "open_prs": [{"id":<int>,"title":"..","author":"..","status":"..","reviews":<int>,"additions":<int>,"deletions":<int>}],
  "merged_this_week": <int>,
  "issues_created": [{"id":<int>,"title":"..","label":"..","assignee":".."}],
  "weekly_summary": "..",
  "code_coverage": "..",
  "ci_status": "passing|failing|mixed"
}""",

"sheets-agent": """You are a Google Sheets Agent.
Simulate Sheets read/write operations and return ONLY valid JSON:
{
  "action": "..",
  "spreadsheet_name": "..",
  "sheet_tab": "..",
  "rows_processed": <int>,
  "columns": ["..",".."],
  "data_preview": [["col1","col2","col3"],["val","val","val"],["val","val","val"]],
  "formulas_applied": [".."],
  "chart_created": true,
  "report_highlights": ["..",".."],
  "export_url": "https://docs.google.com/spreadsheets/d/demo_id/edit"
}""",

"notion-agent": """You are a Notion Agent for a knowledge-driven team.
Simulate Notion operations and return ONLY valid JSON:
{
  "action": "..",
  "workspace": "..",
  "pages_affected": <int>,
  "page_titles": ["..",".."],
  "content_preview": "..",
  "database_records": [{"title":"..","status":"..","tags":[".."],"owner":".."}],
  "blocks_created": <int>,
  "page_url": "https://notion.so/demo-page-id"
}""",

"web-scraper": """You are a Web Scraper Agent.
Simulate web scraping and return ONLY valid JSON:
{
  "action": "..",
  "url": "..",
  "status_code": 200,
  "page_title": "..",
  "word_count": <int>,
  "links_found": <int>,
  "structured_data": {"headlines":["..",".."],"prices":[],"emails":[]},
  "changes_detected": false,
  "extraction_summary": "..",
  "scraped_at": ".."
}""",

"jira-agent": """You are a Jira Agent for a software development organisation.
Simulate Jira operations and return ONLY valid JSON:
{
  "action": "..",
  "project": "..",
  "sprint": "..",
  "issues": [{"id":"ENG-123","title":"..","status":"In Progress","priority":"High","assignee":"..","story_points":<int>}],
  "sprint_summary": "..",
  "velocity_points": <int>,
  "bugs_open": <int>,
  "stories_completed": <int>,
  "blockers": [".."]
}""",

"airtable-agent": """You are an Airtable Agent.
Simulate Airtable base operations and return ONLY valid JSON:
{
  "action": "..",
  "base_name": "..",
  "table_name": "..",
  "records_affected": <int>,
  "records": [{"id":"rec..","fields":{"Name":"..","Status":"..","Priority":"..","Owner":"..","Due":".."}},{"id":"rec..","fields":{"Name":"..","Status":"..","Priority":"..","Owner":"..","Due":".."}}],
  "ai_summary": "..",
  "views_available": ["Grid","Gallery","Kanban"],
  "automations_triggered": <int>
}""",

"linear-agent": """You are a Linear Agent for a product/engineering team.
Simulate Linear operations and return ONLY valid JSON:
{
  "action": "..",
  "team": "..",
  "cycle": "..",
  "issues": [{"id":"ENG-456","title":"..","status":"..","priority":"urgent|high|medium|low","labels":[".."],"estimate":<int>}],
  "cycle_summary": "..",
  "velocity_points": <int>,
  "projects": [{"name":"..","progress_pct":<int>,"status":".."}],
  "completion_rate_pct": <int>
}""",

"hubspot-agent": """You are a HubSpot CRM Agent.
Simulate HubSpot operations and return ONLY valid JSON:
{
  "action": "..",
  "contacts_affected": <int>,
  "deals_affected": <int>,
  "pipeline_value_usd": <float>,
  "contacts": [{"name":"..","company":"..","email":"..","lifecycle_stage":"..","last_activity":".."}],
  "deals": [{"name":"..","stage":"..","value_usd":<float>,"close_date":"..","probability_pct":<int>}],
  "crm_report": "..",
  "conversion_rate_pct": <float>,
  "revenue_this_month_usd": <float>
}""",
}

def call_groq(api_key: str, agent_name: str, payload: dict, extra_context: str = "") -> dict:
    """Call Groq API (free, llama-3.3-70b-versatile). Returns parsed result dict."""
    from groq import Groq
    client = Groq(api_key=api_key)

    system = AGENT_PROMPTS.get(agent_name, "You are a helpful AI agent. Return only valid JSON.")

    user_parts = [f"Execute this agent task and return detailed, realistic results as valid JSON only."]
    user_parts.append(f"\nAgent: {agent_name}")
    user_parts.append(f"Payload: {json.dumps(payload, indent=2)}")
    if extra_context:
        user_parts.append(f"\nContext from previous step:\n{extra_context}")

    resp = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=1800,
        temperature=0.4,
        messages=[
            {"role": "system", "content": system},
            {"role": "user",   "content": "\n".join(user_parts)},
        ]
    )

    raw = resp.choices[0].message.content.strip()
    # Strip markdown fences
    if raw.startswith("```"):
        lines = raw.split("\n")
        raw = "\n".join(lines[1:])
        if raw.endswith("```"):
            raw = raw[:-3].strip()

    try:
        result = json.loads(raw)
    except json.JSONDecodeError:
        # Try to extract JSON substring
        import re
        match = re.search(r'\{.*\}', raw, re.DOTALL)
        if match:
            try:
                result = json.loads(match.group())
            except:
                result = {"output": raw}
        else:
            result = {"output": raw}

    result["_meta"] = {
        "agent": agent_name,
        "model": resp.model,
        "tokens_in":  resp.usage.prompt_tokens,
        "tokens_out": resp.usage.completion_tokens,
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
    }
    return result

def run_agent_task(api_key: str, agent_name: str, payload: dict, extra_context: str = "") -> dict:
    task_id = str(uuid.uuid4())
    save_task(task_id, agent_name, payload, "RUNNING")
    try:
        result = call_groq(api_key, agent_name, payload, extra_context)
        save_task(task_id, agent_name, payload, "COMPLETED", result)
        return {"status": "COMPLETED", "task_id": task_id, "result": result}
    except Exception as e:
        err = {"error": str(e), "agent": agent_name}
        save_task(task_id, agent_name, payload, "FAILED", err)
        return {"status": "FAILED", "task_id": task_id, "result": err}

# ─── Default payloads per agent ───────────────────────────────────────────────
DEFAULT_PAYLOADS = {
    "gmail-summary":    {"action":"summarize_unread","max_emails":25,"label":"INBOX","include_drafts":False},
    "calendar-manager": {"action":"summarize_day","date":str(datetime.date.today()),"timezone":"Asia/Kolkata","include_tasks":True},
    "drive-manager":    {"action":"organize_root","dry_run":False,"create_folders":True,"archive_old_files":True},
    "slack-agent":      {"action":"summarize_channel","channel":"#engineering","hours":24,"include_threads":True},
    "github-agent":     {"action":"pr_digest","repo":"org/backend","days":7,"include_reviews":True},
    "sheets-agent":     {"action":"create_report","title":"Weekly Task Report","include_charts":True,"sheet":"Sheet1"},
    "notion-agent":     {"action":"create_page","title":"Research Notes — SAAP Agents","parent":"Knowledge Base","add_template":True},
    "web-scraper":      {"action":"scrape_url","url":"https://news.ycombinator.com","extract":["headlines","links"],"max_items":15},
    "jira-agent":       {"action":"list_issues","project":"ENG","sprint":"current","status":"In Progress","limit":10},
    "airtable-agent":   {"action":"ai_summary","base":"Project Tracker","table":"Tasks","group_by":"Status"},
    "linear-agent":     {"action":"weekly_report","team":"Engineering","cycle":"current","include_projects":True},
    "hubspot-agent":    {"action":"crm_report","days":30,"include_deals":True,"pipeline":"Sales"},
}

STATUS_ICON = {"COMPLETED":"✅","FAILED":"❌","RUNNING":"⏳","PENDING":"🕐"}

# ─── Sidebar ──────────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("## 🤖 SAAP Platform")
    st.caption("Smart Autonomous Agent Platform")
    st.divider()

    # API key input with auto-load from secrets
    secret_key = ""
    try:
        secret_key = st.secrets.get("GROQ_API_KEY", "")
    except:
        pass

    api_key = st.text_input(
        "🔑 Groq API Key (FREE)",
        value=secret_key,
        type="password",
        placeholder="gsk_...",
        help="Free key, no credit card. Get it at console.groq.com"
    )
    if secret_key:
        st.caption("✅ Key loaded from secrets")
    else:
        st.info("Get free key → [console.groq.com](https://console.groq.com)\nSign up → API Keys → Create Key")

    st.divider()
    page = st.radio("Navigate", [
        "🏠 Dashboard",
        "🚀 Run Agent",
        "🔗 Pipeline Builder",
        "🧪 Playground",
        "📜 Task History",
        "📊 Analytics",
        "📚 Knowledge Base",
        "ℹ️ Architecture",
    ], label_visibility="collapsed")

    st.divider()
    tasks_all = get_tasks(200)
    n_done  = sum(1 for t in tasks_all if t["status"]=="COMPLETED")
    n_fail  = sum(1 for t in tasks_all if t["status"]=="FAILED")
    c1, c2, c3 = st.columns(3)
    c1.metric("Total",   len(tasks_all))
    c2.metric("✅",       n_done)
    c3.metric("❌",       n_fail)

# ──────────────────────────────────────────────────────────────────────────────
#  PAGE: DASHBOARD
# ──────────────────────────────────────────────────────────────────────────────
if page == "🏠 Dashboard":
    st.title("🤖 SAAP — Smart Autonomous Agent Platform")
    st.markdown("**Research Prototype** · 12 AI agents · Powered by **Groq (free)** · Llama 3.3 70B")

    if not api_key:
        st.warning("👈 **Paste your free Groq API key** in the sidebar to start running agents.\n\n"
                   "Get one free (no credit card) at → **https://console.groq.com**  →  API Keys  →  Create Key")

    st.divider()
    agents = get_agents()
    categories = {}
    for a in agents:
        categories.setdefault(a["category"], []).append(a)

    for cat, cat_agents in categories.items():
        st.subheader(f"{cat}")
        cols = st.columns(4)
        for i, agent in enumerate(cat_agents):
            with cols[i % 4]:
                actions = json.loads(agent.get("actions","[]"))
                with st.container(border=True):
                    st.markdown(f"### {agent['icon']} `{agent['name']}`")
                    st.caption(agent["description"])
                    st.markdown(" ".join([f'<span class="pill">{a}</span>' for a in actions[:3]]),
                                unsafe_allow_html=True)
        st.markdown("")

    st.divider()
    st.subheader("📋 Recent Task Runs")
    recent = get_tasks(8)
    if not recent:
        st.info("No tasks yet — go to **Run Agent** to execute your first agent!")
    else:
        for t in recent:
            icon = STATUS_ICON.get(t["status"],"❓")
            with st.expander(f"{icon} `{t['agent_name']}` — {t['status']} — {t['created_at'][:19]} UTC"):
                c1, c2 = st.columns(2)
                with c1:
                    st.markdown("**Payload**"); st.json(json.loads(t["payload"]))
                with c2:
                    st.markdown("**Result**")
                    if t["result"]:
                        r = json.loads(t["result"]); r.pop("_meta", None); st.json(r)
                    else:
                        st.caption("—")

# ──────────────────────────────────────────────────────────────────────────────
#  PAGE: RUN AGENT
# ──────────────────────────────────────────────────────────────────────────────
elif page == "🚀 Run Agent":
    st.title("🚀 Run an Agent")
    st.markdown("Select any of the 12 agents, customise the payload and run it live.")

    agents    = get_agents()
    agent_map = {a["name"]: a for a in agents}
    labels    = [f"{a['icon']}  {a['name']}" for a in agents]
    label_map = {f"{a['icon']}  {a['name']}": a["name"] for a in agents}

    sel_label = st.selectbox("Choose Agent", labels)
    sel_name  = label_map[sel_label]
    sel_agent = agent_map[sel_name]

    actions = json.loads(sel_agent.get("actions","[]"))
    with st.container(border=True):
        col1, col2 = st.columns([2,1])
        with col1:
            st.markdown(f"### {sel_agent['icon']} **{sel_agent['name']}**")
            st.markdown(sel_agent["description"])
        with col2:
            st.markdown("**Available actions:**")
            for act in actions:
                st.markdown(f"- `{act}`")

    st.subheader("Configure Payload")

    # Action selector to auto-update payload
    default_payload = DEFAULT_PAYLOADS.get(sel_name, {"action": "run"})
    if actions:
        sel_action = st.selectbox("Action", actions,
            index=actions.index(default_payload.get("action")) if default_payload.get("action") in actions else 0)
        default_payload["action"] = sel_action

    payload_str = st.text_area("JSON Payload", value=json.dumps(default_payload, indent=2), height=200)

    col1, col2 = st.columns([1,3])
    with col1:
        run_btn = st.button("▶ Run Agent", type="primary", use_container_width=True)
    with col2:
        if not api_key:
            st.warning("Add your free Groq API key in the sidebar.")

    if run_btn:
        if not api_key:
            st.error("Please enter your Groq API key in the sidebar.")
            st.stop()
        try:
            payload = json.loads(payload_str)
        except json.JSONDecodeError as e:
            st.error(f"Invalid JSON: {e}")
            st.stop()

        with st.status(f"Running **{sel_name}** via Groq (Llama 3.3 70B)…", expanded=True) as s:
            st.write("📡 Sending request to Groq API…")
            st.write(f"🤖 Model: `llama-3.3-70b-versatile`")
            outcome = run_agent_task(api_key, sel_name, payload)
            if outcome["status"] == "COMPLETED":
                s.update(label="✅ Agent completed successfully!", state="complete")
            else:
                s.update(label="❌ Agent failed", state="error")

        if outcome["status"] == "COMPLETED":
            result = outcome["result"]
            meta   = result.pop("_meta", {})
            st.success(f"✅ Task `{outcome['task_id'][:8]}` completed")
            if meta:
                st.caption(f"🤖 Model: `{meta.get('model','?')}` | Tokens in: `{meta.get('tokens_in','?')}` | Tokens out: `{meta.get('tokens_out','?')}` | {meta.get('timestamp','')}")

            tab1, tab2 = st.tabs(["📊 Structured View", "🔧 Raw JSON"])
            with tab1:
                for key, val in result.items():
                    label = key.replace("_", " ").title()
                    if isinstance(val, list) and val:
                        st.markdown(f"**{label}**")
                        if isinstance(val[0], dict):
                            import pandas as pd
                            st.dataframe(pd.DataFrame(val), use_container_width=True)
                        else:
                            for item in val:
                                st.markdown(f"- {item}")
                    elif isinstance(val, dict):
                        st.markdown(f"**{label}**")
                        st.json(val)
                    elif isinstance(val, bool):
                        st.markdown(f"**{label}:** {'✅ Yes' if val else '❌ No'}")
                    elif isinstance(val, (int, float)):
                        col_a, col_b = st.columns([1,2])
                        col_a.markdown(f"**{label}**")
                        col_b.metric("", val)
                    else:
                        col_a, col_b = st.columns([1,2])
                        col_a.markdown(f"**{label}**")
                        col_b.markdown(str(val))
            with tab2:
                st.json(result)
        else:
            st.error(f"Agent failed: {outcome['result'].get('error','Unknown error')}")

# ──────────────────────────────────────────────────────────────────────────────
#  PAGE: PIPELINE BUILDER
# ──────────────────────────────────────────────────────────────────────────────
elif page == "🔗 Pipeline Builder":
    st.title("🔗 Pipeline Builder")
    st.markdown("Chain agents together — the output of each step is passed as context to the next.")

    agents     = get_agents()
    agent_names= [a["name"] for a in agents]
    agent_icon = {a["name"]: a["icon"] for a in agents}
    saved_pips = get_pipelines()

    tab_new, tab_saved = st.tabs(["➕ New Pipeline", "📂 Saved Pipelines"])

    # ── New Pipeline ──────────────────────────────────────────────────────────
    with tab_new:
        pip_name = st.text_input("Pipeline Name", "Morning Digest → Sheets → Slack")
        pip_desc = st.text_area("Description", "Summarise email → log to Sheets → post to Slack", height=60)

        if "pip_steps" not in st.session_state:
            st.session_state.pip_steps = [
                {"agent": "gmail-summary",  "payload": DEFAULT_PAYLOADS["gmail-summary"]},
                {"agent": "sheets-agent",   "payload": DEFAULT_PAYLOADS["sheets-agent"]},
                {"agent": "slack-agent",    "payload": {**DEFAULT_PAYLOADS["slack-agent"], "action":"send_message"}},
            ]

        st.subheader("Steps")
        to_remove = []
        for i, step in enumerate(st.session_state.pip_steps):
            with st.container(border=True):
                h1, h2, h3 = st.columns([.3, 2.4, .3])
                h1.markdown(f"### Step {i+1}")
                new_agent = h2.selectbox("Agent", agent_names,
                    index=agent_names.index(step["agent"]) if step["agent"] in agent_names else 0,
                    key=f"pip_agent_{i}")
                st.session_state.pip_steps[i]["agent"] = new_agent
                if h3.button("🗑", key=f"pip_rm_{i}", disabled=len(st.session_state.pip_steps)<=1):
                    to_remove.append(i)

                p_str = st.text_area("Payload", json.dumps(step["payload"], indent=2),
                                     height=90, key=f"pip_payload_{i}")
                try:
                    st.session_state.pip_steps[i]["payload"] = json.loads(p_str)
                except: pass

                if i < len(st.session_state.pip_steps)-1:
                    st.markdown("⬇️ *previous output injected as context*")

        for idx in reversed(to_remove):
            st.session_state.pip_steps.pop(idx)

        bc1, bc2, bc3 = st.columns(3)
        if bc1.button("➕ Add Step"):
            st.session_state.pip_steps.append({"agent":"notion-agent","payload":DEFAULT_PAYLOADS["notion-agent"]})
            st.rerun()
        if bc2.button("💾 Save Pipeline"):
            save_pipeline(str(uuid.uuid4()), pip_name, pip_desc, st.session_state.pip_steps)
            st.success(f"Pipeline '{pip_name}' saved!")
        run_pip = bc3.button("▶ Run Pipeline", type="primary")

        if run_pip:
            if not api_key:
                st.error("Add your Groq API key in the sidebar.")
            else:
                st.subheader("⚙️ Execution")
                run_id  = str(uuid.uuid4())
                results = []
                success = True
                for i, step in enumerate(st.session_state.pip_steps):
                    icon = agent_icon.get(step["agent"],"🤖")
                    with st.status(f"Step {i+1}: {icon} {step['agent']}…", expanded=False) as s:
                        ctx = json.dumps(results[-1], indent=2)[:1000] if results else ""
                        outcome = run_agent_task(api_key, step["agent"], step["payload"], extra_context=ctx)
                        if outcome["status"] == "COMPLETED":
                            r = outcome["result"]; r.pop("_meta", None)
                            results.append(r)
                            s.update(label=f"✅ Step {i+1}: {step['agent']} — Done", state="complete")
                            st.json(r)
                        else:
                            s.update(label=f"❌ Step {i+1}: {step['agent']} — Failed", state="error")
                            st.error(outcome["result"].get("error","Unknown"))
                            success = False
                            break

                fin_status = "COMPLETED" if success else "FAILED"
                save_pipeline_run(run_id, "", pip_name, fin_status, len(results), len(st.session_state.pip_steps), results)
                if success:
                    st.success(f"🎉 Pipeline **{pip_name}** completed all {len(results)} steps!")
                else:
                    st.warning(f"Pipeline stopped after {len(results)} of {len(st.session_state.pip_steps)} steps.")

    # ── Saved Pipelines ───────────────────────────────────────────────────────
    with tab_saved:
        if not saved_pips:
            st.info("No saved pipelines yet. Build one in the New Pipeline tab.")
        else:
            for pip in saved_pips:
                steps = json.loads(pip["steps"])
                with st.expander(f"🔗 **{pip['name']}** — {len(steps)} steps — {pip['created_at'][:10]}"):
                    st.caption(pip.get("description",""))
                    for j, s in enumerate(steps):
                        st.markdown(f"**Step {j+1}:** {agent_icon.get(s['agent'],'🤖')} `{s['agent']}`")
                    c1, c2 = st.columns(2)
                    if c1.button("▶ Run", key=f"run_pip_{pip['id']}", type="primary"):
                        if not api_key:
                            st.error("Add your Groq API key.")
                        else:
                            results = []
                            for i, step in enumerate(steps):
                                ctx = json.dumps(results[-1], indent=2)[:1000] if results else ""
                                outcome = run_agent_task(api_key, step["agent"], step["payload"], extra_context=ctx)
                                if outcome["status"] == "COMPLETED":
                                    r = outcome["result"]; r.pop("_meta", None); results.append(r)
                                    st.success(f"Step {i+1} ✅")
                                else:
                                    st.error(f"Step {i+1} ❌ — {outcome['result'].get('error','')}")
                                    break
                            st.json(results)
                    if c2.button("🗑 Delete", key=f"del_pip_{pip['id']}"):
                        delete_pipeline(pip["id"])
                        st.rerun()

# ──────────────────────────────────────────────────────────────────────────────
#  PAGE: PLAYGROUND (live JSON editor)
# ──────────────────────────────────────────────────────────────────────────────
elif page == "🧪 Playground":
    st.title("🧪 Playground")
    st.markdown("Freely edit any JSON payload and run any agent. Perfect for testing custom inputs.")

    agents  = get_agents()
    a_names = [a["name"] for a in agents]
    a_icons = {a["name"]: a["icon"] for a in agents}

    col1, col2 = st.columns([1, 2])
    with col1:
        sel = st.selectbox("Agent", a_names, format_func=lambda x: f"{a_icons.get(x,'')} {x}")
        st.markdown("**Quick templates:**")
        if st.button("📧 Email digest"):
            st.session_state.pg_payload = json.dumps({"action":"summarize_unread","max_emails":10,"priority_only":True}, indent=2)
            st.session_state.pg_agent   = "gmail-summary"
            st.rerun()
        if st.button("📅 Today's calendar"):
            st.session_state.pg_payload = json.dumps({"action":"summarize_day","date":str(datetime.date.today())}, indent=2)
            st.session_state.pg_agent   = "calendar-manager"
            st.rerun()
        if st.button("🐙 PR review"):
            st.session_state.pg_payload = json.dumps({"action":"review_summary","repo":"org/frontend","pr_number":42}, indent=2)
            st.session_state.pg_agent   = "github-agent"
            st.rerun()
        if st.button("🔷 Sprint report"):
            st.session_state.pg_payload = json.dumps({"action":"weekly_report","team":"Product","cycle":"current"}, indent=2)
            st.session_state.pg_agent   = "linear-agent"
            st.rerun()
        if st.button("🌐 Scrape HN"):
            st.session_state.pg_payload = json.dumps({"action":"scrape_url","url":"https://news.ycombinator.com","extract":["headlines"]}, indent=2)
            st.session_state.pg_agent   = "web-scraper"
            st.rerun()

    with col2:
        active_agent   = st.session_state.get("pg_agent", sel)
        default_pl     = st.session_state.get("pg_payload", json.dumps(DEFAULT_PAYLOADS.get(sel, {"action":"run"}), indent=2))
        payload_editor = st.text_area("JSON Payload", value=default_pl, height=280, key="pg_editor")

        if st.button("▶ Execute", type="primary", use_container_width=True):
            if not api_key:
                st.error("Add your Groq API key in the sidebar.")
            else:
                try:
                    payload = json.loads(payload_editor)
                except:
                    st.error("Invalid JSON"); st.stop()
                with st.spinner(f"Running `{active_agent}`…"):
                    outcome = run_agent_task(api_key, active_agent, payload)
                if outcome["status"] == "COMPLETED":
                    r = outcome["result"]; meta = r.pop("_meta", {})
                    st.success("Done!")
                    st.caption(f"Tokens: {meta.get('tokens_in',0)} in / {meta.get('tokens_out',0)} out")
                    st.json(r)
                else:
                    st.error(outcome["result"].get("error",""))

# ──────────────────────────────────────────────────────────────────────────────
#  PAGE: TASK HISTORY
# ──────────────────────────────────────────────────────────────────────────────
elif page == "📜 Task History":
    st.title("📜 Task History")
    st.markdown("Full audit trail of every agent run.")

    tasks_all  = get_tasks(200)
    all_agents = sorted({t["agent_name"] for t in tasks_all})

    fc1, fc2, fc3, fc4 = st.columns(4)
    f_agent  = fc1.selectbox("Agent",  ["All"] + all_agents)
    f_status = fc2.selectbox("Status", ["All","COMPLETED","FAILED","RUNNING","PENDING"])
    fc3.metric("Showing", len(tasks_all))
    if fc4.button("🗑 Clear All History"):
        with db() as c: c.execute("DELETE FROM tasks")
        st.rerun()

    filtered = get_tasks(200,
        agent_filter  = f_agent  if f_agent  != "All" else None,
        status_filter = f_status if f_status != "All" else None,
    )

    if not filtered:
        st.info("No tasks match your filter.")
    else:
        import pandas as pd
        summary = pd.DataFrame([{
            "ID":     t["id"][:8],
            "Agent":  t["agent_name"],
            "Status": t["status"],
            "Created":t["created_at"][:19],
        } for t in filtered])
        st.dataframe(summary, use_container_width=True, hide_index=True)

        st.divider()
        st.subheader("Detailed Results")
        for t in filtered[:20]:
            icon = STATUS_ICON.get(t["status"],"❓")
            with st.expander(f"{icon} `{t['id'][:8]}` — {t['agent_name']} — {t['created_at'][:19]}"):
                c1, c2 = st.columns(2)
                with c1:
                    st.markdown("**Payload**"); st.json(json.loads(t["payload"]))
                with c2:
                    st.markdown("**Result**")
                    if t["result"]:
                        r = json.loads(t["result"]); r.pop("_meta", None); st.json(r)
                    else:
                        st.caption("No result")

        # Export
        if st.button("⬇ Export History as JSON"):
            export_data = []
            for t in filtered:
                row = dict(t)
                try: row["payload"] = json.loads(row["payload"])
                except: pass
                try: row["result"]  = json.loads(row["result"]) if row["result"] else None
                except: pass
                export_data.append(row)
            st.download_button(
                "📥 Download JSON",
                data=json.dumps(export_data, indent=2),
                file_name=f"saap_history_{datetime.date.today()}.json",
                mime="application/json"
            )

# ──────────────────────────────────────────────────────────────────────────────
#  PAGE: ANALYTICS
# ──────────────────────────────────────────────────────────────────────────────
elif page == "📊 Analytics":
    st.title("📊 Analytics")
    import pandas as pd

    tasks_all = get_tasks(500)
    if not tasks_all:
        st.info("Run some agents first to see analytics here.")
    else:
        # KPIs
        n_total = len(tasks_all)
        n_done  = sum(1 for t in tasks_all if t["status"]=="COMPLETED")
        n_fail  = sum(1 for t in tasks_all if t["status"]=="FAILED")
        rate    = round(100 * n_done / max(n_total, 1), 1)

        k1, k2, k3, k4 = st.columns(4)
        k1.metric("Total Tasks",    n_total)
        k2.metric("✅ Completed",    n_done)
        k3.metric("❌ Failed",       n_fail)
        k4.metric("Success Rate",   f"{rate}%")

        st.divider()

        # Agent usage chart
        agent_counts = Counter(t["agent_name"] for t in tasks_all)
        df_agents = pd.DataFrame({"Agent": list(agent_counts.keys()), "Tasks": list(agent_counts.values())}).sort_values("Tasks", ascending=False)

        # Status breakdown
        status_counts = Counter(t["status"] for t in tasks_all)
        df_status = pd.DataFrame({"Status": list(status_counts.keys()), "Count": list(status_counts.values())})

        c1, c2 = st.columns(2)
        with c1:
            st.subheader("Tasks per Agent")
            st.bar_chart(df_agents.set_index("Agent"))
        with c2:
            st.subheader("Status Breakdown")
            st.bar_chart(df_status.set_index("Status"))

        # Daily activity
        st.subheader("Daily Activity")
        daily = Counter(t["created_at"][:10] for t in tasks_all)
        df_daily = pd.DataFrame({"Date": list(daily.keys()), "Tasks": list(daily.values())}).sort_values("Date")
        if len(df_daily) > 1:
            st.line_chart(df_daily.set_index("Date"))
        else:
            st.bar_chart(df_daily.set_index("Date"))

        # Agent success/fail breakdown table
        st.subheader("Agent Performance")
        perf = {}
        for t in tasks_all:
            a = t["agent_name"]
            if a not in perf: perf[a] = {"completed":0,"failed":0,"total":0}
            perf[a]["total"] += 1
            if t["status"] == "COMPLETED": perf[a]["completed"] += 1
            elif t["status"] == "FAILED":  perf[a]["failed"] += 1
        perf_rows = [{"Agent":a, "Total":v["total"], "✅ Done":v["completed"],
                      "❌ Failed":v["failed"], "Success %": f"{100*v['completed']//max(v['total'],1)}%"}
                     for a,v in sorted(perf.items())]
        st.dataframe(pd.DataFrame(perf_rows), use_container_width=True, hide_index=True)

# ──────────────────────────────────────────────────────────────────────────────
#  PAGE: KNOWLEDGE BASE
# ──────────────────────────────────────────────────────────────────────────────
elif page == "📚 Knowledge Base":
    st.title("📚 Knowledge Base")
    st.markdown("Store documents and reference notes that agents can use as context.")

    tab_view, tab_add, tab_search = st.tabs(["📄 Documents", "➕ Add Document", "🔍 Search"])

    with tab_view:
        kb_items = get_kb()
        if not kb_items:
            st.info("No documents yet. Add some in the Add Document tab.")
        else:
            for item in kb_items:
                tags = json.loads(item.get("tags","[]"))
                with st.expander(f"📄 **{item['title']}**  —  {item['created_at'][:10]}"):
                    st.markdown(item["content"])
                    st.markdown(" ".join([f'<span class="pill">{t}</span>' for t in tags]), unsafe_allow_html=True)
                    if st.button("🗑 Delete", key=f"del_kb_{item['id']}"):
                        delete_kb(item["id"]); st.rerun()

    with tab_add:
        title   = st.text_input("Document Title")
        content = st.text_area("Content", height=200)
        tags_in = st.text_input("Tags (comma separated)", "research, agents")
        if st.button("💾 Save Document", type="primary"):
            if title and content:
                tags = [t.strip() for t in tags_in.split(",") if t.strip()]
                add_kb(title, content, tags)
                st.success(f"Saved: **{title}**")
                st.rerun()
            else:
                st.warning("Title and content are required.")

    with tab_search:
        query = st.text_input("Search documents", placeholder="e.g. architecture, pipeline, SDK")
        if query:
            kb_items = get_kb()
            hits = [item for item in kb_items if
                    query.lower() in item["title"].lower() or
                    query.lower() in item["content"].lower()]
            st.markdown(f"**{len(hits)} result(s) for '{query}'**")
            for item in hits:
                with st.expander(f"📄 {item['title']}"):
                    st.markdown(item["content"])

        if query and api_key:
            st.divider()
            st.markdown("**AI Answer** (using knowledge base + Groq):")
            if st.button("🤖 Ask AI about this"):
                kb_context = "\n\n".join([f"**{i['title']}**\n{i['content']}" for i in get_kb()])
                with st.spinner("Asking Llama 3.3 70B…"):
                    from groq import Groq
                    client = Groq(api_key=api_key)
                    resp = client.chat.completions.create(
                        model="llama-3.3-70b-versatile",
                        max_tokens=600,
                        messages=[
                            {"role":"system","content":f"You are a helpful assistant with access to this knowledge base:\n\n{kb_context}"},
                            {"role":"user","content":query}
                        ]
                    )
                st.markdown(resp.choices[0].message.content)

# ──────────────────────────────────────────────────────────────────────────────
#  PAGE: ARCHITECTURE
# ──────────────────────────────────────────────────────────────────────────────
elif page == "ℹ️ Architecture":
    st.title("ℹ️ Architecture & Research Context")

    st.markdown("""
## 🔑 How to get your FREE Groq API key

> **No credit card required. Takes 60 seconds.**

1. Go to **[console.groq.com](https://console.groq.com)**
2. Click **Sign Up** (use Google or email)
3. Go to **API Keys** in the left menu
4. Click **Create API Key**
5. Copy the key that starts with `gsk_…`
6. Paste it into the sidebar of this app

**Free tier limits** (reset daily):
| Model | Requests/min | Requests/day | Tokens/day |
|-------|-------------|-------------|-----------|
| `llama-3.3-70b-versatile` | 30 | 14,400 | 500,000 |
| `llama-3.1-8b-instant` | 60 | 14,400 | 500,000 |

That's **14,400 agent calls per day for free** — more than enough for any demo or research session.

---

## Production System Architecture

```
Browser (Next.js 14)
     │
     ▼
API Gateway (Fastify / TypeScript) ─ port 3001
     │   JWT + API key auth │ OAuth flows │ SSE streaming │ Rate limiting
     ▼
Orchestrator (FastAPI / Python) ─ port 8000
     │   Task queue │ Scheduling │ Org management │ Billing │ Audit logs
     ▼
Redis (BLPOP job queue + pub/sub for SSE)
     │
     ▼
Worker Pool (Python 3.11) ─ 3 concurrent workers
     │   12 agent implementations │ LLM client │ Cost tracking
     ▼
PostgreSQL 15 ─ 22 tables
```

## This Prototype Architecture

```
Streamlit UI (this app)
     │
     ▼
Agent Runner (Python)
     │   Groq API calls (llama-3.3-70b-versatile)
     │   SQLite (tasks, agents, pipelines, knowledge base)
     │   Session state for pipeline steps
     ▼
Groq Cloud  ─  llama-3.3-70b-versatile
     │   500+ tokens/second  │  Free tier  │  No credit card
     ▼
SQLite saap.db (local, resets on each Streamlit Cloud deploy)
```

---

## Research Directions

This prototype supports research into:

1. **Agent orchestration patterns** — how agents chain, pass context, and recover from failure
2. **LLM-driven automation quality** — task completion accuracy and JSON output reliability
3. **Multi-agent pipelines** — dependency resolution, output chaining, partial failure handling
4. **Organisational AI adoption** — UX for non-technical users interacting with AI agents
5. **Cost/latency tradeoffs** — token counts per agent type, prompt compression strategies
6. **Security model** — OAuth scopes, credential encryption, audit logging

---

## Stack Comparison

| Layer | Prototype | Production |
|-------|-----------|-----------|
| Frontend | Streamlit | Next.js 14 |
| AI Engine | Groq (Llama 3.3 70B, free) | OpenAI / Anthropic |
| Database | SQLite | PostgreSQL 15 |
| Queue | None (synchronous) | Redis BLPOP |
| Auth | API key (sidebar) | JWT + OAuth 2.0 |
| Deployment | Streamlit Cloud | Docker / Kubernetes |
| Agents | Simulated via LLM | Real API integrations |
""")

    st.divider()
    st.subheader("All 12 Agents")
    agents = get_agents()
    import pandas as pd
    df = pd.DataFrame([{
        "Icon": a["icon"], "Name": a["name"], "Category": a["category"],
        "Description": a["description"], "Timeout (s)": a["timeout_seconds"]
    } for a in agents])
    st.dataframe(df, use_container_width=True, hide_index=True)
