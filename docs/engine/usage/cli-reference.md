---
title: CLI Command Reference
sidebar_position: 4
---

# CLI Command Reference

OpenExec is a single binary. Run any command with `--help` to see its full flags and subcommands:

```bash
openexec <command> --help
```

The commands below are grouped by purpose.

## Setup & project

| Command | Description |
|---------|-------------|
| `openexec init [project-name]` | Initialize a new OpenExec project (creates `.openexec/config.json` and `openexec.yaml`). |
| `openexec config show` | Show the current configuration. |
| `openexec config set <key> <value>` | Set a configuration value. |
| `openexec config init` | Initialize configuration with defaults. |
| `openexec doctor` | Check your environment for common issues (CLI tools, config). |
| `openexec version` | Print the OpenExec version. |
| `openexec update` | Update OpenExec to the latest version. |

## Planning

| Command | Description |
|---------|-------------|
| `openexec wizard` | Start the guided intent interviewer; generates `INTENT.md`. |
| `openexec plan [intent-file]` | Advanced: generate a project plan manually. *Deprecated — use `openexec run`.* |
| `openexec goal verify [goal-id]` | Verify the implementation against defined goals. |

## Execution & monitoring

| Command | Description |
|---------|-------------|
| `openexec start` | Start the execution daemon for concurrent task processing. |
| `openexec run [task-id]` | Execute tasks using the execution engine (daemon-orchestrated). |
| `openexec blueprint <task-description>` | Execute a single task using blueprint-based orchestration. |
| `openexec chat` | Start an interactive conversational session. |
| `openexec status [run-id]` | Show execution-engine and run status (supports `--watch` and `--json`). |
| `openexec tui [directory]` | Launch the interactive terminal dashboard. |
| `openexec stop` | Stop the execution engine. |
| `openexec restart` | Restart the execution engine. |

See [Monitoring Status](./status) for `status` output details.

## Knowledge & skills

| Command | Description |
|---------|-------------|
| `openexec knowledge index [directory]` | Index project source code into deterministic Pointer Records. |
| `openexec knowledge show [symbols\|envs\|api\|prd]` | Show records in the current project's knowledge base. |
| `openexec knowledge ls [directory]` | List projects with an initialized knowledge base. |
| `openexec knowledge init [directory]` | Initialize an empty knowledge base at a path. |
| `openexec skills list` | List all available skills. |
| `openexec skills info <name>` | Show details about a skill. |
| `openexec skills search <query>` | Search skills by keyword. |
| `openexec skills create <name>` | Scaffold a new user skill. |
| `openexec skills enable <name>` / `disable <name>` | Enable or disable a skill. |
| `openexec skills import` | Import skills from external sources. |

## Releases, stories & tasks

| Command | Description |
|---------|-------------|
| `openexec release create <version>` | Create a new release. |
| `openexec release show` | Show current release information. |
| `openexec release changelog` | Generate a changelog for the current release. |
| `openexec release process` | Process approved stories and complete the release pipeline. |
| `openexec release reset` | Reset all stories and tasks to pending status. |
| `openexec story create <id> <title>` / `list` / `show <id>` | Manage stories. |
| `openexec story merge <id>` / `approve <id>` | Merge or approve a story. |
| `openexec task create <id> <title>` / `complete <id>` / `list` | Manage tasks. |
| `openexec task link <id> <commit>` / `autolink` | Link commits to tasks. |

## Safety, audit & patches

| Command | Description |
|---------|-------------|
| `openexec approve list` | List pending tool approval requests. |
| `openexec approve yes <id>` / `no <id> [reason]` | Approve or reject a pending request. |
| `openexec audit` | Scan a path for stub patterns and emit a markdown/JSON report. |
| `openexec patch apply [diff-file]` | Apply a unified diff scoped to the workspace root. |
| `openexec actions validate` | Validate an Action JSON from stdin. |
| `openexec replay [run-id]` | Inspect checkpointed artifacts for a run (patch sequence). |

## Integration & advanced

| Command | Description |
|---------|-------------|
| `openexec mcp-serve` | Run the OpenExec MCP signal server (used by Claude Code). |
| `openexec config provider list` | List configured API provider endpoints (also `add`, `use <name>`, `remove <name>`). |
| `openexec seed` | Seed a running template app with synthetic users and traffic. |
