# 🖇️ 6. Workspace Sub-Agent API Keys

To unlock the true power of **Section 4: Real Org Mode**, the 12 master sub-agents require authentic API keys and OAuth tokens to modify live workspace data. 

Below is the definitive guide on where and how to acquire the developer keys for all 12 integrations. 

---

### 1. 📧 Gmail Intelligence & 📅 Time Intelligence & 📁 Knowledge Store
These three agents share the overarching **Google Cloud Platform (GCP)** framework.
*   **Source**: [Google Cloud Console](https://console.cloud.google.com/)
*   **How To Setup**:
    1. Go to GCP Console and create a New Project.
    2. Navigate to **APIs & Services > Library**.
    3. Enable **Gmail API**, **Google Calendar API**, and **Google Drive API**.
    4. Go to **Credentials > Create Credentials > OAuth client ID**.
    5. Configure the Consent Screen and download the `credentials.json` file to your project root.
*   **Cost**: Free within generous daily quotas.

### 2. 💬 Team Pulse (Slack)
*   **Source**: [Slack API Dashboard](https://api.slack.com/apps)
*   **How To Setup**:
    1. Click **Create New App** -> From scratch.
    2. Choose your target Workspace.
    3. Go to **OAuth & Permissions**. Add scopes: `chat:write`, `channels:history`, `users:read`.
    4. Click **Install to Workspace**.
    5. Copy the **Bot User OAuth Token** (Starts with `xoxb-`).
*   **Cost**: Free.

### 3. 🐙 Engineering Intel (GitHub)
*   **Source**: [GitHub Developer Settings](https://github.com/settings/tokens)
*   **How To Setup**:
    1. Log into GitHub and go to Settings.
    2. Scroll to bottom left -> **Developer Settings** -> **Personal access tokens** -> **Tokens (classic)**.
    3. Click **Generate new token**. Add the `repo` scope to read/write PRs and code.
    4. Save the literal token starting with `ghp_`. *(Note: For orgs, it goes in `.streamlit/secrets.toml`)*
*   **Cost**: Free.

### 4. 📊 Data Operations (Google Sheets)
*   **Source**: [Google Cloud Console](https://console.cloud.google.com/)
*   **How To Setup**:
    1. This shares the GCP project from Agent 1.
    2. Ensure the **Google Sheets API** is enabled.
    3. To access specific sheets, share your private Google Sheet spreadsheet with the specific "Service Account Email" found in your Google Console, giving it Editor rights.
*   **Cost**: Free.

### 5. 📝 Knowledge Engine (Notion)
*   **Source**: [Notion Developers](https://www.notion.so/my-integrations)
*   **How To Setup**:
    1. Create a "New integration".
    2. Name it "SAAP V5.6" and copy the **Internal Integration Secret**.
    3. **Crucial**: Go to the actual Notion page you want to write to, click the `...` menu in the top right, click **Add Connections**, and add your new integration. Otherwise, the API gets a `404 Not Found` error.
*   **Cost**: Free.

### 6. 🎯 Project Tracker (Jira)
*   **Source**: [Atlassian Account API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
*   **How To Setup**:
    1. Log into your Atlassian account matrix.
    2. Click **Create API Token**.
    3. Instead of just passing the token, Atlassian REST APIs require an Auth string formatted as `email@domain.com:YOUR_API_TOKEN` converted to Base64.
*   **Cost**: Free for up to 10 users on Jira Cloud.

### 7. 🗃️ Operations Database (Airtable)
*   **Source**: [Airtable Personal Access Tokens](https://airtable.com/create/tokens)
*   **How To Setup**:
    1. Go to Developer Hub -> **Create Token**.
    2. Add scopes: `data.records:read` and `data.records:write`.
    3. Add "Bases" to specify exactly which Airtable grids SAAP is allowed to edit.
    4. Copy the long Bearer token starting with `pat`.
*   **Cost**: Free tier includes massive API operation limits.

### 8. 🔷 Product Velocity (Linear)
*   **Source**: Linear App -> Settings -> [API Section](https://linear.app/settings/api)
*   **How To Setup**:
    1. From Linear UI, go to Workspace Settings -> API.
    2. Under **Personal API keys**, generate a new key.
    3. Pass this as the `Authorization: YOUR_KEY` header facing Linear's GraphQL API.
*   **Cost**: Free.

### 9. 🏢 Revenue Intelligence (HubSpot)
*   **Source**: [HubSpot App Portal](https://app.hubspot.com/private-apps)
*   **How To Setup**:
    1. In your HubSpot portal, click the Settings Gear ⚙️ -> Integrations -> **Private Apps**.
    2. Create a Private App.
    3. Under Scopes, select `crm.objects.contacts.read/write` and `crm.objects.deals.read/write`.
    4. Provide SAAP the generated standard Bearer access token.
*   **Cost**: Free tier supports basic CRM API reading.

### 10. 🌐 Market Intelligence (Web Scraper)
*   **Source**: Does not strictly require a specialized key, usually relying on standard Python HTTP/HTTPS.
*   **Optional Upgrade (Tavily)**: If you want hallucination-free search results, getting a free API key from [Tavily.com](https://tavily.com) avoids hitting CAPTCHAs while scraping Google.

---

## 🔒 Injecting Keys into SAAP
Once you acquire these keys, open your `.streamlit/secrets.toml` file.

**Template Schema:**
```toml
# Main AI Keys
GROQ_API_KEY = "gsk_..."

# Workspace Sub-Agent Keys
SLACK_BOT_TOKEN = "xoxb-..."
GITHUB_TOKEN = "ghp_..."
NOTION_TOKEN = "secret_..."
JIRA_EMAIL = "you@org.com"
JIRA_API_TOKEN = "..."
AIRTABLE_TOKEN = "pat..."
LINEAR_API_KEY = "..."
HUBSPOT_TOKEN = "pat-na1-..."
```
The central Master Orchestrator in `app.py` is configured to organically pull these strings when determining if a Sub-Agent can hit Real APIs or must fallback to Mock Simulation mode.
