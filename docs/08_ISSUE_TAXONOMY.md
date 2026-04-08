# Live Issue Taxonomy

SAAP tracks multi-agent hallucination loops. If two agents feed each other incorrect context, it causes a degradation loop. 

## The Error Codes
*   **ERR-CTX-001** (Context Corruption): Agent A's output format is misread by Agent B.
*   **ERR-SEC-003** (Data Leakage Risk): A public-facing agent queries restricted tokens.
*   **ERR-ID-002** (Namespace Collision): Using a Github Issue ID inside a Jira API parameter.
*   **ERR-SEC-001** (Prompt Injection): Scraper ingests malicious text and feeds it to Master Coordinator.
*   **ERR-LOCALE-001**: HubSpot returns `USD` while Sheets parses `EUR`.

The system detects these via RegExp matchers during execution pipelines and halts the sub-agent proactively.
