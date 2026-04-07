# 🔥 SAAP v5.6 — Ultra-Grade UI Transformation Prompt
### 50-Step Elite Redesign + Bug-Fix Directive
> **Target file:** `app.py` (8,324 lines) — Streamlit · SQLite · Groq API
> **Goal:** Make every pixel breathtaking. Fix all small issues. Ship production-grade quality.

---

## ⚡ MASTER CONTEXT — READ THIS FIRST

You are refactoring `app.py`, a large Streamlit application called **SAAP v5.6 — Smart Autonomous Agent Platform**. It has 9 navigable sections, 12 AI sub-agents, SQLite persistence, Groq API integration, and a deeply custom dark-theme CSS design system.

The app already has a strong dark-blue foundation (`--bg: #03050d`), custom fonts (Outfit + JetBrains Mono), and a comprehensive CSS token system. Your job is to take it from "impressive demo" to **jaw-dropping product** — the kind of UI people screenshot and share.

Do not break any existing Python logic. Only touch CSS, HTML strings inside `st.markdown(...)`, structural layout (`st.columns`, `st.tabs`, `st.expander`), and small UX improvements.

---

## STEP 1 — AUDIT THE DESIGN SYSTEM FIRST

Before writing a single line, read the full `:root { }` token block and list every CSS variable. Map out: background layers, surface hierarchy (`--bg` → `--surface3`), color palette, border system, glow variables, radius scale, and animation keyframes. Write a mental model: "card depth = 4 layers, glow = blue/green/cyan/amber, fonts = Outfit + JetBrains Mono." This prevents accidental inconsistency.

---

## STEP 2 — FIX THE SIDEBAR NAVIGATION UX

The current sidebar uses `st.radio()` with long strings like `"📘 Section 1 — Workflow Demo"`. This is functional but visually generic. Replace it with a custom HTML nav list rendered via `st.markdown(unsafe_allow_html=True)` + `st.session_state` for selection tracking. Each nav item should show: icon (large), section number (monospace, dim), name (bold), and a short tagline (tiny, muted). Active item gets a left blue border + faint background glow. Inactive items have a hover state. Ensure keyboard accessibility with `tabindex`.

---

## STEP 3 — UPGRADE THE HERO DASHBOARD HEADER

`render_hero_dashboard()` (line ~2513) outputs a `.hero-header` block. Enhance it: add an animated grid of tiny dots that subtly drift (CSS `@keyframes drift`). The hero title "SAAP" should use a gradient text fill: `background: linear-gradient(135deg, #60a5fa, #00d4ff, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent`. Add a "v5.6" version chip styled as a pill with cyan border. Add a pulsing green dot + "LIVE" text label below the title to signal real API readiness.

---

## STEP 4 — HERO STATS ROW — MAKE IT CINEMATIC

The `.hero-stat` elements (agent count, run count, etc.) look flat. Upgrade each stat to have: large bold number with gradient fill, unit label in monospace below, a subtle top-border gradient that matches stat category (blue = agents, green = runs, amber = tokens). Add a `counter-animation` via CSS that counts from 0 to the real value on page load using `@keyframes count-up` — or, since Streamlit doesn't support JS directly, use a JavaScript snippet injected via `st.components.v1.html()` for this animation only.

---

## STEP 5 — SIDEBAR — BRANDING BLOCK

At the top of the sidebar, add a branded logo block: a square icon (SVG inline — abstract hexagon or circuit grid) followed by "SAAP" in Outfit 800 weight with the gradient treatment from Step 3, then "Autonomous Agent Platform" in tiny muted monospace below. Add a thin horizontal rule with gradient fade. Below the rule, show a live status chip: green if Groq API key is set, red if not, with "● GROQ CONNECTED" or "● NO API KEY" text.

---

## STEP 6 — SIDEBAR BOTTOM — SYSTEM FOOTER

