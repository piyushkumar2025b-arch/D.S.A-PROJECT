with open("app.py", encoding="utf-8") as f:
    content = f.read()
    lines = content.splitlines()

g_lines = lines[1760:1965]
print("gemini in AGENT_PROMPTS:", any("gemini-ai-agent" in l for l in g_lines))
print("google-search in AGENT_PROMPTS:", any("google-search-agent" in l for l in g_lines))
print("vertex in AGENT_PROMPTS:", any("vertex-ai-agent" in l for l in g_lines))
print("omega relative path:", any('path = "omega_agent.html"' in l for l in lines))
print("n8n relative path:", any('path = "n8n_platform.html"' in l for l in lines))

# Find PLATFORM_START_TIME
for i, l in enumerate(lines, 1):
    if "PLATFORM_START_TIME" in l and "=" in l and not l.strip().startswith("#"):
        print(f"L{i}: {l.strip()}")
        break

# Count chat login refs
chat_refs = [(i+1, l.strip()) for i, l in enumerate(lines) if "chat_login" in l]
print(f"chat_login refs: {len(chat_refs)}")
for ref in chat_refs[:5]:
    print(f"  L{ref[0]}: {ref[1][:80]}")

# Check hub_resolve_live_data def
for i, l in enumerate(lines, 1):
    if "def hub_resolve_live_data" in l:
        print(f"L{i}: hub_resolve_live_data defined OK")
        break

# Check Optional import
for i, l in enumerate(lines, 1):
    if "Optional" in l and "import" in l:
        print(f"L{i}: {l.strip()[:80]}")
        break

# Check what section 8 org_chat code looks like
for i, l in enumerate(lines, 1):
    if 'page == "org_chat"' in l or "page == 'org_chat'" in l:
        print(f"L{i}: ORG_CHAT page routing: {l.strip()}")
