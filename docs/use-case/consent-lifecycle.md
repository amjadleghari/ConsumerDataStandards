---
title: Consent lifecycle
sidebar_position: 4
description: The states of a data sharing arrangement and the events that move it between them.
---

# Consent lifecycle

A data sharing arrangement is always in one of four states.

```mermaid
stateDiagram-v2
    [*] --> Requested: Tallowood Budgeting asks for consent
    Requested --> Active: Alex approves, requestToken succeeds
    Requested --> [*]: Alex declines or the code expires
    Active --> Active: token refreshed
    Active --> Revoked: revokeArrangement
    Active --> Expired: 90 days pass
    Revoked --> [*]
    Expired --> [*]
```

| State | Meaning | Calls that succeed |
|---|---|---|
| Requested | Alex has not approved yet | None with a token |
| Active | The arrangement is in force | Every operation in the [Banking API](/docs/api/banking/banking-api), within the approved scope |
| Revoked | Alex withdrew consent | None. Calls return `401` with `urn:fdsc:error:authorisation:revoked`, see the [error model](/docs/contracts/error-model) |
| Expired | The duration ended | None. Calls return `401` |

## Events

| Event | Caused by | API |
|---|---|---|
| Approve | Alex, at Coralbay Mutual Bank | Browser redirect, then [requestToken](/docs/api/consent/request-token) |
| Revoke | Alex, in Tallowood Budgeting | [revokeArrangement](/docs/api/consent/revoke-arrangement), see the [Revoke an arrangement](/docs/workflows/generated/revoke-arrangement) workflow |
| Expire | Time | None |
