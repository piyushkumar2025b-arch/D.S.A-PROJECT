# 🔧 12. Troubleshooting & FAQ

Even the best automated platforms encounter hiccups. Here is how to resolve common issues in SAAP v5.6.

## Common Issues

### 1. "ModuleNotFoundError: No module named 'streamlit'"
*   **Cause**: Your python environment doesn't have the dependencies installed.
*   **Fix**: Run `pip install -r requirements.txt` in your terminal.

### 2. "Database is locked"
*   **Cause**: Too many write operations happening at once in SQLite.
*   **Fix**: Navigate to **Section 9** and check the DB Health. Restarting the Streamlit app usually clears the thread lock.

### 3. "Agent returns 'Rate Limit Exceeded'"
*   **Cause**: You have hit your Groq API free tier limit.
*   **Fix**: Wait a few minutes or switch to **Local LLM Mode** (see the `integrations/` folder for setup).

### 4. "n8n Map not loading"
*   **Cause**: Browsers sometimes block the IFrame for security.
*   **Fix**: Ensure you have `unsafe_allow_html=True` enabled in the code (it is by default) and check if any ad-blockers are interrupting the script.

## Getting Help
Check the `docs/` folder for architectural deep-dives if you are planning to modify the source code.
