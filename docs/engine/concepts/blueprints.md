---
title: Blueprints
sidebar_position: 2
---

# Blueprints: Deterministic Orchestration

At the heart of OpenExec's reliability is the **Blueprint Engine**. A blueprint is a structured execution plan that defines how a task moves from an initial idea to verified code.

Unlike simple "agent loops" that can wander off-track, blueprints enforce boundaries and require specific successful outcomes before proceeding.

## Deterministic vs. Agentic Stages

OpenExec distinguishes between two types of work:

### 1. Deterministic Stages
These are handled by the local Go runtime. They execute fixed code, run shell commands, or perform repository analysis.
- **Examples:** `gather_context`, `lint`, `test`, `build`.
- **Reliability:** 100% predictable. If the tests fail, the stage fails.

### 2. Agentic Stages
These are handled by an AI model (the "Executor" or "Reviewer"). They require reasoning, synthesis, and decision-making.
- **Examples:** `implement`, `fix_tests`, `review`.
- **Safety:** Every agentic action is gated by the **Deterministic Control Plane (DCP)** and the **Policy Engine**.

## Self-Healing Loops

Blueprints are not just linear lists; they contain logical branches for self-correction.

- **Linting Failure:** If the `lint` stage fails, the blueprint routes the task to `fix_lint`, where an agent analyzes the linter output and applies a fix.
- **Test Regression:** If the `test` stage fails, the task moves to `fix_tests` for automated debugging.
- **Exhaustion Limits:** If an agent cannot fix an error after a set number of retries (default: 3), the blueprint pauses and requests **Operator Attention**.

## Checkpointing and Resume

Every major stage in a blueprint creates a **Checkpoint**. 
- Checkpoints capture the message history, applied patches, and repository state.
- If the system crashes or is manually stopped, you can run `openexec run --resume` to pick up exactly where the engine left off, saving token costs and maintaining consistency.

## Native Blueprints

OpenExec comes with several pre-defined blueprints:

| ID | Name | Use Case |
|----|------|----------|
| `standard_task` | Standard Task | The default flow for coding tasks (with full validation). |
| `quick_fix` | Quick Fix | A shorter flow for small, targeted corrections. |
| `study_task` | Study Task | Purely analytical tasks that produce documentation. |

---
*Next: Learn about [State Management](./state-management)*
