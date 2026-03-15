---
title: Monitoring Status
sidebar_position: 3
---

# Monitoring Engine & Run Status

OpenExec provides a built-in status command to monitor the background execution daemon and track the progress of active blueprint runs.

## Checking General Status

To see if the OpenExec daemon is running and view a summary of active and recent runs, use:

```bash
openexec status
```

### Example Output:
```text
OpenExec Status
===============

Daemon:  running (PID 12345, port 8765)

Active:  1 run(s)
  - run_abc123: running (implement)

Recent Runs:
  ✓ run_xyz789: completed
  ✗ run_err456: failed

Web UI:  http://localhost:8765
```

---

## Real-time Monitoring (Watch Mode)

Instead of manually polling, you can use the watch mode to see status updates in real-time. This is the recommended way to monitor background tasks without digging through log files.

```bash
openexec status --watch
# or
openexec status -w
```

This will clear your terminal and update the status every 2 seconds until you press `Ctrl+C`.

---

## Inspecting a Specific Run

If you want detailed information about a specific implementation run (including its current iteration and phase), provide the Run ID:

```bash
openexec status run_abc123
```

### Example Output:
```text
Run Details: run_abc123
========================================
Status:    running
Phase:     implement
Blueprint: standard_task
Iteration: 3
Task:      Add user authentication to the API
```

---

## JSON Output for Automation

For scripts or external monitoring tools, you can request the status in JSON format:

```bash
openexec status --json
```