At the very bottom of the sidebar (use `st.sidebar` with a spacer), add a dark footer block showing: version badge ("v5.6"), today's date in monospace, a tiny token budget bar (percent of daily 1M token budget used), and the current Groq model selected. Use `get_daily_budget_stats()` for live data. Style it with `font-size: 0.68rem`, `color: var(--text3)`, and a subtle top border.

---

## STEP 7 — FIX THE GLOBAL FONT RENDERING

Add `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;` to the global CSS on `body, .stApp`. This alone makes every font appear crisper, especially on Mac Retina displays. Also ensure `font-feature-settings: "kern" 1, "liga" 1;` is applied on headings.

---

## STEP 8 — SECTION BADGE SYSTEM — STANDARDISE

Every section uses a different `.sim-badge`, `.live-badge`, `.research-badge`, `.org-badge` class, but the rendering is inconsistent — sometimes just the badge, sometimes with `<h2>` mixed in. Standardise: every section opens with a full-width "section header block" containing: badge (left), section title (center, large), and a description tagline (right, monospace, muted). Wrap this in a `.section-header` div with `display: flex; align-items: center; justify-content: space-between; padding: 20px 0 28px;`.

---

## STEP 9 — AGENT CARDS — VISUAL DEPTH

The `.agent-card` class already exists but all 12 agent cards look the same. Differentiate by category. Add a category-colour left-accent border: Google agents = blue, Messaging = green, Dev Tools = purple, Productivity = amber, Web = cyan, CRM = orange. Inject the agent's icon as a large watermark (`opacity: 0.05`, `font-size: 5rem`, `position: absolute; right: 16px; bottom: 8px`). This creates visual depth without adding clutter.

---

## STEP 10 — AGENT CARD STATUS ANIMATION

When an agent is `RUNNING` (`.agent-card-running`), add a real scan-line animation: a thin white/amber line that sweeps top to bottom every 2.5 seconds using `@keyframes scan-line { 0% { top: -5% } 100% { top: 105% } }` on a `::after` pseudo-element. This makes the "thinking" state feel alive. When `DONE`, flash a brief green border glow using `@keyframes done-flash` then settle to static green.

---

## STEP 11 — METRIC CARDS — UPGRADE THE ACCENT SYSTEM

The `.metric-card::before` top border is currently a static blue gradient. Make it dynamic: use a CSS custom property `--card-accent` defaulting to `var(--blue)`, so individual cards can have different accent colors via `style="--card-accent: var(--green)"`. Apply different accents based on the metric type (success = green, budget = amber, errors = red, agents = blue).

---

## STEP 12 — SECTION 1 WORKFLOW DEMO — VISUAL PIPELINE

The pipeline/workflow in Section 1 renders as a list of steps. Replace the plain list with a horizontal flow diagram: boxes connected by SVG arrows (rendered inline as HTML with `st.markdown`). Each step box shows: icon (top), step name (bold), status badge (bottom), estimated time (tiny monospace). Use flex layout with `gap: 0` and render connecting arrows (`→`) as styled `::after` pseudo-elements with a small triangle arrowhead. Active step should glow blue.

---

## STEP 13 — SECTION 2 RESEARCH AGENT — UPGRADE OUTPUT RENDERING

After a research run completes, the result is raw text in a `st.text_area` or `st.markdown`. Instead, parse the output into structured HTML: headings become `<h3 style="color: var(--cyan)">`, bullet points become styled list items with a `▸` prefix in blue, and code blocks get JetBrains Mono styling with a dark background. Wrap the entire output in a `.synthesis-report` div with the existing class + add a copy-to-clipboard button (📋) in the top-right corner using `st.components.v1.html()`.

---

## STEP 14 — SECTION 4 ORG MODE HEADER — FULL CINEMATIC TREATMENT

