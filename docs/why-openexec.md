---
title: Why OpenExec?
sidebar_position: 2
slug: /why-openexec
---

# Why OpenExec?

If you've used AI tools like **Claude Code** or **GitHub Codex**, you're used to sending your entire project to the cloud for the AI to "guess" how to help. OpenExec takes a different approach: **Local-First Precision**.

## 🧠 Hybrid Brains: Your Choice, Every Task

OpenExec doesn't lock you into a single AI model. It allows you to choose a different "brain" for each stage of your project:

- **Planning:** Use a powerful cloud model like **Claude 4.6 Sonnet** to map out your project's logic and architecture.
- **Implementation:** Switch to a **Local LLM** (running on your machine via Ollama) for fast, private, and free code writing.
- **Review:** Use another high-quality model to act as a final "quality gate" for every change.

This flexibility lets you balance **Cost, Privacy, and Reasoning Power** on a task-by-task basis.

## 📚 Local Knowledge: The AI's Personal Library

Most AI tools "chat and hope"—they send a few files to the cloud and hope the AI finds the right spot. OpenExec uses a **Local Knowledgebase (DCP)** that acts as a precise "map" of your entire project.

### 🏠 Local Knowledge vs. Cloud Guessing
- **Surgical Precision:** OpenExec knows the exact line and character where every function starts. It doesn't guess; it points.
- **Token Efficiency:** Because the "map" is on your machine, OpenExec only sends the **exact snippet** the AI needs. This saves you money on API tokens and prevents the AI from getting confused by too much irrelevant code.
- **100% Privacy:** Your project's structure (the "map") stays on your machine. You only send specific code snippets when you choose to use a cloud model.

## ⚔️ OpenExec vs. The Others

| Feature | Cloud-Only Tools (Claude Code/Codex) | OpenExec |
| :--- | :--- | :--- |
| **Data Privacy** | Code sent to cloud for indexing | Indexing stays 100% Local |
| **Model Choice** | Locked to one provider | Hybrid (Cloud + Local LLM) |
| **Precision** | Search-based (Probabilistic) | Map-based (Deterministic) |
| **Cost** | High (sends entire files) | Low (sends only tiny snippets) |
| **Reliability** | "Chat and Hope" | Verified Execution Loop |

---
**Next:** [Get Started with Installation](/engine/intro)
