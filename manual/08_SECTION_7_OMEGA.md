# Ω 8. Section 7: Omega Agent

**Section 7** removes human intervention almost entirely. Omega is the true "AutoGPT" style worker operating within SAAP.

### 🔄 The Recursive Loop
Unlike Section 4 (which fires 1 master command sequentially down to bots), Omega executes recursively.

1. **Start**: You provide Omega with a massive research target.
2. **Phase 1: Planning**: Omega uses Groq to write a 10-step plan to achieve the target.
3. **Phase 2: Execution `while` Loop**: 
   - Omega executes Step 1. 
   - Evaluates the output. 
   - If the output fails, it re-prompts itself recursively to fix the error.
   - Once Step 1 is perfect, it moves to Sequence 2.
4. **Halting Mechanisms**: Omega hits the Streamlit `while` loop breaker if it exceeds its iteration cap to stop it from burning $1,000s in API token costs due to an infinite logic trap.
