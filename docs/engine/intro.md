---
title: Getting Started
sidebar_position: 1
slug: /engine/intro
---

# Getting Started with OpenExec

OpenExec is a **Deterministic AI Operating System** designed to automate software development workflows with surgical precision. It is delivered as a single, zero-dependency binary.

## Installation

The quickest way to install OpenExec on macOS, Linux, or Windows (WSL) is via the unified install script:

```bash
curl -sSfL https://openexec.io/install.sh | sh
```

This script automatically detects your operating system and architecture, downloads the correct binary, and installs it to `/usr/local/bin`.

## Core Capabilities

OpenExec consolidates the entire development lifecycle into a single engine:

1.  **Guided Interview (`wizard`)**: Chat with the AI Architect to define project goals and constraints.
2.  **Surgical Planning (`plan`)**: Decomposes intent into a high-fidelity Goal Tree and implementation stories.
3.  **Autonomous Execution (`run`)**: Agents implement changes locally, protected by mandatory quality gates.
4.  **Deterministic Control**: Uses local 1-bit routing and AST symbol indexing for zero-hallucination context.

## First Steps

Once installed, initialize your first project:

```bash
# Initialize OpenExec configuration
openexec init

# Start the guided interview to define your project
openexec wizard

# Open the visual Knowledge Hub dashboard
openexec start --ui
```
