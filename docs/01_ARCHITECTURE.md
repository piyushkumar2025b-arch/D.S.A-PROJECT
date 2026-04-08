# System Architecture

SAAP v5.6 relies on a Master Orchestrator pattern. At its core, the `app.py` establishes a router that splits execution flows into 9 explicit `Sections`.

## 1. Flow of Execution
- **State Init**: The app first boots and defines all Streamlit `session_state` parameters (e.g. `hub_logged_in`).
- **Connection pooling**: Next, `@st.cache_resource` sets up thread-safe SQLite mapping.
- **Router Logic**: A main sidebar conditionally imports or executes different logical functions depending on the `page` variable selected.

## 2. Abstraction Layers
We decouple the user interface from business logic:
- **UI Renderers**: `build_omega_html()`, CSS wrappers (`.agent-card`).
- **Execution Drivers**: `hub_verify_login()`, `groq_llm_call()`.
- **Database Adapters**: Raw SQLite inserts mapped through Context Managers (`with db() as c:`).