The `.org-header` is good but the `::before` orange gradient is too subtle. Make it bold: `radial-gradient(ellipse 80% 70% at 50% -15%, rgba(255,120,73,0.15), transparent 60%)`. Add an animated scanning border: `border-image: linear-gradient(90deg, transparent, rgba(255,120,73,0.6), transparent) 1` with a slow `@keyframes border-scroll` animation. Add a large faded "ORGANISATION MODE" watermark text in the background at 3% opacity.

---

## STEP 15 — SUB-AGENT GRID — RESPONSIVE AND POLISHED

The `.subagent-grid` uses `minmax(165px, 1fr)`. Reduce the minimum to `140px` so more agents fit on standard screens. Each grid cell should show: emoji icon (40px, centred), agent name (bold, truncated with `text-overflow: ellipsis`), category pill (coloured), and a mini status indicator. On hover, cards should `scale(1.04)` using `transform: scale(1.04)` (not `translateY` — scale feels more satisfying here). Add a subtle `box-shadow` that matches the card's category colour.

---

## STEP 16 — MASTER COORDINATOR BOX — PREMIUM TREATMENT

The `.master-agent-box` contains the "Master Coordinator Agent" display. Upgrade: add a brain/neural icon (🧠 or a custom SVG) centred and large at the top. Add three radiating ring animations using `@keyframes ring-pulse` (scale from 1 to 1.4, fade out) on three `::before` pseudo-elements with different animation delays (0s, 0.5s, 1s). This creates a "sonar pulse" effect showing the coordinator is orchestrating.

---

## STEP 17 — ISSUE TRACKER CARDS — SEVERITY COLOURS

The `.issue-critical`, `.issue-major`, `.issue-minor` classes exist but use thin left borders. Make severity more immediately obvious: critical issues get a full-width red tinted header row with "🔴 CRITICAL" badge; major issues get amber with "🟡 MAJOR"; minor issues get green with "🟢 MINOR". Use `background: linear-gradient(90deg, rgba(255,71,87,0.12), transparent)` for the header strip. Add a `Resolve` button per issue that marks it resolved in the DB.

---

## STEP 18 — FIX: SECTION 5 HUB LOGIN CARD

The `.login-card` currently centres on page with `max-width: 480px; margin: 48px auto`. In Streamlit's wide layout, this works but looks awkward. Wrap it in a three-column layout: `left, center (480px), right` with `st.columns([1, 2, 1])`. Add a decorative left panel to the login card with an abstract SVG pattern (circuit lines or a radial mesh) in the third column. This makes the login experience feel intentional, not afterthought.

---

## STEP 19 — FIX: SERVICES GRID — `.svc-connected` AND `.svc-disconnected`

The connected/disconnected service cards in Section 5 look identical except for border styling. Make the visual distinction far stronger: connected services show a green animated check icon (`✓` inside a pulsing green circle), service logo emoji at 2rem, last-tested timestamp in monospace, and a "Test Again" button. Disconnected services are visually desaturated (add `filter: grayscale(0.4)`), show a dashed border animation, and have a clear "Connect →" CTA button styled as a primary gradient button.

---

## STEP 20 — FIX: SECTION 7 OMEGA AGENT — RENDER HTML FILE INLINE

Section 7 currently just renders the `omega_agent.html` content. Instead of loading it raw, extract the key content and render it within SAAP's visual design system so it doesn't visually break the app's consistency. If embedding the full HTML, wrap it in an `st.components.v1.html()` call with `height=700` and a proper container with a matching dark border radius card.

---

## STEP 21 — FIX: SECTION 6 N8N SIMULATION — SAME TREATMENT

Section 6 embeds `n8n_platform.html`. Apply the same iframe/component treatment as Step 20. Add a section header before it with the sim-badge, a short explainer, and a "Full Screen" toggle using `st.session_state` that expands the component height from 600 to 900.

---

## STEP 22 — DATA TABLES — FULL CUSTOM STYLING

