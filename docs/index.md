---
slug: /
title: OpenExec Documentation
sidebar_position: 1
---

# OpenExec Documentation

Welcome to **OpenExec**, the Deterministic AI Operating System. 

OpenExec is now a **Single-Binary Platform** that handles the entire software development lifecycle—from initial requirements gathering to production deployment.

### Core Documentation
- [**The One Diagram That Explains OpenExec**](/architecture/THE-ONE-DIAGRAM) — High-level conceptual overview.
- [**Why OpenExec?**](/why-openexec) — Compare OpenExec to other AI tools and learn about Hybrid Brains.
- [**Strategic Advantages**](/architecture/STRATEGIC-ADVANTAGES) — Why OpenExec's architecture is better for certain teams.
- [**Getting Started**](/engine/intro) — Install and initialize your first project.
- [**Architecture Decision Memo (ADR-001)**](/architecture/ADR-001-CORE-RUNTIME) — The official roadmap for OpenExec consolidation.
- [**Runtime Architecture v1.0**](/architecture/RUNTIME-ARCHITECTURE-V1) — Detailed technical specification of the core runtime.
- [**Operational Memory Layer**](/architecture/OPERATIONAL-MEMORY-LAYER) — Pointer-record architecture for deterministic operational knowledge.
- [**Runtime Loop Reference**](/architecture/RUNTIME-LOOP-REFERENCE) — Pseudo-code implementation of the core orchestration kernel.
- [**V1 Cut List & Migration Board**](/architecture/V1-CUT-LIST-MIGRATION-BOARD) — Classification of components for removal, migration, or keep.
- [**V1 Simplification Pass**](/architecture/SIMPLIFICATION-PASS) — The aggressive de-scoping and cleanup strategy.
- [**Blueprint DSL v1**](/architecture/BLUEPRINT-DSL-V1) — YAML specification for deterministic and agentic workflows.
- [**Tool Action Contract v1**](/architecture/TOOL-ACTION-CONTRACT-V1) — The runtime interface for deterministic blueprint actions.
- [**Policy & Sandbox Contract v1**](/architecture/POLICY-SANDBOX-CONTRACT-V1) — Safety rules and capability-based access control.
- [**Run Timeline & Replay System**](/architecture/TIMELINE-REPLAY-SYSTEM) — Event-driven observability and deterministic replay.
- [**Runtime Package Layout (Go)**](/architecture/RUNTIME-PACKAGE-LAYOUT) — Modular structure of the core runtime and its subsystems.
- [**Blueprint Engine**](/engine/concepts/blueprints) — How deterministic and agentic stages work together.
- [**State Management**](/engine/concepts/state-management) — SQLite as the canonical source of truth.
- [**Deterministic Control Plane**](/engine/concepts/dcp) — Learn about surgical symbols and environment topologies.
- [**Guided Wizard**](/engine/usage/wizard) — How the AI Architect gathers requirements.

---

### Component Deprecation
:::caution Deprecated
The standalone **OpenExec Planner** (Python package) is now deprecated and its logic has been fully integrated into the core `openexec` binary. New users should use the unified binary.
:::
