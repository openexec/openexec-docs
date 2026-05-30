---
title: Task Lifecycle
sidebar_position: 3
---

# Task Lifecycle: From Intent to Verified Code

OpenExec doesn't just "write code." It treats AI agents as managed workers in a structured pipeline. Every task you run automatically progresses through a series of stages defined by a **Blueprint**.

This methodical approach ensures that every change is researched, executed, and independently verified before being finalized.

---

## The Modern Model: Blueprint Engine

OpenExec uses a **Blueprint Engine** to define flexible execution graphs. The default blueprint for implementation (`openexec run`) uses a sequence of **Deterministic** (code-based) and **Agentic** (AI-based) stages.

### Standard Execution Stages

| Stage | Type | Description |
|-------|------|-------------|
| **gather_context** | Deterministic | Scans the repository, extracts relevant symbols, and assembles a context pack. |
| **implement** | Agentic | The primary AI model (Executor) generates code changes and applies them as patches. |
| **lint** | Deterministic | Runs the project's native linting tools (e.g., `go vet`, `eslint`, `ruff`). |
| **fix_lint** | Agentic | If linting fails, the AI analyzes the errors and attempts to fix them automatically. |
| **test** | Deterministic | Executes the relevant test suite to ensure no regressions were introduced. |
| **fix_tests** | Agentic | If tests fail, the AI iterates on the implementation until the tests pass. |
| **review** | Agentic | A final review stage where the AI summarizes the work and verifies it against the original task criteria. |

---

## Legacy Model: 5-Phase Pipeline (Deprecated)

Earlier versions of OpenExec used a fixed 5-phase pipeline. While still supported for backward compatibility, new projects should use the Blueprint model.

1.  **TD (Technical Design):** Research and strategy formulation.
2.  **IM (Implementation):** Actual code modification.
3.  **RV (Review):** Independent quality audit.
4.  **RF (Refinement):** Post-review adjustments.
5.  **FL (Finalize):** Goal validation and state sync.

---

## Quick-Fix Blueprint

For small, targeted corrections, OpenExec ships a `quick_fix` blueprint — a simplified workflow that runs fewer stages than the default `standard_task`:

```bash
openexec blueprint --blueprint-id quick_fix "Fix the typo in the README header"
```

When you don't pass `--blueprint-id`, OpenExec uses `standard_task` (the full gather → implement → lint → test → review flow). These are the two built-in blueprints today.

---

## Observation in the Dashboard

When a run is active, you can monitor these transitions in real-time via the **Web Console**:

- **Active Stage:** Highlighted in the execution loop.
- **Logs:** Real-time tail of agent reasoning and tool output.
- **Audit Trail:** Every transition and tool call is recorded in the append-only audit log (`.openexec/openexec.db`).
