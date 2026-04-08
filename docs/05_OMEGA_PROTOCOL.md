# Section 7: Omega Protocol

The Omega Agent represents the pinnacle of multi-step autonomous behavior within SAAP.

## Autonomous Research Workflows
Usually, an agent stops after generating 1 response. Omega runs in a recursive `while` loop until a definition of "Done" is met.

### System Safety Check
To prevent Infinite API Loops costing thousands of dollars:
- Omega is hard-capped at an iteration limit (often 5-10 loops).
- Groq token burn constraints (`DAILY_TOKEN_BUDGET`) immediately trigger a fallback interrupt if the context burn accelerates beyond parameters.

The generated synthesis outputs to an Executive Level summary card using the premium UI tokens.