All `st.dataframe()` calls render basic tables. Upgrade every table: use `st.dataframe(df, use_container_width=True, hide_index=True)` and apply the `.stDataFrame` CSS more aggressively: alternating row backgrounds using `nth-child(even)` selector, status columns rendered with coloured pills (not plain text), agent names with icon prefixes, timestamps formatted as relative time ("2 min ago"). For status: inject custom HTML column using pandas `.style.apply()`.

---

## STEP 23 — PROGRESS BARS — ANIMATED AND SEGMENTED

The `.stProgress` bar is a single solid bar. For multi-step workflows, replace single progress with a **segmented progress tracker**: each step is a circle node with a connecting line. Completed steps = filled blue circle + tick. Active step = pulsing blue outline. Pending steps = dim grey outline. Render this as an HTML string injected via `st.markdown`. The current step's label should appear below in small monospace text.

---

## STEP 24 — TOAST NOTIFICATIONS SYSTEM

Replace `st.success()`, `st.error()`, `st.info()` used for transient feedback with a custom "toast" system. Inject a `<div id="toast-container">` via `st.components.v1.html()` once at app load. Create a Python helper `show_toast(msg, type)` that injects a `<div class="toast toast-{type}">` with auto-dismiss after 4 seconds using CSS `@keyframes toast-slide-in` and `@keyframes toast-fade-out`. Style toasts with glassmorphism: `background: rgba(10,17,30,0.9); backdrop-filter: blur(20px); border: 1px solid var(--border2)`.

---

## STEP 25 — EMPTY STATES — ADD PERSONALITY

When there are no tasks, no runs, no issues — the app shows nothing (or a plain Streamlit info box). Replace every empty state with a styled empty-state component: large muted emoji (📭, 🤖, 🔍), bold heading ("No runs yet"), subtext ("Start by picking an agent in the sidebar"), and a CTA button. Use `.metric-card` as the wrapper. This dramatically improves perceived completeness of the UI.

---

## STEP 26 — KNOWLEDGE BASE UI — CARD GRID

The knowledge base entries currently use `.kb-entry` with a simple layout. Convert to a card grid: 3 columns on wide, 1 on narrow. Each card shows title (bold), a 120-char excerpt (truncated with `…`), tag pills (coloured by category), and created date. Add a search input above the grid using `st.text_input` with a 🔍 prefix. Filter cards client-side (Python re-render). Add a "New Entry" button with a `+` icon that expands an inline form.

---

## STEP 27 — SCROLLABLE LOG PANELS — STYLED TERMINAL

The workflow run logs use `.run-log-line` in a plain markdown block. Replace with a proper terminal panel: fixed `max-height: 340px; overflow-y: auto` container with a dark background (`#010409`), monospace font, a blinking cursor `▊` at the bottom, and colour-coded log levels. Use ANSI-inspired colours: `INFO` = `#60a5fa`, `WARN` = `#fbbf24`, `ERROR` = `#f87171`, `SUCCESS` = `#34d399`. Add a "Clear Logs" button and an auto-scroll behaviour via JS injected once.

---

## STEP 28 — SECTION 8 ORG CHAT — FULL REDESIGN

The chat interface in Section 8 needs a proper chat bubble layout. User messages: right-aligned, blue gradient background, white text, avatar initial (first letter of member name) as a circle on the right. AI messages: left-aligned, surface background, cyan accent border-left, robot emoji avatar on left. Add timestamps (monospace, dim, small). Use `st.container()` with a scrollable wrapper. Ensure the input bar is pinned at the bottom, not floating in the middle.

---

## STEP 29 — SECTION 9 ADMIN — DATABASE EXPLORER

The admin section renders raw SQLite data. Upgrade to a proper DB explorer UI: tab strip for each table (agents, tasks, pipelines, knowledge_base, org_members, etc.). Each tab shows a count badge, a styled dataframe, and action buttons (🗑 Delete Selected, ↩ Reset, ⬇ Export CSV). Add a "Danger Zone" expander at the bottom with a red-tinted background for destructive actions (Reset DB, Clear Logs, Purge Old Tasks).

---

