# SAAP v4.0 — Smart Autonomous Agent Platform: Organisation Edition

## What's New in v4.0 (Section 4)

Section 4 is a **complete Real Organisation AI Agent Mode** featuring:

### Architecture
- **1 Master Coordinator Agent** — decomposes org goals, assigns tasks to sub-agents
- **12 Specialist Sub-Agents** — each with real API integration support
- **Live Issue Detector** — detects known inter-agent problems during execution
- **Master Synthesizer** — integrates all outputs into executive report
- **Issue Tracker** — persistent issue log with severity, resolution workflow
- **Multi-User Access** — team members with role-based permissions
- **Integration Manager** — connect real APIs (Google, Slack, GitHub, etc.)
- **Workflow History** — full audit trail of all org workflow runs

### 12 Sub-Agents
| Agent | Real API | Specialisation |
|-------|----------|----------------|
| 📧 Gmail Intelligence | Gmail API v1 | Email triage, communication analysis |
| 📅 Time Intelligence | Calendar API v3 | Schedule optimisation, conflict detection |
| 📁 Knowledge Store | Drive API v3 | Document management, information silos |
| 💬 Team Pulse | Slack Web API | Team sentiment, blockers, standups |
| 🐙 Engineering Intelligence | GitHub REST API v3 | Code velocity, PR health |
| 📊 Data Operations | Sheets API v4 | KPI dashboards, reporting |
| 📝 Knowledge Engine | Notion API v1 | Documentation, decision tracking |
| 🌐 Market Intelligence | HTTP/HTTPS | Competitive intel, news monitoring |
| 🎯 Project Tracker | Jira REST API v3 | Sprint health, velocity |
| 🗃️ Operations Database | Airtable API | Operational data management |
| 🔷 Product Velocity | Linear GraphQL | Product cycle health |
| 🏢 Revenue Intelligence | HubSpot CRM v3 | Pipeline, forecasting |

### Sections
- **Section 1** — Workflow Demo (simulated single-agent runs)
- **Section 2** — Live Research Agent (5-agent academic research system)
- **Section 3** — Research Problems (open problems, live demonstrators)
- **Section 4** — **Real Org Mode** (12 sub-agents, master coordinator, real APIs) 🆕

## Setup

### 1. Get a Free Groq API Key
1. Go to [console.groq.com](https://console.groq.com)
2. Sign Up → API Keys → Create Key
3. Copy the key (starts with `gsk_`)
4. Paste in the sidebar when you open the app

### 2. Run Locally
```bash
pip install streamlit groq requests
streamlit run app.py
```

### 3. Deploy to Streamlit Cloud
1. Push to GitHub
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Deploy from your repo
4. Add `GROQ_API_KEY` in Secrets

### 4. Connect Real APIs (Optional)
All agents work without real API keys using Groq AI simulation.
To enable real data, add API keys in **Section 4 → Integrations** tab:
- Google OAuth (Gmail, Calendar, Drive, Sheets)
- Slack Bot Token
- GitHub Personal Access Token
- Jira API Token
- HubSpot Private App Token
- Notion Integration Token
- Airtable API Key
- Linear API Key

## Known Inter-Agent Issues (Research)
The system tracks 8 researched inter-agent issues:
- ERR-CTX-001: Context Corruption (gmail→calendar)
- ERR-SEC-003: Data Leakage Risk (gmail→slack)
- ERR-ID-002: ID Namespace Collision (github→jira)
- ERR-SEC-001: Prompt Injection (web-scraper→any)
- ERR-CTX-002: Context Window Overflow (slack→notion)
- ERR-LOCALE-001: Currency Mismatch (hubspot→sheets)
- ERR-ENT-001: Entity Mismatch (jira→hubspot)
- ERR-AUTH-001: OAuth Scope Gap (drive→sheets)
