# 💻 3. System Requirements & User Types

Running SAAP locally requires specific hardware. Open-source Large Language Models (LLMs) are intensely bound to your physical VRAM (Video RAM) and unified memory.

## Hardware Tiers for Laptops

### Minimum Tier (The "Student" Setup)
*   **Hardware**: M1/M2 Mac with 8GB RAM **OR** Windows PC with 16GB RAM + 4GB VRAM GPU.
*   **Supported Models**: `Phi-3-Mini` (3.8B), `Qwen-1.5` (4B).
*   **Experience**: Small context limits. Agents might forget previous conversational history. Execution will be slow (10 tokens/sec).

### Recommended Tier (The "Developer" Setup)
*   **Hardware**: M2/M3 Pro Mac with 18GB/36GB Unified Memory **OR** Windows PC with RTX 3060/4060 (8GB+ VRAM).
*   **Supported Models**: `Llama-3-8B-Instruct`, `Mistral-v0.3` (7B).
*   **Experience**: Fast, competent agent delegation. SAAP will operate smoothly, resolving agent loops at roughly 35 tokens/sec.

### Elite Tier (The "Enterprise" Setup)
*   **Hardware**: Mac Studio M2 Ultra (128GB+) **OR** Windows PC with 2x RTX 4090/3090 (24GB VRAM each).
*   **Supported Models**: `Mixtral 8x7B`, `Llama-3-70B` (Quantized).
*   **Experience**: Matches cloud performance. Outstanding reasoning logic enabling the Omega Researcher to solve complex logical problems locally.

## User Type Configurations
*   **General User**: Use the `LM Studio` GUI. It is one-click setup.
*   **Developers**: Use `Ollama` via CLI. It is lightweight and allows you to programmatically pull models via terminal during the SAAP boot sequence.
