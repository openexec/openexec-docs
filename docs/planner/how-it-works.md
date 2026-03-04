---
title: How It Works
sidebar_position: 2
---

# How It Works: The Planner Workflow

OpenExec Planner shifts development focus entirely to the Product Requirements Document (PRD) and Technical Intent. Instead of manually writing boilerplate, configuring watchers, or connecting API endpoints, the engine handles the entire technical baseline automatically through an interactive interview process.

Below is a real-world example of how a developer migrates a Next.js / Supabase backend into a fully dockerized Python FastAPI application using the OpenExec Planner CLI.

## 1. Initializing the Project

First, we initialize the orchestrator in the target directory. The CLI will ask a few basic questions to set a baseline context and establish which AI models will drive the code generation.

```bash
$ openexec-planner init

🚀 Initializing OpenExec project in /Users/perttu/study/siivous/orchestrator/projects/guild-hall
Enter project name [guild-hall]: 

Available models:
  - sonnet (Claude 4.6 Sonnet - Default)
  - opus   (Claude 4.6 Opus)
  - haiku  (Claude 4.6 Haiku)
  - gpt-5.3 (Codex)
  - gemini-3.1-pro-preview
Choose default model [sonnet]: 
  ! openexec.yaml already exists, skipping...
  + Created .openexec
  + Created .openexec/data

✅ Project 'guild-hall' initialized with sonnet!

Next steps:
  1. Create an INTENT.md or run 'openexec-planner wizard'
  2. Run 'openexec-planner generate INTENT.md'
```

## 2. The Intent Wizard

Rather than writing the `INTENT.md` requirements manually, OpenExec provides an interactive diagnostic wizard. It asks contextual questions based on your repository's existing state, gradually building a deeply structured execution plan.

```bash
$ openexec-planner wizard

=== OpenExec Intent Wizard ===
Type 'exit' or 'quit' to stop. Type 'done' to force finish.
Tell me about your project:
```

**Developer:**
> Create dockerized local development environment for guild-hall project and refactor backend to use Python and include supabase also in it's own container

**Planner Engine:**
> 🤖 Understood. This is a REFACTOR of guild-hall: you want to dockerize the local dev environment, migrate the backend from Next.js API routes to Python, and run Supabase locally in its own container. I see you already have a remote Supabase configured. The frontend appears to remain Next.js.
>
> ❓ Which Python web framework should the new backend use: FastAPI (async, OpenAPI docs), Django (batteries-included, ORM), or Flask (minimal, flexible)?

**Developer:**
> FastAPI

**Planner Engine:**
> 🤖 Understood. FastAPI is confirmed as the Python framework for the backend refactor. This is a strong choice given its async-first design and automatic OpenAPI documentation, which will pair well with Supabase's async client.
>
> ❓ Before we define goals, I need to map the existing API surface. How many Next.js API routes currently exist in the project, and do they primarily handle CRUD operations for Supabase, or do they include more complex business logic (e.g., multi-step transactions, third-party integrations)?

**Developer:**
> use existing functionality

**Planner Engine:**
> 🤖 Understood - this is a pure migration that preserves existing functionality. The FastAPI backend will be a 1:1 port of the current Next.js API routes with no feature additions.
>
> ❓ To map the existing contracts, I need to catalog the current API routes. Can you confirm which of these categories exist in your current Next.js API: (1) Authentication/user management, (2) Data CRUD operations, (3) File uploads, (4) Webhooks or external integrations, (5) Other?

**Developer:**
> authentication+user management + crud

**Planner Engine:**
> 🤖 Understood. The migration scope is now pinned: **Authentication + User Management + CRUD operations**. These become the three primary goals (G-001, G-002, G-003).
>
> ❓ Which domain entities require CRUD migration? I see this is guild-hall - should I scan the existing `/src/app/api/` routes to identify all entities, or can you list the core ones (e.g., quests, guilds, members, etc.)?

**Developer:**
> scan and get information from there

**Planner Engine:**
> 🤖 Scan complete. I found a well-structured Next.js 15 app with 8 API routes, 36 server actions, 143 database migrations across 15+ tables, and existing Docker configuration. The migration scope is clearer now: we need to port server actions to FastAPI while preserving the React frontend's expectations.

```bash
✅ Intent is complete!
✔ Project intent saved to INTENT.md
```

## 3. Generating the Execution Tree

Finally, the Planner compiles the extracted intent and maps it into a Directed Acyclic Graph (DAG). This breaks the high-level intent into atomic implementation tasks, which are directly handed over to the OpenExec Engine for execution.

```bash
$ openexec-planner generate INTENT.md
Executor model: sonnet (CLI: claude)
  Using CLI mode: claude
Generating stories and goals...
```

At this stage, the **OpenExec Engine** boots up, assigning autonomous agents to implement the codebase piece by piece, while automatically validating against established quality gates.
