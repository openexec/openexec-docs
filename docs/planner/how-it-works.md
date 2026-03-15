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
$ openexec init

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
  1. Create an INTENT.md or run 'openexec wizard'
  2. Run 'openexec plan INTENT.md'
```

## 2. The Intent Wizard

Rather than writing the `INTENT.md` requirements manually, OpenExec provides an interactive diagnostic wizard. It asks contextual questions based on your repository's existing state, gradually building a deeply structured execution plan.

```text
$ openexec wizard

=== OpenExec Intent Wizard ===
Type 'exit' or 'quit' to stop. Type 'done' to force finish.
Tell me about your project:

> Create dockerized local development environment for guild-hall project and refactor backend to use Python and include supabase also in it's own container

Thinking...

🤖 Understood. This is a REFACTOR of guild-hall: you want to dockerize the local dev environment, migrate the backend from Next.js API routes to Python, and run Supabase locally in its own container. I see you already have a remote Supabase configured. The frontend appears to remain Next.js.

❓ Which Python web framework should the new backend use: FastAPI (async, OpenAPI docs), Django (batteries-included, ORM), or Flask (minimal, flexible)?

> FastAPI

Thinking...

🤖 Understood. FastAPI is confirmed as the Python framework for the backend refactor. This is a strong choice given its async-first design and automatic OpenAPI documentation, which will pair well with Supabase's async client.

❓ Before we define goals, I need to map the existing API surface. How many Next.js API routes currently exist in the project, and do they primarily handle CRUD operations for Supabase, or do they include more complex business logic (e.g., multi-step transactions, third-party integrations)?

> use existing functionality

Thinking...

🤖 Understood - this is a pure migration that preserves existing functionality. The FastAPI backend will be a 1:1 port of the current Next.js API routes with no feature additions.

❓ To map the existing contracts, I need to catalog the current API routes. Can you confirm which of these categories exist in your current Next.js API: (1) Authentication/user management, (2) Data CRUD operations, (3) File uploads, (4) Webhooks or external integrations, (5) Other?

> authentication+user management + crud

Thinking...

🤖 Understood. The migration scope is now pinned: **Authentication + User Management + CRUD operations**. These become the three primary goals (G-001, G-002, G-003).

❓ Which domain entities require CRUD migration? I see this is guild-hall - should I scan the existing `/src/app/api/` routes to identify all entities, or can you list the core ones (e.g., quests, guilds, members, etc.)?

> scan and get information from there

Thinking...

🤖 Scan complete. I found a well-structured Next.js 15 app with 8 API routes, 36 server actions, 143 database migrations across 15+ tables, and existing Docker configuration. The migration scope is clearer now: we need to port server actions to FastAPI while preserving the React frontend's expectations.

✅ Intent is complete!
✔ Project intent saved to INTENT.md
```

## 3. Generating the Execution Tree

Finally, the Planner compiles the extracted intent and maps it into a Directed Acyclic Graph (DAG). This breaks the high-level intent into atomic implementation tasks, which are directly handed over to the OpenExec Engine for execution.

```bash
$ openexec plan INTENT.md
Executor model: sonnet (CLI: claude)
  Using CLI mode: claude
