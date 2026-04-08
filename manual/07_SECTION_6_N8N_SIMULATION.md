# ⚙️ 7. Section 6: n8n Real Simulation

**Section 6** acts as the Visual Workflow builder layer for your agents by embedding an n8n visual flow integration.

### 🛠️ Execution & Interaction
Streamlit's basic python UI is excellent for data science but terrible for Node-based drag-and-drop graphs.
1. When you enter Section 6, SAAP executes `n8n_platform.html` using a cross-frame injection (`st.components.v1.html`).
2. This establishes an iframe displaying Node mapping.
3. Use the interface to "Visualize" how the 12 sub-agents connect via edge lines. 
4. **Use Case**: This acts as a pipeline validator. If you want to see exactly how your Jira Agent passes a JSON payload variable into your Slack bot, the n8n map draws the data path out securely.
