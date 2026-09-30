---
title: Recipient conformance checklist
sidebar_position: 6
description: The checks a data recipient completes before going live.
---

# Recipient conformance checklist

A data recipient such as Tallowood Budgeting confirms each item before it goes
live with a data holder.

| # | Check | Contract | Evidence |
|---|---|---|---|
| C-1 | Sends `x-v` on every request that takes it, and handles `406` | [Versioning](./versioning.md) V-1, V-3 | Test log |
| C-2 | Acts on error `code`, not on `title` or `detail` | [Error model](./error-model.md) | Code review |
| C-3 | Stops calling an arrangement after `401` with `revoked` | [Error model](./error-model.md) | Test log |
| C-4 | Follows `links.next` until absent, and never computes page URLs | [Pagination](./pagination.md) | The [Synchronise transactions](/docs/workflows/generated/sync-transactions) workflow passes |
| C-5 | Never collects the consumer's banking credentials | [Security profile](./security-profile.md) S-2 | Design review |
| C-6 | Sends the access token only in the `Authorization` header | [Security profile](./security-profile.md) S-5 | Test log |
| C-7 | Calls [revokeArrangement](/docs/api/consent/revoke-arrangement) when the consumer withdraws consent | [Security profile](./security-profile.md) S-7 | The [Revoke an arrangement](/docs/workflows/generated/revoke-arrangement) workflow passes |
| C-8 | Stays within the traffic thresholds | [Non-functional requirements](./non-functional-requirements.md) N-6, N-7 | Load test |
| C-9 | Waits for `Retry-After` on `429` | [Error model](./error-model.md) | Test log |
| C-10 | Calls only operations in the [recipient edition](/docs/overlays/recipient) | [Overlays](/docs/overlays) | Code review |
