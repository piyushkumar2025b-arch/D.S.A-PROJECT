# 🤖 SAAP — Smart Autonomous Agent Platform
### Streamlit Research Prototype · Powered by Groq (FREE, no credit card)

---

## 🔑 Get Your Free API Key (60 seconds, no credit card)

1. Go to **https://console.groq.com**
2. Sign Up with Google or email
3. Click **API Keys** → **Create API Key**
4. Copy the key starting with `gsk_…`
5. Paste into the sidebar of the running app

**Free limits:** 14,400 requests/day · 500,000 tokens/day · Resets daily

---

## 🚀 Deploy on Streamlit Cloud (Free)

1. Push this folder as a GitHub repo
2. Go to **https://share.streamlit.io** → New app
3. Select your repo, branch `main`, file `app.py`
4. Under **Advanced → Secrets** add:
   ```toml
   GROQ_API_KEY = "gsk_your_key_here"
   ```
5. Click **Deploy** ✅

---

## 💻 Run Locally

```bash
pip install -r requirements.txt
streamlit run app.py
```
Open **http://localhost:8501**

---

## 📦 What's Inside

| Page | Description |
|------|-------------|
| 🏠 Dashboard | All 12 agent cards with actions |
| 🚀 Run Agent | Live agent execution with structured output |
| 🔗 Pipeline Builder | Chain agents, save & re-run pipelines |
| 🧪 Playground | Free-form JSON editor for any agent |
| 📜 Task History | Full audit trail with export |
| 📊 Analytics | Charts: agent usage, success rates, daily activity |
| 📚 Knowledge Base | Store docs, search, ask AI questions |
| ℹ️ Architecture | System diagram + research context |

## 12 Agents

`gmail-summary` · `calendar-manager` · `drive-manager` · `slack-agent` ·
`github-agent` · `sheets-agent` · `notion-agent` · `web-scraper` ·
`jira-agent` · `airtable-agent` · `linear-agent` · `hubspot-agent`

---

## License
MIT