## STEP 30 — SECTION 3 RESEARCH PROBLEMS — PROBLEM CARDS

Section 3 shows open research problems as plain text or basic containers. Convert to a Kanban-style card grid: three columns — "Open", "In Progress", "Solved". Each card shows problem number, title, difficulty badge (Easy/Medium/Hard/Expert in different colours), a short description, and a "Start Research" button. Use gradient backgrounds matching difficulty: Hard = deep red tint, Expert = purple tint.

---

## STEP 31 — RESPONSIVE DESIGN — MOBILE-FIRST FIXES

Streamlit's mobile layout is often broken by custom CSS. Audit and fix these specific issues:
- `subagent-grid` minimum column width should drop to `120px` on screens < 768px (use CSS `@media`)
- `.hero-header` padding should reduce from `56px 48px` to `28px 20px` on mobile
- Hero stats row should wrap to 2×2 grid instead of 1×4
- Sidebar custom HTML nav (from Step 2) should collapse gracefully
- Agent cards should stack to single column
Add `@media (max-width: 768px)` blocks for all of these.

---

## STEP 32 — MICRO-INTERACTIONS — BUTTON RIPPLE EFFECT

Add a CSS ripple effect to all primary `.stButton > button[kind="primary"]` clicks. Inject this via the global CSS block: `:after` pseudo element that scales from 0 to 4 and fades out using `@keyframes ripple`. Apply via a `:active` state trigger. This is pure CSS — no JS needed. Also add `cursor: pointer` to all agent cards and clickable list items that currently show default cursor.

---

## STEP 33 — TABS — INDICATOR UPGRADE

The `div[data-testid="stTabs"] [role="tab"]` currently gets a simple `border-bottom`. Upgrade: the active tab gets a `box-shadow: 0 3px 0 0 var(--blue)` (not border — avoids layout shift), a subtle gradient background (`background: linear-gradient(180deg, transparent, rgba(79,142,247,0.06))`), and a count badge if the tab has data (e.g. "Issues (3)" — rendered via Python f-string in the tab label).

---

## STEP 34 — WORKFLOW DIAGRAM COMPONENT — UPGRADE

`render_workflow_diagram()` (line ~2477) generates agent flow boxes. Make each box show the agent's category icon, name, and a mini `QUEUED/RUNNING/DONE` badge. Connect boxes with animated dashed lines using `border-top: 2px dashed var(--border2); animation: dash-flow 1.5s linear infinite` using `@keyframes dash-flow { from { background-position: 0 0 } to { background-position: 20px 0 } }` on a gradient `background-size: 20px 2px`. The "active" connector line should be solid blue and glow.

---

## STEP 35 — FIX: JSON PARSE ERROR DISPLAY

In several places, the app parses JSON from DB results and can silently fail. Ensure all `json.loads()` calls are wrapped in try/except. On failure, show an inline error card (not a full page crash): a small `.result-error` div with the raw string and an error message. The already-existing `result-error` CSS class should be used consistently for these cases.

---

## STEP 36 — FIX: SCHEDULER THREAD LEAK

The `BackgroundScheduler` from `apscheduler` starts on every Streamlit re-run if not guarded. Add a `"scheduler_started"` key to `st.session_state` and only call `scheduler.start()` when that key doesn't exist. Without this, each page interaction spawns a new scheduler thread, eventually causing memory issues. Add `atexit.register(scheduler.shutdown)` as well.

---

## STEP 37 — FIX: API KEY INPUT — MASK AND PERSIST

The Groq API key input in the sidebar should: (1) use `type="password"` (Streamlit `st.text_input(..., type="password")`), (2) persist the value in `st.session_state` across re-runs (it does this already via key= param but verify), (3) show a checkmark icon and "Key saved" confirmation in green when a valid-format key is entered (starts with "gsk_"), (4) never log or display the key value in any debug output or DB field.

---

## STEP 38 — FIX: CONCURRENT DB WRITES

