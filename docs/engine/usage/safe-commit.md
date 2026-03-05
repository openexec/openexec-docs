# Autonomous Compliance Shield

OpenExec enforces high-fidelity quality standards through the **Autonomous Compliance Shield**, powered by the `safe_commit` surgical tool.

## The Problem: Unverified Commits
Standard AI agents often commit code that contains linting errors, type mismatches, or failing tests. This pollutes the git history and breaks CI/CD pipelines.

## The Solution: Mandatory Quality Gates
Instead of calling raw `git commit`, OpenExec uses `safe_commit`. This tool acts as an atomic gate that prevents unverified code from entering your repository.

### How it works
1.  **Environment Detection**: The tool automatically identifies if the project is Go, Python, or both.
2.  **Mandatory Checks**:
    - **Go**: Runs `go vet ./...` to ensure standard static analysis passes.
    - **Python**: Runs `ruff check .` and `python3 -m mypy .` for linting and type safety.
3.  **Atomic Blocking**: If any check fails, the commit is physically blocked.
4.  **Self-Fixing Loop**: The error is returned to the AI agent, which must fix the issues and try again.

### Usage
The compliance shield is active by default in the execution loop. You can also trigger it manually via the CLI (coming in v0.2.0) or simply by asking the AI agent to "Save my changes."

### Benefits for ISO/SOC2 Compliance
Because every single commit in the project history is verified *before* it is saved, OpenExec provides a perfect, compliant audit trail. You can prove that no unverified code was ever committed to the repository.
