---
title: Standalone Planner (Deprecated)
sidebar_position: 1
---

# OpenExec Planner (Standalone)

:::caution Deprecated
The standalone Python version of the **OpenExec Planner** is now deprecated. Its logic for requirement gathering, goal tree generation, and task scheduling has been ported to the unified **OpenExec** binary.
:::

## Legacy Overview
The standalone planner was designed to establish technical baselines via a Python-based engine. 

## Migration to Unified Binary
New users should install the unified **OpenExec** binary which provides the same planner functionality natively in Go with zero dependencies.

```bash
# New way (Go-native)
curl -sSfL https://openexec.io/install.sh | sh
openexec wizard
openexec plan INTENT.md
```

The documentation below is preserved for legacy users still running the Python engine.
