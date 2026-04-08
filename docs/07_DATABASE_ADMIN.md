# Database & Persistence

SAAP avoids complex Postgres deployments by shipping entirely on SQLite3. However, Streamlit's concurrency model easily corrupts standard SQLite instances via `database is locked` conditions.

## Thread-Safe Handling
1. **Connection Argument**: Connection logic enforces `check_same_thread=False`.
2. **Context Manager Pattern**: We do not hold database connections open. 
```python
with db() as conn:
   conn.execute(...)
```
This forces Python to acquire the lock, insert, and immediately release it before the thread context switches.

## Database Tables
- `hub_members`
- `chat_profiles`
- `hub_audit_log`
- `org_workflow_runs`

These seamlessly log all operations directly.
