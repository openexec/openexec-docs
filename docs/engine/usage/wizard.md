# Guided Architect Mode (Wizard)

The **Guided Architect Mode** is the first phase of any OpenExec project. It replaces fuzzy, unverified prompts with a structured interview process.

## Why use the Wizard?
Starting a project with a single prompt is prone to missing constraints (e.g., "Must run on Windows," "Must use Postgres"). The `openexec wizard` ensures that every critical architectural decision is made *before* a single line of code is written.

## How to Start
Run the following command in your project root:

```bash
openexec wizard
```

## The Interview Process
The native Go AI Architect will ask you high-leverage questions to populate the **Deterministic Knowledge Base**:

1.  **Project Shape**: Determining if it's a CLI, Web App, API, or Library.
2.  **Target Platforms**: Explicitly pinning macOS, Linux, Windows, or Mobile.
3.  **Core Entities**: Identifying the primary data models and their **Source of Truth**.
4.  **Success Metrics**: Defining measurable goals (G-001, G-002) and their verification methods.

## Autonomous PRD Generation
Once the interview is complete, the Wizard automatically:
- Generates a verified `INTENT.md` file.
- Populates the `prd_specs` table in SQLite with **Personas** and **User Journeys**.
- Prepares the system for high-fidelity planning via `openexec plan`.

## Resuming Sessions
If you exit the interview, your progress is automatically saved in `.openexec/wizard_state.json`. You can resume at any time by running `openexec wizard` again.
