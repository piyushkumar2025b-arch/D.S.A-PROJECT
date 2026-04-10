# 🏢 SAAP v5.6 — Smart Autonomous Agent Platform
### *Enterprise AI Orchestration · 12 Live Agents · 9 Sections*

> **The most advanced multi-agent AI orchestration platform built on Streamlit.**  
> SAAP coordinates a hierarchy of specialised AI agents powered by Groq's ultra-fast inference to automate real organisational workflows — from email triage and sprint analysis to market intelligence and revenue forecasting.

<br/>

```
╔══════════════════════════════════════════════════════════════════════════════╗
║              ALL SYSTEMS OPERATIONAL · V5.6 · 12 LIVE AGENTS               ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [The 9 Sections](#-the-9-sections)
- [The 12 Sub-Agents](#-the-12-sub-agents)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Configuration & Secrets](#-configuration--secrets)
- [API Integrations](#-api-integrations)
- [Known Inter-Agent Issues](#-known-inter-agent-issues-research)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Changelog](#-changelog)

---

## 🌐 Overview

SAAP is a **full-stack, production-grade AI agent orchestration system** built as a single Streamlit application. It provides a command-centre interface for managing, running, and monitoring autonomous AI agents that can interact with your organisation's real tools — Gmail, GitHub, Slack, Jira, HubSpot, Notion, and more.

### What makes SAAP different?

| Feature | Details |
|---|---|
| 🤖 **Multi-Agent Hierarchy** | Master Coordinator → 12 Specialist Sub-Agents → Master Synthesizer |
| ⚡ **Real-Time Execution** | Live token streaming, per-agent progress tracking, feed updates |
| 🔌 **Real API Integration** | Connects to 12 real external services, gracefully falls back to AI simulation |
| 🧠 **AI-Powered Fallback** | Every agent works without real API keys via Groq LLM simulation |
| 📊 **Persistent State** | SQLite database tracks all tasks, workflows, issues, and history |
| 🛠 **Admin Layer** | Full database explorer, live schema browser, query runner |
| 🌐 **Activity Feed** | Cross-section real-time event bus showing all agent activity |
| 🔒 **Permanent Sidebar** | Always-visible navigation — no collapse, no lost context |

---

## 🏗 Architecture

```
                    ┌─────────────────────────────────┐
                    │      SAAP COMMAND CENTER         │
                    │     (Streamlit Frontend)         │
                    └────────────┬────────────────────┘
                                 │
                    ┌────────────▼────────────────────┐
                    │    Master Coordinator Agent      │
                    │  (Goal decomposition + routing)  │
                    └──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┘
                       │  │  │  │  │  │  │  │  │  │  │
           ┌───────────┘  │  │  │  │  │  │  │  │  │  └───────────┐
           │      ┌───────┘  │  │  │  │  │  │  │  └───────┐      │
           ▼      ▼          ▼  ▼  ▼  ▼  ▼  ▼  ▼          ▼      ▼
        📧Gmail 📅Cal      📁Dr 💬Sl 🐙GH 📊Sh 📝No 🌐Web 🎯Ji 🗃️At 🔷Li 🏢HS
           │      │          │  │  │  │  │  │  │          │      │
           └──────┴──────────┴──┴──┴──┴──┴──┴──┴──────────┴──────┘
                                      │
                    ┌─────────────────▼────────────────┐
                    │       Master Synthesizer          │
                    │  (Executive report generation)    │
                    └──────────────────────────────────┘
                                      │
                    ┌─────────────────▼────────────────┐
                    │         SQLite Database           │
                    │  Tasks · Issues · Feed · History  │
                    └──────────────────────────────────┘
