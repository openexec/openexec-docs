---
title: Configuration Reference
sidebar_position: 4
---

# Configuration Reference (`.openexec/config.json`)

`openexec init` creates `.openexec/config.json`, the per-project configuration file. Most fields are optional — OpenExec runs with sensible defaults, and you opt into the advanced subsystems explicitly.

Below is the full set of fields, grouped by purpose. A minimal config only needs `name`.

## Top-level fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Project name (defaults to the directory name). |
| `project_dir` | string | Absolute project path (set automatically). |
| `git_enabled` | bool | Track changes with git (default `true`). |
| `git_commit_enabled` | bool | Allow OpenExec to make local commits autonomously. |
| `base_branch` | string | Base branch for work (default `main`). |
| `release_branch_prefix` | string | Prefix for release branches, e.g. `release/`. |
| `feature_branch_prefix` | string | Prefix for feature branches, e.g. `feature/`. |
| `execution` | object | Execution-engine settings (see below). |
| `quality_gates` | object | Project-level quality gate toggles (see below). |

## `execution`

### Models and runner

| Field | Type | Description |
|-------|------|-------------|
| `planner_model` | string | Model used for the planning phase. |
| `executor_model` | string | Model used for task execution. |
| `reviewer_model` | string | Model used for the review stage. |
| `review_enabled` | bool | Run a review stage after execution. |
| `runner_command` | string | Override the loop runner binary: `claude`, `gemini`, or `codex`. |
| `runner_args` | string[] | Extra arguments passed to the runner. |
| `exec_mode` | string | Runner permission level: `suggest` (read-only), `workspace-write` (default), or `danger-full-access` (skips all permission prompts). |
| `port` | int | Execution-engine port. |
| `timeout_seconds` | int | Default per-task timeout for `run`/`start` when no flag is given. |
| `worker_count` | int | Number of concurrent workers for parallel execution. |

### Lint and test overrides

| Field | Type | Description |
|-------|------|-------------|
| `lint_commands` | string[] | Override the blueprint's lint commands. **If empty, the lint stage is skipped (auto-pass).** |
| `test_commands` | string[] | Override the blueprint's test commands. **If empty, the test stage is skipped (auto-pass).** |

### Opt-in subsystems (default: off)

These power the advanced features and are disabled unless you turn them on.

| Field | Type | Description |
|-------|------|-------------|
| `quality_gates_v2` | bool | Auto-detect the project type (Go / Python / TypeScript / Rust) and run lint/test/format gates. |
| `cache_enabled` | bool | Enable the knowledge cache and tool-result cache (`.openexec/cache.db`). |
| `predictive_load` | bool | Pre-fetch files likely needed for the task (`.openexec/predictive.db`). |
| `memory_enabled` | bool | Extract learning patterns from completed stages and reinject them later (`.openexec/memory.db`). |
| `checkpoint_enabled` | bool | Write a checkpoint after each stage for crash recovery (`.openexec/checkpoints.db`). |
| `bitnet_routing` | bool | Use a local 1-bit (BitNet) LLM for intent classification. The model auto-downloads on first use. |
| `bitnet_model` | string | Path to the BitNet model file (used when `bitnet_routing` is on). |
| `toolset_filtering` | bool | Restrict the tool definitions sent to the frontier model to the toolset chosen by the local router (API path only). |

### Opt-out subsystems (default: on)

These are enabled unless you explicitly set them to `false`.

| Field | Type | Description |
|-------|------|-------------|
| `symbol_indexing` | bool | Index project source into the knowledge base at startup. Defaults to enabled; set `false` to disable. |
| `local_pre_resolve` | bool | Inject referenced symbol signatures into the briefing before the implement stage. Defaults to enabled; set `false` to disable. |

### API providers (OpenAI-compatible endpoints)

Use these to drive OpenExec with any OpenAI-compatible HTTP API (OpenAI, Kimi, Mistral, Ollama, vLLM, etc.) instead of a local CLI tool. The **named-providers** shape is preferred:

```json
{
  "execution": {
    "providers": {
      "kimi":       { "base_url": "https://api.moonshot.cn/v1", "api_key": "$KIMI_API_KEY", "model": "moonshot-v1-128k" },
      "vllm-local": { "base_url": "http://localhost:8000/v1",   "api_key": "local",          "model": "qwen2.5-coder" }
    },
    "active_provider": "kimi"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `providers` | map | Named endpoints; each has `base_url`, `api_key`, `model`. |
| `active_provider` | string | Which named provider to use. If omitted and only one provider is defined, that one is used. |

API keys may be written inline or as a `$ENV_VAR` reference (e.g. `"$KIMI_API_KEY"`), which is resolved from the environment at runtime.

The following **legacy** fields remain readable for older configs (prefer the named shape above):
`api_provider`, `api_base_url`, `api_key`, `api_model`.

### Coordinator (multi-agent execution)

Used when a frontier model decomposes a task and cheaper workers execute subtasks in parallel.

| Field | Type | Description |
|-------|------|-------------|
| `coordinator_model` | string | Frontier model used for planning and merging. |
| `worker_model` | string | Model for worker agents (can be cheaper). |
| `worker_api_provider` | string | Provider for workers (defaults to the main API provider). |
| `worker_api_base_url` | string | Base URL for workers (defaults to the main base URL). |
| `worker_api_key` | string | API key for workers (defaults to the main key). |

## `quality_gates`

Project-level gates that run outside the `openexec.yaml` command-based gates. Both default to **on**; set the toggle to `false` to disable.

| Field | Type | Description |
|-------|------|-------------|
| `no_stubs` | bool | Run the no-stubs verifier that blocks placeholder/TODO implementations. |
| `no_stubs_rules` | map | Per-rule severity overrides: `high`, `warn`, `low`, or `off`. |
| `production_ready` | bool | Run the production-readiness checklist (documented env vars, no committed secrets, reversible migrations, session checks on API handlers, health endpoint present). |
| `production_ready_skip` | string[] | Checklist check IDs to skip. |

## Example

```json
{
  "name": "my-app",
  "git_enabled": true,
  "base_branch": "main",
  "execution": {
    "executor_model": "claude-sonnet-4-6",
    "exec_mode": "workspace-write",
    "quality_gates_v2": true,
    "cache_enabled": true,
    "checkpoint_enabled": true,
    "worker_count": 4
  },
  "quality_gates": {
    "production_ready": true
  }
}
```
