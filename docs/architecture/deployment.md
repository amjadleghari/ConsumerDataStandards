---
title: Deployment
sidebar_position: 3
description: The production and sandbox environments, and what each edition of the APIs points at.
---

# Deployment

Coralbay Mutual Bank runs two environments. Each API edition points at one of
them.

```mermaid
architecture-beta
    group prod(cloud)[Production]
    group sandbox(cloud)[Sandbox]

    service prodgw(internet)[api coralbay example com] in prod
    service prodapi(server)[Banking and Consent APIs] in prod
    service proddb(database)[Core ledger] in prod

    service sbxgw(internet)[sandbox coralbay example com] in sandbox
    service sbxapi(server)[Mock APIs] in sandbox

    prodgw:R --> L:prodapi
    prodapi:R --> L:proddb
    sbxgw:R --> L:sbxapi
```

| Environment | Server | Data | Edition |
|---|---|---|---|
| Production | `https://api.coralbay.example.com/cds-fictitious` | Real accounts (in the story) | Source documents and the [recipient edition](/docs/overlays/recipient) |
| Sandbox | `https://sandbox.coralbay.example.com/cds-fictitious` | Example responses only | The [sandbox edition](/docs/overlays/sandbox) |

In this repository, the sandbox is simulated by a local mock server, which
`npm run arazzo:test` starts for the [workflows](/docs/workflows).