```

### Core Engine

- **Groq API** powers every AI call using `llama-3.3-70b-versatile` — the fastest open LLM available
- **APScheduler** runs background refresh cycles for live metrics
- **SQLite** persists all state across sessions with WAL mode enabled for concurrency
- **Streamlit session state** manages UI interactions and streaming output buffers

---

## 🗂 The 9 Sections

The sidebar provides permanent navigation across all 9 sections of the platform:

### 📘 Section 1 — Workflow Demo
A fully simulated multi-agent orchestration demo. Pick from preset goals, watch agents get assigned tasks in real time, observe token streaming, and review the final synthesised report. Sub-pages include:

- 🏠 **Dashboard** — Command centre with live metrics (total tasks, success rate, uptime, token usage)
- 🚀 **Run Agent** — Launch individual or pipeline agent runs
- 🔗 **Pipeline Builder** — Chain agents together into custom workflows
- 🧪 **Playground** — Free-form prompt experimentation
- 📜 **Task History** — Full log of all past runs with status and output
- 📊 **Analytics** — Charts and breakdowns of agent performance
- 📚 **Knowledge Base** — Reference docs for all agents
- ℹ️ **Architecture** — Live topology diagram of the agent network

---

### 🔬 Section 2 — Live Research Agent
A **real 6-agent academic research system** powered by Groq. Provide a research question and watch a full hierarchy execute:

1. **Search Strategist** — Breaks the question into sub-queries
2. **Literature Scout** — Identifies sources and papers
3. **Data Extractor** — Pulls key findings
4. **Critical Analyst** — Evaluates evidence quality
5. **Gap Finder** — Identifies what's missing in the literature
6. **Report Synthesizer** — Writes the final structured report

Supports **debate mode** (Gap Finder vs Synthesizer argue opposing views) and **streaming output**.

---

### 🚧 Section 3 — Research Problems
A curated library of open, unsolved problems in AI and multi-agent systems. Each problem includes a live demonstrator that shows SAAP attempting (or intentionally failing) to solve it — including known failure modes like context window overflow, prompt injection, and entity mismatch.

---

### 🏢 Section 4 — Real Org Mode ⭐
The flagship section. A **complete enterprise AI operations layer** with:

- Full 12-agent hierarchy execution against real organisational goals
- Master Coordinator decomposes any business goal into agent-specific tasks
- Each agent calls real APIs where credentials exist, otherwise Groq-simulates
- Live issue detection using the known inter-agent error taxonomy
- Master Synthesis Report generated at the end of every run
- **Sub-tabs:** Run Workflow · Agent Control · Integration Manager · Issue Tracker · Team Members · Workflow History

---

### ⚡ Section 5 — Live Agent Hub
Individual agent control panel. Select any of the 12 agents, choose an action, and run it directly. View per-agent:
- Execution logs
- Token consumption
- Real API call results vs simulated fallback
- Historical run statistics

---

### ⚙️ Section 6 — n8n Real Simulation
A **fully DB-backed n8n-style workflow engine** built inside SAAP. Create, activate, pause, and delete automation workflows. Each workflow is persisted in SQLite and can trigger agent runs, API calls, and feed events.

---

### Ω Section 7 — Omega Agent
An advanced **single superintelligent agent** rendered in a custom HTML interface embedded in Streamlit. Omega receives unrestricted goals and attempts to solve them using all available context — org data, agent outputs, and live web research.

---

### 💬 Section 8 — Org Chat + AI Agent
A **real-time organisation-wide chat system** with an embedded AI routing layer. Messages are stored in SQLite. When AI Mode is enabled, the AI Analyser reads your message, determines intent, and automatically routes the task to the most appropriate specialist agent.

---

### 🛠 Section 9 — Admin & Database
Full backend control panel:
- Live SQLite schema browser
- Raw SQL query runner
- Task management (view, delete, bulk clear)
- Integration status dashboard
- Feed event log viewer
- Database statistics and health metrics

---

### 🌐 Activity Feed
A cross-section **real-time event bus** showing every agent action, task completion, failure, and workflow event across all 9 sections. Events are colour-coded by type and persist in the database.

---

## 🤖 The 12 Sub-Agents

| Icon | Agent Name | Real API | Specialisation |
|------|-----------|----------|----------------|
| 📧 | **Gmail Intelligence** | Gmail API v1 | Email triage, communication analysis, priority scoring |
| 📅 | **Time Intelligence** | Google Calendar API v3 | Schedule optimisation, conflict detection, time allocation |
| 📁 | **Knowledge Store** | Google Drive API v3 | Document management, knowledge organisation, content discovery |
| 💬 | **Team Pulse** | Slack Web API | Team sentiment, blocker detection, standup analysis |
| 🐙 | **Engineering Intelligence** | GitHub REST API v3 | Code velocity, PR health, deployment risk, technical debt |
| 📊 | **Data Operations** | Google Sheets API v4 | KPI reporting, financial modelling, dashboard generation |
| 📝 | **Knowledge Engine** | Notion API v1 | Documentation, decision tracking, project wikis |
| 🌐 | **Market Intelligence** | HTTP/Web Scraper | Competitive intel, news monitoring, market signals |
| 🎯 | **Project Tracker** | Jira REST API v3 | Sprint health, velocity analysis, issue tracking, risk assessment |
| 🗃️ | **Operations Database** | Airtable API | Operational data, CRM-lite, inventory management |
| 🔷 | **Product Velocity** | Linear GraphQL API | Product roadmap, cycle metrics, team health |
| 🏢 | **Revenue Intelligence** | HubSpot CRM API v3 | Pipeline health, deal forecasting, lead scoring |

> **All agents operate in full simulation mode without API keys.** Real API keys are optional and unlock live data.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Streamlit ≥ 1.35.0 |
| **AI Inference** | Groq API (`llama-3.3-70b-versatile`) |
| **Database** | SQLite 3 (WAL mode, 8MB page cache) |
| **Scheduling** | APScheduler ≥ 3.10.1 |
| **Data Processing** | Pandas ≥ 2.1.0 |
| **Google APIs** | google-api-python-client ≥ 2.131.0 |
| **Google Auth** | google-auth, google-auth-oauthlib |
| **Fonts** | Space Grotesk · JetBrains Mono · Outfit · Bebas Neue |
| **Styling** | Custom CSS design system with CSS variables + animations |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- A free Groq API key → [console.groq.com](https://console.groq.com)

### Install & Run

```bash
# 1. Clone or extract the project
cd saap/

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the app
streamlit run app.py
```

The app will open at `http://localhost:8501`. The **sidebar will always be visible** on the left — use it to navigate between all 9 sections.