The `_DB_LOCK = threading.Lock()` is defined but never used in most DB write functions. The threading.Lock context manager should wrap every `sqlite3.connect()` call in write functions (`save_agent_memory`, `track_tokens_budget`, `run_org_workflow()`, etc.). Without this, concurrent agent runs can corrupt the SQLite WAL. Audit every write function and add `with _DB_LOCK:` around the connect block.

---

## STEP 39 — FIX: GROQ API RETRY LOGIC

Groq API calls can fail with `RateLimitError` or `APIConnectionError`. The current code likely has basic try/except but no retry. Add an exponential backoff retry wrapper:
```python
def call_groq_with_retry(client, model, messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(model=model, messages=messages)
        except Exception as e:
            if attempt == max_retries - 1: raise
            time.sleep(2 ** attempt)
```
Apply this wrapper to every Groq API call site in the file.

---

## STEP 40 — FIX: LONG OUTPUTS — TRUNCATION WITH EXPAND

When agent results are very long (> 2000 chars), `st.markdown()` renders the full wall of text. Add automatic truncation: show the first 600 chars + a "▼ Show full output" expander that reveals the rest. Use `st.expander("Show full output", expanded=False)` with the full result inside. This prevents the page from becoming unscrollable after a large research run.

---

## STEP 41 — COLOUR MODE — RESPECT SYSTEM PREFERENCES (PARTIAL)

Add a `@media (prefers-reduced-motion: reduce)` block that disables all CSS animations (`animation: none !important; transition: none !important`) for users who have this OS preference set. This is an accessibility requirement. Also disable the `.hero-header::after` rotation, the scan-line, the badge pulse, and the ring-pulse animations under this media query.

---

## STEP 42 — SECTION TRANSITIONS — FADE IN ON NAVIGATION

When the user switches sections via the sidebar, the content appears instantly. Add a `.section-wrapper` div around each section's content with `animation: fadeInUp 0.35s ease-out`. Every major section render function should wrap its output in:
```python
st.markdown('<div class="section-wrapper fade-in">', unsafe_allow_html=True)
# ... section content ...
st.markdown('</div>', unsafe_allow_html=True)
```
The `fadeInUp` keyframe already exists in the CSS — just ensure the class is applied.

---

## STEP 43 — SEARCH / FILTER — GLOBAL AGENT SEARCH

Add a global search bar at the top of the main content area (below the section header, above the content). Use `st.text_input("🔍 Search agents, tasks, runs...", placeholder="Type to filter...", label_visibility="collapsed")`. Filter agents by name/category, tasks by status/agent, runs by date. Results should update reactively on each keystroke (Streamlit re-renders on input change by default). Style the search bar with a magnifying glass icon prefix and a subtle blue focus ring.

---

## STEP 44 — KEYBOARD SHORTCUTS OVERLAY

Add a "Keyboard Shortcuts" panel accessible via a `?` button in the bottom-right corner of the screen. It shows a floating overlay card (`.overlay-card` class — create this) listing shortcuts:
- `G + 1-9` → Jump to Section N
- `R` → Run selected agent
- `Esc` → Close overlays
Implement the G key navigation via injected JavaScript: `window.addEventListener('keydown', ...)` using `st.components.v1.html()`. Pressing G+1 through G+9 updates a URL query param that Streamlit reads to set the section.

---

## STEP 45 — PERFORMANCE — LAZY-LOAD SECTION CONTENT

Sections 4, 5, and 8 make DB calls on render even when not selected. Wrap all DB calls and heavy computations inside `if selected_section == "Section X":` guards. Currently some `@st.cache_data` decorators exist (`get_agents()`) — audit and add caching to `get_daily_budget_stats()`, `get_agent_memory()`, and all org member/integration fetch functions. Cache TTL should be 60s for live data, 300s for config data.

---

## STEP 46 — DOCS SECTION — UPGRADE LAYOUT

