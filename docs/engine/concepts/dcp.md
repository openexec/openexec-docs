# Deterministic Control Plane (DCP)

The **Deterministic Control Plane** is the heart of OpenExec. It transforms AI agents from "generative guessers" into "surgical operators" by providing a reliable, relational source of truth for your project.

## The Problem: Probabilistic Context
Traditional AI agents rely on **Vector Databases** or simple **Grep** to find context. This is "Probabilistic" — the agent *hopes* to find the right code, but often receives irrelevant noise, leading to:
- **Hallucinations**: The agent "guesses" function names or parameters.
- **Token Waste**: Sending thousands of lines of irrelevant code to the LLM.
- **Line Drift**: Pointers becoming invalid as the file length changes.

## The Solution: Relational Pointers
The DCP moves project knowledge into specialized, structured SQLite tables. 

### 1. Surgical Symbol Pointers (OpenCode)
Instead of searching for text, OpenExec uses a native Go AST parser to index your code.
- **Exact Offsets**: Stores the precise byte-range and line numbers for every function and struct.
- **Functional Purpose**: Associates comments and docstrings with specific symbols.
- **Instant Retrieval**: The agent requests `read_symbol(funcName)` and receives only those specific lines.

### 2. Environment Topologies
Operational data is never "guessed." The DCP stores hard records for your deployment environments:
- **IP Addresses**: Fixed mapping of services to servers.
- **Auth Protocols**: Recorded steps for logging into clouds (GCP, AWS, K8s).
- **Runtime Constraints**: Version requirements for specific environments.

### 3. Hard Policy Gates
Deterministic rules are enforced locally before any code is saved:
- **Secret Detection**: Blocking hardcoded keys.
- **Compliance Rules**: Mandatory linting and type-checking via the `safe_commit` tool.

---

## How it works: The Request Flow

1.  **Intent Selection**: The local **BitNet 1-bit Router** parses your natural language locally.
2.  **Deterministic Fetch**: The Coordinator pulls the **exact records** from the SQLite Knowledge Base.
3.  **Surgical Injection**: The cloud LLM (Claude/GPT) receives **only the verified records**, ensuring 100% accuracy in its implementation plan.
