# 🧠 11. Advanced Orchestration Logic

This guide deep-dives into the "Brain" of SAAP: the Master Coordinator interaction with Specialist Sub-Agents.

## The Chain of Thought (CoT)
When you submit a request in **Section 4** or **Section 8**, SAAP doesn't just "guess." It follows a rigid logical pipeline:

1. **Intent Extraction**: The system uses the LLM to identify the "Primary Request Category" (e.g., *Engineering*, *Marketing*, *HR*).
2. **Sub-Agent Selection**: Based on the category, the Master Coordinator selects 1-3 relevant agents from the 12 available.
3. **Prompt Composition**: The system builds a unique prompt for each agent, passing only relevant context to avoid "token noise."
4. **Parallel Execution**: Agents run their tasks. If an agent fails (e.g., a timeout), SAAP logs the error in the **Issue Tracker** and attempts a "Graceful Fallback" to a simulated response.
5. **Synthesis**: The Master Agent takes the successful returns and merges them into a cohesive summary.

## Debugging the Trace
Users can view the "Execution Logs" in most sections to see the raw JSON being passed. This is vital for fine-tuning your prompts and understanding how the Coordinator makes decisions.
