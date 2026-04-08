# 🔑 5. Cloud API Keys & Secret Setup

If you decide not to run local models (due to hardware limits) and want to use cloud providers like Groq, OpenAI, or Anthropic for massive enterprise scale, here is how you manage those connections.

## Where to get FREE / Low Cost API Keys

### 1. Groq (Fastest)
Groq provides completely **FREE** access to Llama-3 running on hyper-fast LPUs.
*   **Website**: [console.groq.com](https://console.groq.com)
*   **How To Get**: Click "API Keys" -> "Create API Key".
*   **Pricing**: Free tier has massive allowance. Great for students and devs.

### 2. Google Gemini (Best Context Window)
Google offers an enormous 2-Million token context window API, great for analyzing massive knowledge bases.
*   **Website**: [aistudio.google.com](https://aistudio.google.com)
*   **How To Get**: Click "Get API Key" on the left sidebar.
*   **Pricing**: Generous free tier for Gemini 1.5 Flash.

### 3. Together AI / OpenRouter (Largest Variety)
If you want to access hundreds of open-source models without downloading them.
*   **Website**: [openrouter.ai](https://openrouter.ai)
*   **Pricing**: Pay-per-token. Many open-source models are completely free to query.

## Setting up Streamlit Secrets

Streamlit strictly prevents hard-coding API keys into `app.py`. Instead, it uses a Secrets manager.

### 1. Local Setup
1. Inside your project folder, create a hidden directory: `.streamlit/`
2. Inside that directory, create a file named `secrets.toml`.
3. Add your keys exactly like this:
```toml
GROQ_API_KEY = "gsk_YourVeryLongKeyStringHere"
OPENAI_API_KEY = "sk-YourKeyHere"
SLACK_BOT_TOKEN = "xoxb-YourTokenHere"
```
4. In `app.py`, SAAP reads this securely via `st.secrets["GROQ_API_KEY"]`.

### 2. Cloud Setup (Github)
If you push SAAP to Github, **ensure `.streamlit/secrets.toml` is in your `.gitignore`**. 
To add keys on the cloud host:
1. Go to your Streamlit Community Cloud dashboard.
2. Click your App's Settings ⚙️ -> **Secrets**.
3. Paste the exact TOML blocks from above and click Save. The server will restart with the securely injected keys.
