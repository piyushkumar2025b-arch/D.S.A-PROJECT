# UI Design System: Glassmorphism

SAAP utilizes "Enterprise UI" aesthetics via injected CSS tags overriding Streamlit's minimal default theme.

## Core Visual Strategies
1. **Glassmorphism**: Using `radial-gradient` textures over a dark theme (`#0a1120`) to create depth planes.
2. **Hover Interactions**: Interactive elements raise via `translateY(-4px)` with scaling parameters that enhance tactile feel.
3. **Typography**: Enforces `Outfit` for main text and `JetBrains Mono` for codebase/logs, overriding system standard fonts.
4. **Neon Badges**: Dynamic `box-shadow` pulses utilizing `10e87e` (Neon Green) to simulate Live API socket statuses seamlessly.

All of this lives dynamically in `st.markdown("<style>...</style>")` blocks hoisted to the initialization frame of the layout loop.
