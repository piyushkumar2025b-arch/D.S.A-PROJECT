<div align="center">
  <img src="https://img.shields.io/badge/SAAP-v5.6-00d4ff?style=for-the-badge&logo=appveyor" alt="SAAP Version">
  <img src="https://img.shields.io/badge/Python-3.10+-3b82f6?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Streamlit-1.35+-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white" alt="Streamlit">
  <h1>⚡ Smart Autonomous Agent Platform (SAAP)</h1>
  <p><strong>Enterprise Edition — AI Agent Orchestration & Workspace Integration</strong></p>
</div>

<br/>

## 🌟 Overview

SAAP v5.6 is a production-level, multi-agent orchestrator built on Streamlit. Overcoming the limits of traditional single-agent systems, SAAP implements a **Hierarchical Master Coordinator** pattern that dynamically manages 12 domain-specialised Sub-Agents, providing native connections to live workspace APIs (Slack, Google Workspace, GitHub, Jira). 

### ✨ Key Features in v5.6
* **Fully Researched Agent Taxonomy**: Implements logic for handling inter-agent context collisions (e.g. `ERR-CTX-001`, `ERR-ID-002`).
* **Live Enterprise Hub (`Section 5`)**: Complete JWT/Session-guarded enterprise portal.
* **12 Specialist Sub-Agents**: Plug-and-play integrations seamlessly toggling between **Mock Stimulation** and **Real External API** usage.
* **N8N Simulation Engine (`Section 6`)**: Simulated N8N workflow hook logic for workflow validation.
* **Omega Agent Protocol (`Section 7`)**: High-fidelity autonomous research hub.
* **In-Memory Cache Locking**: Integrated cross-thread SQLite routing ensuring data integrity natively on Streamlit's runtime paradigm.

---

## 🏛️ Agent Architecture

SAAP revolves around a central Coordinator delegating sub-routines:

| Scope | Sub-Agent Classification | Associated Live External API |
|-------|--------------------------|------------------------------|
| **Communications** | 📧 Gmail Intelligence | Gmail API v1 |
| **Scheduling**     | 📅 Time Intelligence | Calendar API v3 |
| **Files/Docs**     | 📁 Knowledge Store | Drive API v3 |
| **Real-time Comms**| 💬 Team Pulse | Slack Web API |
| **DevOps/VCS**     | 🐙 Engineering Intel | GitHub REST API v3 |
| **Operations**     | 📊 Data Operations | Google Sheets API v4 |
| **Documentation**  | 📝 Knowledge Engine | Notion API |
| **Web Research**   | 🌐 Market Intel | HTTP/HTTPS Scrapers |
| **Agile Sprints**  | 🎯 Project Tracker | Jira REST API v3 |
| **Structured Data**| 🗃️ Operations Database | Airtable API |
| **Product Tracking**| 🔷 Product Velocity | Linear GraphQL |
| **Sales/CRM**      | 🏢 Revenue Intelligence | HubSpot CRM v3 |

---

## ⚙️ Installation & Usage

### 1. Prerequisites
You need Python 3.10+ installed. A free Groq API key is recommended to run local fast-LLM operations.
* Get your API Key here: [console.groq.com](https://console.groq.com)

### 2. Standard Setup
Clone this repository and run the standard installation command:

```bash
# Optional but recommended: Create a virtual environment
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows

# Install required packages (Includes Streamlit, Pandas, APScheduler, Google Client)
pip install -r requirements.txt
```

### 3. Launch Platform

```bash
streamlit run app.py
```

The system will build and boot a native web-server on `http://localhost:8501`. 

### 4. Live Agent Testing (Authentication)
* Open the UI and head to **Section 4: Integrations** to plug your actual tokens for Slack/Github/Notion.
* Until real Integrations are linked, Agents auto-fallback to safe Mock Generative outputs.
* **Section 5 Hub** requires internal credentials — create a demo profile in the **Section 9: Database Admin View**.

---

## 🔐 Environment Secrets
If you are deploying via Docker or Streamlit Cloud, securely bind your `GROQ_API_KEY` to the runtime context:
* **Streamlit Cloud**: Add it to repo UI -> `Settings` -> `Secrets`.
* **Local Mode**: Create a `.streamlit/secrets.toml` file matching `secrets.toml.template`.

---

## 🐞 Known Inter-Agent Mitigations
SAAP comes inherently aware of failure vectors occurring when chaining multiple LLM outputs together across various contexts. The issue-tracker automatically flags:
* `ERR-CTX-001`: Context Corruption (e.g. Gmail payload injected into Calendar args).
* `ERR-SEC-003`: Data Leakage (Sensitive file IDs exposed to Slack webhook).
* `ERR-ID-002`: System ID Namespace Collisions.

Monitor all live instances safely via the **Global Activity Bus** panel.
