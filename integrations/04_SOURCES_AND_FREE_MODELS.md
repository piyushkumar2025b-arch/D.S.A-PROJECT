# 📦 4. Sources: Where to Get Free Models

When running SAAP locally, you must download the AI models to your hard drive. Because of VRAM hardware limits on laptops, you should **only** download "Quantized" models (typically formatted as `.GGUF` files). 

Quantization compresses a 16GB model down to ~4GB with only a minor loss in reasoning.

## Best Libraries for Open Source Models

### 1. HuggingFace.co (The Hub)
HuggingFace is the primary repository for all AI. 
*   **Best Author to Follow**: Search for user `TheBloke` or `MaziyarPanahi` on HuggingFace. They automatically quantize every new open-source model into `.gguf` formats perfectly sized for laptops.
*   **How To Use**: Download the `.gguf` file and drop it into LM Studio's models folder.

### 2. Ollama's Built-In Library
If you are using Ollama, you do not need to hunt files online. Ollama maintains a highly-curated library.
*   **Browse**: Visit [ollama.com/library](https://ollama.com/library)
*   **Install**: Open your terminal and simply type `ollama run llama3`. Ollama will download, configure, and boot the API server automatically.

## Top 3 Free "Laptop-Friendly" Models for Agents
1. `llama3` (Meta) — *Best reasoning for the Master Coordinator.*
2. `phi3` (Microsoft) — *Smallest footprint, fastest generation for basic sub-agents.*
3. `mistral` (Mistral AI) — *Best balance of size and context-window length.*
