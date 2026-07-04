---
slug: /
title: OpenExec Documentation
sidebar_position: 1
---

# OpenExec Documentation

Welcome to **OpenExec** — an AI delivery system that turns GitHub issues into reviewed, verified pull requests.

The bottleneck in AI-assisted development was never coding speed; it's keeping the team in sync — copy-pasting a ticket to an agent, making the change, then updating Jira again by hand. OpenExec was built on greenfield-grade precision — extract intent, blueprint the work, decompose it into tasks, and verify every result against the goal — and points that same rigor at the individual tasks your team already tracks. Label an issue and it triages, plans, builds, and verifies it unattended, then opens a PR for you to review. The trail from issue → task → PR → merge is recorded automatically. Governance is optional.

OpenExec ships as a **single binary** that can run the whole lifecycle — from a single task to an entire greenfield project.

### Core Documentation
- [**The Architectural Roadmap**](/architecture) — Foundational specifications and the v1 strategy.
- [**Why OpenExec?**](/why-openexec) — Compare OpenExec to other AI tools and learn about Hybrid Brains.
- [**Getting Started**](/engine/intro) — Install and initialize your first project.
- [**Monitoring Status**](/engine/usage/status) — How to use `openexec status` to monitor active runs.
- [**Blueprint Engine**](/engine/concepts/blueprints) — How deterministic and agentic stages work together.
- [**State Management**](/engine/concepts/state-management) — SQLite as the canonical source of truth.
- [**Deterministic Control Plane**](/engine/concepts/dcp) — Learn about surgical symbols and environment topologies.
- [**Guided Wizard**](/engine/usage/wizard) — How the AI Architect gathers requirements.

---

### Component Deprecation
:::caution Deprecated
The standalone **OpenExec Planner** (Python package) is now deprecated and its logic has been fully integrated into the core `openexec` binary. New users should use the unified binary.
:::
