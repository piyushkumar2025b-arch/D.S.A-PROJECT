# Deployment Strategy

## Platform: Streamlit Cloud natively

1. **Virtual Environments**: Always clone your python scope via `.venv` isolation.
2. **Boot Flag**: Running `streamlit run app.py` defaults to port `8501`. 
3. **CORS Restrictions**: Automatically bound via CLI parameter `--server.headless true` to ensure headless cloud engines (like Docker AWS) do not attempt logical frame launches.
4. **Secrets Context**: If running purely local, `st.secrets` parses `.streamlit/secrets.toml`. If pushing to cloud, use the dashboard environment injector to insert `GROQ_API_KEY`.

Do NOT push `.streamlit/secrets.toml` to Github. This is enforced via our modified `.gitignore`.