Generating stories and goals...
Generated 16 stories
```

```json
{
  "schema_version": "1.1",
  "goals": [
    {
      "id": "G-001",
      "title": "Migrate authentication system from Next.js to FastAPI with Supabase Auth",
      "description": "All auth flows (login, logout, session management, token refresh) work identically to current implementation",
      "success_criteria": "All auth flows (login, logout, session management, token refresh) work identically to current implementation",
      "verification_method": "Integration tests comparing JWT validation, role assignment (/api/assign-gm), and session handling against existing Next.js implementation"
    },
    {
      "id": "G-002",
      "title": "Migrate 36 server actions to FastAPI endpoints covering quest, user, and objective management",
      "description": "All server actions return identical response shapes and implement same business logic",
      "success_criteria": "All server actions return identical response shapes and implement same business logic",
      "verification_method": "Contract tests validating request/response schemas match TypeScript types; parallel request testing against both backends"
    },
    {
      "id": "G-003",
      "title": "Migrate 8 API routes and 2 email templates to FastAPI",
      "description": "Health check, quest listing, event feed proxy, email sending, and GM endpoints function identically",
      "success_criteria": "Health check, quest listing, event feed proxy, email sending, and GM endpoints function identically",
      "verification_method": "E2E tests covering all 8 routes; email template visual regression testing"
    }
  ],
  "stories": [
    {
      "id": "US-001",
      "title": "Discovery: Extract Legacy Environment and API Surface",
      "description": "As a developer, I want to understand the existing Next.js API routes, server actions, and environment configuration so that I can plan the FastAPI migration accurately",
      "requirement_id": "REQ-001",
      "goal_id": "G-001",
      "depends_on": [],
      "acceptance_criteria": [
        "All environment variables documented with descriptions",
        "All 8 API routes catalogued with request/response shapes",
        "All 36 server actions catalogued with signatures",
        "Local build of existing Next.js app verified working"
      ],
      "verification_script": "test -f docs/discovery/env-vars.md && test -f docs/discovery/api-routes.md && test -f docs/discovery/server-actions.md",
      "contract": "",
      "tasks": [
        {
          "id": "T-US-001-001",
          "title": "Extract environment variables and dependencies",
          "description": "Document all environment variables from .env.local.template and package.json dependencies",
          "technical_strategy": "Parse .env.local.template for all NEXT_PUBLIC_* and server-side vars. Cross-reference with next.config.js for runtime config. Output to docs/discovery/env-vars.md.",
          "depends_on": [],
          "verification_script": "grep -c 'SUPABASE' docs/discovery/env-vars.md && grep -c 'MAILJET' docs/discovery/env-vars.md"
        },
        {
          "id": "T-US-001-002",
          "title": "Map existing API routes (inputs/outputs)",
          "description": "Document all 8 API routes in src/app/api/ with their HTTP methods, request bodies, and response shapes",
          "technical_strategy": "Traverse src/app/api/**/route.ts files. Extract exported HTTP method handlers (GET, POST, etc.). Document path params, query params, body schemas, and response types. Reference src/lib/types/ for type definitions.",
          "depends_on": [],
          "verification_script": "grep -c 'GET\\|POST\\|PUT\\|DELETE' docs/discovery/api-routes.md"
        },
        {
          "id": "T-US-001-003",
          "title": "Map server actions surface area",
          "description": "Document all 36 server actions with their function signatures and database interactions",
          "technical_strategy": "Scan src/lib/actions/ for 'use server' directives. Extract function names, parameters, return types, and Supabase queries. Group by domain (quest, user, objective, activity).",
          "depends_on": [],
          "verification_script": "wc -l docs/discovery/server-actions.md | awk '$1 >= 100'"
        },
        {
          "id": "T-US-001-004",
          "title": "Verify local buildability of legacy state",
          "description": "Confirm the existing Next.js application builds and starts locally",
          "technical_strategy": "Run npm install, npm run build, npm run start. Verify no TypeScript errors. Document any build warnings for migration consideration.",
          "depends_on": [
            "T-US-001-001"
          ],
          "verification_script": "cd /Users/perttu/study/siivous/orchestrator/projects/guild-hall && npm run build"
        }
      ]
    },
    {
      "id": "US-002",
      "title": "Docker Development Environment with Supabase Container",
      "description": "As a developer, I want a Docker-based development environment with local Supabase so that I can develop the FastAPI backend with database isolation from production",
      "requirement_id": "REQ-001",
      "goal_id": "G-001",
      "depends_on": [
        "US-001"
      ],
      "acceptance_criteria": [
        "docker compose up starts all services (fastapi, supabase-db, supabase-auth)",
        "Supabase container applies all 143 migrations on startup",
        "FastAPI container has hot-reload enabled",
        "Local Supabase is completely isolated from remote production"
      ],
      "verification_script": "docker compose up -d && sleep 30 && docker compose ps --format json | jq -e 'all(.State == \"running\")'",
      "contract": "",
      "tasks": [
        {
          "id": "T-US-002-001",
          "title": "Create FastAPI Dockerfile with development target",
          "description": "Create multi-stage Dockerfile for FastAPI with dev and prod targets",
          "technical_strategy": "Use python:3.11-slim as base. Install uvicorn[standard] for hot-reload. COPY requirements.txt first, then pip install, then COPY src. Use --reload flag in dev CMD. Separate pip install from code COPY to leverage Docker cache.",
          "depends_on": [],
          "verification_script": "docker build -f backend/Dockerfile --target dev -t guild-hall-api:dev backend/"
        },
        {
          "id": "T-US-002-002",
          "title": "Create docker-compose.yml with Supabase services",
          "description": "Configure docker-compose with FastAPI, Supabase DB, and Supabase Auth containers",
          "technical_strategy": "Use supabase/postgres:15.1.0.147 for DB. Configure POSTGRES_* env vars. Mount ./supabase/migrations to /docker-entrypoint-initdb.d/ for auto-migration. Use healthcheck with pg_isready. Set depends_on with condition: service_healthy.",
          "depends_on": [
            "T-US-002-001"
          ],
          "verification_script": "docker compose config --quiet"
        },
        {
          "id": "T-US-002-003",
          "title": "Create Supabase migration runner init script",
          "description": "Create entrypoint script that applies all 143 migrations in order",
          "technical_strategy": "Create shell script that iterates supabase/migrations/*.sql in lexical order. Use psql -f for each. Log migration names to stdout. Exit non-zero on any failure. Handle already-applied migrations gracefully via schema_migrations table.",
          "depends_on": [
            "T-US-002-002"
          ],
          "verification_script": "test -f scripts/apply-migrations.sh && chmod +x scripts/apply-migrations.sh"
        },
        {
          "id": "T-US-002-004",
          "title": "Verify all containers start and pass health checks",
          "description": "Validate the complete Docker environment starts correctly with all services healthy",
          "technical_strategy": "Run docker compose up -d. Poll docker compose ps until all services show 'healthy' or 'running'. Timeout after 60s. Verify FastAPI responds on /health. Verify Supabase DB accepts connections.",
          "depends_on": [
            "T-US-002-003"
          ],
          "verification_script": "docker compose up -d && sleep 30 && curl -f http://localhost:8000/health && docker compose exec -T supabase-db pg_isready -U postgres"
        }
      ]
    },
    {
      "id": "US-003",
      "title": "FastAPI Project Skeleton with Pydantic Models",
      "description": "As a developer, I want a FastAPI project structure with Pydantic models matching TypeScript types so that I have a foundation for migrating all endpoints",
      "requirement_id": "REQ-002",
      "goal_id": "G-002",
      "depends_on": [
        "US-002"
      ],
      "acceptance_criteria": [
        "FastAPI app structure follows best practices (routers, services, models)",
        "Pydantic models exist for all 8 data entities in REQ-002",
        "Models match TypeScript types in src/lib/types/",
        "OpenAPI schema generated and accessible at /docs"
      ],
      "verification_script": "curl -f http://localhost:8000/docs && curl -f http://localhost:8000/openapi.json | jq '.components.schemas | keys | length >= 8'",
      "contract": "backend/app/schemas/*.py - Pydantic models for User, Quest, Objective, UserQuest, UserObjective, Activity, UserRole, Category",
      "tasks": [
        {
          "id": "T-US-003-001",
          "title": "Create FastAPI project structure",
          "description": "Set up backend/app/ with routers/, services/, models/, schemas/, core/ directories",
          "technical_strategy": "Create __init__.py in each directory. Main app in backend/app/main.py. Use APIRouter for modular routing. Create core/config.py for settings with pydantic-settings. Create core/database.py for Supabase client.",
          "depends_on": [],
          "verification_script": "test -f backend/app/main.py && test -d backend/app/routers && test -d backend/app/schemas"
        },
        {
          "id": "T-US-003-002",
          "title": "Create Pydantic models for all data entities",
          "description": "Define Pydantic schemas matching TypeScript types for User, Quest, Objective, UserQuest, UserObjective, Activity, UserRole, Category",
          "technical_strategy": "Parse src/lib/types/*.ts for type definitions. Use Optional[] for nullable fields. Use datetime for timestamp fields. Create Base, Create, Update, and InDB variants. Import from typing: Optional, List, Any to avoid NameError.",
          "depends_on": [
            "T-US-003-001"
          ],
          "verification_script": "python -c 'from backend.app.schemas import user, quest, objective; print(\"OK\")'"
        },
        {
          "id": "T-US-003-003",
          "title": "Configure Supabase client and database connection",
          "description": "Create database client using supabase-py with connection pooling",
          "technical_strategy": "Use supabase-py library. Create async client with create_client(). Store in app.state for request lifecycle. Use dependency injection via Depends(). Configure from environment variables SUPABASE_URL and SUPABASE_SERVICE_KEY.",
          "depends_on": [
            "T-US-003-001"
          ],
          "verification_script": "python -c 'from backend.app.core.database import get_supabase_client; print(\"OK\")'"
        },
        {
          "id": "T-US-003-004",
          "title": "Create health check endpoint and verify OpenAPI",
          "description": "Implement /health endpoint and verify OpenAPI schema generation",
          "technical_strategy": "Create routers/health.py with GET /health returning {status: 'ok', timestamp: datetime}. Include router in main.py. Verify /docs renders Swagger UI. Verify /openapi.json contains all schema definitions.",
          "depends_on": [
            "T-US-003-002",
            "T-US-003-003"
          ],
          "verification_script": "curl -f http://localhost:8000/health && curl -f http://localhost:8000/openapi.json"
        }
      ]
    },
    {
      "id": "US-016",
      "title": "Goal Validation: Full API Parity Testing",
      "description": "As a stakeholder, I want comprehensive E2E testing confirming 100% API parity between Next.js and FastAPI backends so that migration is validated",
      "requirement_id": "REQ-001",
      "goal_id": "G-002",
      "depends_on": [
        "US-010",
        "US-011",
        "US-012",
        "US-013",
        "US-014",
        "US-015"
      ],
      "acceptance_criteria": [
        "Parallel request testing against both backends passes",
        "All 36 server action equivalents tested",
        "All 8 API routes tested",
        "Response shape comparison confirms parity",
        "Performance within acceptable bounds"
      ],
      "verification_script": "cd backend && pytest tests/e2e/test_full_parity.py -v --tb=short",
      "contract": "",
      "tasks": [
        {
          "id": "T-US-016-001",
          "title": "Create parallel testing framework",
          "description": "Build test framework that sends identical requests to both backends",
          "technical_strategy": "Create tests/e2e/parallel_tester.py. Accept request spec (method, path, headers, body). Send to both Next.js and FastAPI. Compare responses. Report differences. Use httpx for async requests.",
          "depends_on": [],
          "verification_script": "python -c 'from tests.e2e.parallel_tester import ParallelTester; print(\"OK\")'"
        },
        {
          "id": "T-US-016-002",
          "title": "Create comprehensive parity test suite",
          "description": "Write tests for all endpoints using parallel tester",
          "technical_strategy": "Create tests/e2e/test_full_parity.py. Parametrize with all 44 endpoints (36 actions + 8 routes). Test with various user roles. Compare status codes, headers, body shapes. Allow timing differences.",
          "depends_on": [
            "T-US-016-001"
          ],
          "verification_script": "cd backend && pytest tests/e2e/test_full_parity.py -v --collect-only | grep 'test_' | wc -l"
        },
        {
          "id": "T-US-016-003",
          "title": "Execute full parity validation",
          "description": "Run complete parity test suite and generate report",
          "technical_strategy": "Run full test suite with both backends running. Generate HTML report with pytest-html. Document any intentional differences. Confirm 100% parity or document approved exceptions.",
          "depends_on": [
            "T-US-016-002"
          ],
          "verification_script": "cd backend && pytest tests/e2e/test_full_parity.py -v --html=reports/parity_report.html"
        },
        {
          "id": "T-US-016-004",
          "title": "Validation Review: Goal Achievement Confirmation",
          "description": "Final validation that all three goals are met",
          "technical_strategy": "Review G-001 (auth): Check integration tests. Review G-002 (actions): Check contract tests and coverage. Review G-003 (routes/email): Check E2E tests. Document evidence in validation_report.md.",
          "depends_on": [
            "T-US-016-003"
          ],
          "verification_script": "test -f backend/reports/validation_report.md && grep -c 'PASS' backend/reports/validation_report.md"
        }
      ]
    }
  ]
}
```

```

## 4. Scheduling execution

Once the intent translates to technical tasks, it's time to generate runnable commands that the OpenExec Engine can interpret and act upon. 


```bash
$ openexec-planner schedule .openexec/stories.json -o .openexec/tasks.json
Converting stories into DAG of isolated execution steps...
Generating execution bash scripts...
Creating evaluation logic...
Scheduling 16 workflows...

✅ Execution scheduled successfully!
Run '$ openexec start' to boot up the autonomous engine cluster and implement the backend.
```

At this stage, the **OpenExec Engine** boots up, assigning autonomous agents to implement the codebase piece by piece, while automatically validating against established quality gates.
