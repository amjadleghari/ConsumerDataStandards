---
title: Data recipient edition
sidebar_position: 2
description: The overlay that removes holder-only operations for data recipients.
---

# Data recipient edition

Data recipients such as Tallowood Budgeting need only the operations they are
allowed to call. The Banking API source also describes an operation for
Coralbay Mutual Bank's own use, `getHolderMetrics` at `/admin/metrics`. Its path
item carries `x-fdsc-audience: holder`.

```yaml title="specs/overlays/recipient.overlay.yaml"
overlay: 1.0.0
info:
  title: Data recipient edition
  version: 1.0.0
actions:
  - target: $.paths[?(@['x-fdsc-audience'] == 'holder')]
    description: Remove holder-only paths.
    remove: true
  - target: $.info
    description: Label the audience.
    update:
      x-audience: data-recipient
```

## What changes

| | Source | Recipient edition |
|---|---|---|
| `/banking/accounts` | present | present, see [List accounts](/docs/api/banking/list-accounts) |
| `/banking/accounts/{accountId}/transactions` | present | present, see [List transactions](/docs/api/banking/list-transactions) |
| `/admin/metrics` | present | **removed** |
| `info.x-audience` | absent | `data-recipient` |

The filter selects path items, not operations. That removes the whole path, so
no empty path item is left behind.