### Add Your Groq Key

Paste your `gsk_...` key in the sidebar input field, or add it to `.streamlit/secrets.toml`:

```toml
GROQ_API_KEY = "gsk_your_key_here"
```

---

## 🔐 Configuration & Secrets

All configuration lives in `.streamlit/`:

```
.streamlit/
├── config.toml       # Theme, server settings
└── secrets.toml      # API keys (never commit this)
```

**`config.toml`**
```toml
[theme]
base = "dark"
primaryColor = "#3b82f6"
backgroundColor = "#0a0f1e"
secondaryBackgroundColor = "#111827"
textColor = "#f1f5f9"

[server]
headless = true
enableCORS = false
```

**`secrets.toml`** (copy from `secrets.toml.template`)
```toml
GROQ_API_KEY = "gsk_..."
SLACK_BOT_TOKEN = "xoxb-..."
GITHUB_TOKEN = "ghp_..."
# ... see secrets.toml.template for all keys
```

---

## 🔌 API Integrations

All integrations are **optional**. The system fully simulates every agent without real credentials.

| Service | Key Type | Where to Get |
|---|---|---|
| **Groq** | API Key | [console.groq.com](https://console.groq.com) — Free |
| **Gmail / Calendar / Drive / Sheets** | OAuth 2.0 | [Google Cloud Console](https://console.cloud.google.com) |
| **Slack** | Bot Token | [api.slack.com/apps](https://api.slack.com/apps) |
| **GitHub** | Personal Access Token | GitHub → Settings → Developer Settings |
| **Jira** | API Token | Atlassian Account Settings |
| **HubSpot** | Private App Token | HubSpot → Settings → Integrations |
| **Notion** | Integration Token | [notion.so/my-integrations](https://notion.so/my-integrations) |
| **Airtable** | API Key | Airtable Account → API |
| **Linear** | API Key | Linear → Settings → API |

Configure live keys in **Section 4 → Integration Manager** tab or via `secrets.toml`.

---

## ⚠️ Known Inter-Agent Issues (Research)

SAAP includes a built-in **Issue Detector** that monitors for 8 researched inter-agent failure patterns during live execution:

| Code | Type | Agents Affected | Description |
|---|---|---|---|
| `ERR-CTX-001` | Context Corruption | Gmail → Calendar | Parsed email entities pollute calendar slots |
| `ERR-SEC-003` | Data Leakage Risk | Gmail → Slack | Confidential email content leaks to public channels |
| `ERR-ID-002` | ID Namespace Collision | GitHub → Jira | PR IDs conflict with issue IDs across systems |
| `ERR-SEC-001` | Prompt Injection | Web Scraper → Any | Scraped pages contain adversarial LLM instructions |
| `ERR-CTX-002` | Context Window Overflow | Slack → Notion | Large channel exports exceed LLM context limit |
| `ERR-LOCALE-001` | Currency Mismatch | HubSpot → Sheets | Multi-currency deals misrepresented in reports |
| `ERR-ENT-001` | Entity Mismatch | Jira → HubSpot | Project entities don't map to CRM company records |
| `ERR-AUTH-001` | OAuth Scope Gap | Drive → Sheets | Drive OAuth token lacks Sheets write permission |

These issues are detected in real-time and logged to the Issue Tracker in Section 4.

---

## ☁️ Deployment

### Streamlit Community Cloud (Recommended — Free)

```bash
# 1. Push your project to a GitHub repo
git init && git add . && git commit -m "Deploy SAAP v5.6"
git remote add origin https://github.com/YOUR_USERNAME/saap.git
git push -u origin main

# 2. Go to share.streamlit.io → New App
# 3. Select your repo and set main file to: app.py
# 4. Add secrets in the Streamlit Cloud dashboard:
#    GROQ_API_KEY = "gsk_..."
```

### Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8501
CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

```bash
docker build -t saap .
docker run -p 8501:8501 -e GROQ_API_KEY=gsk_... saap
```

### Hugging Face Spaces

1. Create a new Space with **Streamlit** SDK
2. Upload all files
3. Add `GROQ_API_KEY` in Space Secrets

---

## 📁 Project Structure

```
saap/
├── app.py                          # Main application (single-file monolith)
├── requirements.txt                # Python dependencies
├── saap_v4.db                      # SQLite database (auto-created on first run)
├── secrets.toml.template           # Template for API keys
├── omega_agent.html                # Custom HTML for Omega Agent (Section 7)
├── n8n_platform.html               # n8n-style workflow UI assets
├── implementation_plan_omega_agent.md
├── SAAP_UI_TRANSFORM_PROMPT.md
├── .streamlit/
│   ├── config.toml                 # Streamlit theme & server config
│   └── secrets.toml                # Your API keys (gitignored)
├── .gitignore
└── README.md                       # This file
```

> `app.py` is a ~9,000 line single-file application. All sections, agents, database logic, CSS, and UI rendering live in this file by design — making it trivially deployable with zero build steps.

---

## 📜 Changelog

### v5.6 (Current)
- ✅ Permanent sidebar — always visible, collapse button removed via CSS
- ✅ 9 fully operational sections
- ✅ Activity Feed cross-section event bus
- ✅ n8n Real Simulation engine (Section 6)
- ✅ Omega Agent HTML embed (Section 7)
- ✅ Org Chat + AI routing (Section 8)
- ✅ Admin & Database explorer (Section 9)

### v4.0
- 🏢 Real Org Mode launched (Section 4)
- 12 sub-agent hierarchy with real API integration
- Master Coordinator + Synthesizer pipeline
- Issue Tracker with known inter-agent error taxonomy
- Multi-user team member system

### v3.0
- Research Problems library (Section 3)
- Debate mode for Research Agent
- Streaming token output

### v2.0
- Live Research Agent launched (Section 2)
- 6-agent academic research hierarchy
- SQLite persistence introduced

### v1.0
- Initial release: Workflow Demo (Section 1)
- Groq API integration
- Basic task tracking

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-agent`
3. Make your changes in `app.py`
4. Test locally: `streamlit run app.py`
5. Submit a pull request

---

## 📄 License

MIT License — free to use, modify, and deploy.

---

<div align="center">

**Built with ❤️ using Streamlit + Groq**

`SAAP v5.6` · `Enterprise AI Orchestration` · `12 Live Agents` · `All Systems Operational`

</div>
