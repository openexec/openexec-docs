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

1.  **Guided Interview (`wizard`)**: An AI Architect helps you define your project's shape and goals.
2.  **Surgical Planning (`plan`)**: Turns your goals into a detailed, step-by-step implementation map.
3.  **Autonomous Execution (`run`)**: Your chosen AI model (Local or Cloud) builds your project, verified by quality tests via the **Blueprint Engine**.
4.  **Local Knowledge Map**: A precise map of your code that ensures the AI never has to "guess."

## Why this matters for you

As a developer, OpenExec lets you move from high-level intent to production code with 100% precision. Because your "Knowledge Map" is local, you save on cloud costs and protect your privacy while the engine handles the repetitive work of writing and testing.

## First Steps

OpenExec requires a Git repository to manage changes and safety rules. Once installed, set up your project:

```bash
# Ensure you are in a Git repository
git init

# Initialize OpenExec configuration
openexec init
```
# Start the guided interview to define your project
openexec wizard

# Open the visual Knowledge Hub dashboard
openexec start --ui
```
