# Task Lifecycle & Phases

OpenExec doesn't just "write code." It treats AI agents as managed workers in a structured pipeline. Every task you run via `openexec run` automatically progresses through five distinct lifecycle phases.

This methodical approach ensures that every change is researched, executed, and independently verified before being finalized.

---

## 1. TD: Technical Design
**Persona:** `clario`  
**Goal:** Formulation of Implementation Strategy

Before typing a single line of code, the system performs a Technical Design phase.
- **Research:** Clario scans your local repository to map dependencies and existing patterns.
- **Constraint Check:** Cross-references the task with your `INTENT.md` and Knowledge Base.
- **Output:** A detailed markdown design document describing exactly *how* the task will be solved.

## 2. IM: Implementation
**Persona:** `spark`  
**Goal:** Execution of Design

Spark takes the design from the TD phase and performs the actual work.
- **Code Generation:** Writes new files or modifies existing ones.
- **Local Execution:** Runs build commands or installers as needed.
- **Internal Rules:** Every action is filtered through the **Deterministic Policy Engine** (e.g., preventing remote pushes).

## 3. RV: Review
**Persona:** `blade`  
**Goal:** Independent Quality Assurance

Once implementation is complete, a separate reviewer agent (Blade) is spawned to audit the work.
- **Code Review:** Checks for bugs, security vulnerabilities, and adherence to the design.
- **Outcome:** Blade either **Approves** the work or **Rejects** it with specific feedback, routing the task back to the IM phase.

## 4. RF: Refinement
**Persona:** `hon`  
**Goal:** Optimization & Cleanup

Refinement happens after a successful review.
- **Polishing:** Cleans up temporary files, logs, or "TODO" comments.
- **Documentation:** Updates relevant documentation files to reflect the new changes.

## 5. FL: Finalize
**Persona:** `clario`  
**Goal:** Goal Validation & State Sync

The final phase ensures the loop is closed.
- **Verification:** Runs autonomous verification scripts defined in the task.
- **Persistence:** Synchronizes the task status in the database and prepares for the next task in the dependency graph.

---

## Observation in the CLI
When you run `openexec run`, you will see these transitions in real-time:

```text
[Worker 0] Executing T-US-001-001: Implement Login API
[Worker 0]    Loop: T-US-001-001
[Worker 0]   → Phase TD (clario)
[Worker 0]   → Phase IM (spark)
[Worker 0]   → Phase RV (blade)
[Worker 0]   ✓ Complete
```
