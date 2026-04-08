# Section 6: n8n Simulation Engine

SAAP natively simulates `n8n` execution graphs directly over Streamlit utilizing HTML/JS wrappers.

## HTML Injection Architecture
In `app.py`, rather than using Streamlit's native python components to render flow charts (which is laggy), we utilize raw web wrappers connecting to `n8n_platform.html`.

### How It Works:
1. Python calculates the node hierarchy and edges based on the workflow definition.
2. The payload is JSON-stringified and passed down globally.
3. The custom React/Vanilla JS frame in `n8n_platform.html` consumes the JSON payload to visually sketch the Node lines securely over the Streamlit canvas (`unsafe_allow_html=True`).
