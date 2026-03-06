# Surgical Knowledge Map (DCP)

The **Deterministic Control Plane (DCP)** is OpenExec's "Library." It gives your AI a precise map of your project so it never has to guess.

## The Problem: "Chat and Hope"
Traditional AI tools (like Claude Code or Codex) send a bunch of files to the cloud and *hope* the AI finds the right spot. This leads to:
- **Hallucinations**: The AI "guesses" function names that don't exist.
- **High Costs**: Sending thousands of lines of code to the cloud is expensive.
- **Confusion**: The AI gets lost in too much irrelevant information.

## The Solution: A Precise Local Map
The DCP indexes your code locally. When an AI agent needs to make a change, it doesn't search for text—it looks at a precise "Surgical Code Map."

### 1. Surgical Symbol Pointers
Instead of searching for words, OpenExec indexes your code's structure (functions, classes, etc.).
- **Exact Map**: Knows the precise line numbers and character offsets.
- **Snippets Only**: The AI only receives the *exact* function it needs to change, not the whole file. This saves you tokens and ensures accuracy.

### 2. Environment Maps
OpenExec doesn't "guess" your deployment settings. It keeps a hard record of:
- **IP Addresses**: Exactly where your services are.
- **Auth Steps**: How to log into your cloud or database.

### 3. Hard Policy Guardrails
Rules are enforced locally before any code is saved. This means your AI can't accidentally commit a secret key or break a linting rule.

## Surgical Sanitization (PII Scrubbing)

The DCP doesn't just filter tools; it filters **data**. Every piece of information sent to an external model passes through a local sanitization layer:
- **PII Detection:** Automatically identifies emails and identity codes (like HETU).
- **Credential Masking:** Redacts API keys and passwords from request arguments.
- **Infrastructure Masking:** Replaces internal IP addresses with generic placeholders.

This ensures that the AI receives the **logic** it needs without ever seeing the **sensitive data** it shouldn't.

---

## Junior Dev Summary
Think of the DCP as a **Surgical GPS** for your code. While other tools are using a paper map and getting lost, OpenExec gives the AI turn-by-turn directions to the exact character it needs to change.