`render_section_6_docs()` renders a sidebar radio + markdown content. Upgrade: render the docs as a proper two-panel layout. Left panel (25% width via `st.columns([1, 3])`): table of contents with anchor links, styled as a vertical nav list with hover states. Right panel (75%): the doc content rendered in a `.doc-section` card with syntax highlighting for all code blocks. Add a "Copy Code" button to each code block.

---

## STEP 47 — FOOTER — GLOBAL APP FOOTER

Add a global footer below all section content (outside the main section routing block). It should contain: SAAP logo/name on the left, version number, a "Powered by Groq + Streamlit" tagline in the centre, and on the right: a "Send Feedback" button (links to a GitHub issues URL) and a "Report Bug" button. Style with the same dark treatment, a top gradient border, and `font-size: 0.75rem`.

---

## STEP 48 — POLISH: CONSISTENT ICON LANGUAGE

Audit every emoji and icon used across the app. Create a `ICONS` dict at the top of `app.py`:
```python
ICONS = {
    "running": "⚡", "done": "✅", "error": "🔴",
    "pending": "⏳", "warning": "⚠️", "info": "ℹ️",
    "agent": "🤖", "workflow": "🔗", "report": "📄",
    "user": "👤", "settings": "⚙️", "search": "🔍",
}
```
Replace all ad-hoc emoji literals in `st.markdown()` strings with `ICONS["key"]` references. This ensures visual consistency and makes global icon changes trivial.

---

## STEP 49 — FINAL POLISH: LOADING STATES

Every `st.spinner("Running agent...")` call should be accompanied by a progress text update below. Wrap long-running operations in a custom context manager that shows: agent name being called, estimated time remaining, token count so far, and the current step name. Use `st.status()` (Streamlit 1.28+) as a structured alternative to `st.spinner` — it allows updating inner text without full re-renders.

---

## STEP 50 — REVIEW AND SHIP

After all changes, do a final pass:

1. **Visual QA**: Check every section in order (1–9). Verify no white flashes, no unstyled elements, no broken layout in 3-column or mobile view.
2. **Performance QA**: Confirm `@st.cache_data` is on all read-heavy DB functions. Confirm the scheduler only starts once per session.
3. **Security QA**: Confirm the API key never appears in logs, DB, or rendered HTML.
4. **Copy QA**: Every empty state, button label, and error message should be professional and consistent in tone (sentence case, no trailing periods on badges).
5. **CSS QA**: Ensure no `!important` overuse beyond Streamlit overrides. Ensure no z-index conflicts between overlay cards and Streamlit's own dialogs.
6. **Commit message**: `feat(ui): SAAP v5.6 — Full UI transformation, 50-point audit, bug fixes`

---

## 📐 DESIGN PHILOSOPHY (Reference Throughout)

| Principle | Implementation |
|-----------|---------------|
| Depth over flatness | Every card has 3 visual layers: bg, border, pseudo-element glow |
| Motion with purpose | Animation = state change signal, not decoration |
| Data density with clarity | Monospace for numbers/codes, Outfit for prose |
| Dark but not black | `#03050d` base, not `#000000` — avoid pure blacks |
| Colour = meaning | Blue = info/agents, Green = success/live, Amber = warning/budget, Red = error, Cyan = interactive, Purple = AI/synthesis |
| Hover always responds | Every interactive element must have a visible hover state |
| Empty states earn trust | No blank spaces — always a message, icon, and CTA |

---

## 🚀 EXECUTION ORDER

```
Steps 1, 7, 35-39 (Foundation + Bugs)
  → Steps 2-6 (Navigation + Sidebar)
    → Steps 8-17 (Core UI Components)
      → Steps 18-30 (Section-by-Section)
        → Steps 31-34 (Responsive + Interactions)
          → Steps 40-49 (Polish + Performance)
            → Step 50 (Ship)
```

Each step is independent enough to be applied in isolation, but the above order minimises merge conflicts and visual regression.

---

*Generated for SAAP v5.6 · app.py (8,324 lines) · April 2026*
