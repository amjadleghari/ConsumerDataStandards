---
title: Sandbox edition
sidebar_position: 3
description: The overlay that points each API at the fictitious sandbox server.
---

# Sandbox edition

The sandbox edition replaces the production server with the sandbox server.
The workflow tests run a mock server from this edition.

```yaml title="specs/overlays/sandbox.overlay.yaml"
overlay: 1.0.0
info:
  title: Sandbox edition
  version: 1.0.0
actions:
  - target: $.servers
    description: Remove the production server list.
    remove: true
  - target: $
    description: Set the sandbox server.
    update:
      servers:
        - url: https://sandbox.coralbay.example.com/cds-fictitious
          description: Sandbox (fictitious)
```

## What changes

| | Source | Sandbox edition |
|---|---|---|
| `servers[0].url` | `https://api.coralbay.example.com/cds-fictitious` | `https://sandbox.coralbay.example.com/cds-fictitious` |
| Number of servers | 1 | 1 |

## Why remove, then set

An `update` action merges its value into the target. For an array, merging
appends. An `update` on `$.servers` alone would leave two servers: production
and sandbox. So the overlay removes the list first, and then sets a new one on
the document root.
