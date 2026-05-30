---
title: State Management
sidebar_position: 3
---

# State Management: SQLite Source of Truth

OpenExec maintains a high degree of reliability and recoverability by centralizing all orchestration state into a local **SQLite database**.

While earlier versions relied on JSON artifacts (like `stories.json` or `tasks.json`), OpenExec v0.5+ uses a unified relational schema to prevent "ghost state" and ensure atomicity.

## The Unified Schema

The core database (`.openexec/openexec.db`) manages several critical domains:

1.  **Sessions:** Long-term conversational context and model configurations.
2.  **Runs:** Individual execution instances of a blueprint or task.
3.  **Steps:** The specific iterations within a run, including their input/output hashes.
4.  **Artifacts:** Content-addressed pointers to patches, logs, and summaries stored on disk.
5.  **Audit Vault:** An append-only record of every tool call, AI decision, and security check. Optional AES-GCM encryption is available but disabled by default.

## Why SQLite?

- **Atomicity:** Ensures that a task is never partially updated during a crash.
- **Traceability:** Allows for complex queries over execution history (e.g., "Show me all lint failures across all tasks in the last 24 hours").
- **Local Sovereignty:** Your project state remains on your machine in a standard, open format. No data is locked into a proprietary cloud.

## Persistence Patterns

OpenExec uses a **Parallel Write** pattern for performance:
- The execution loop continues at machine speed.
- State updates and audit entries are written asynchronously to the database.
- The **Manager** verifies the database state before initiating any new phase to ensure consistency.

## Ghost State Cleanup

On startup, the OpenExec Manager performs **Self-Healing**. If it detects tasks marked as "running" but no active process exists (e.g., after a sudden reboot), it automatically resets them to "pending" or "error" depending on the last recorded checkpoint.

---
*Next: Learn about the [Deterministic Control Plane](./dcp)*
