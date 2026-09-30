---
title: Data flow
sidebar_position: 5
description: How transaction data moves from Coralbay Mutual Bank to Tallowood Budgeting during synchronisation.
---

# Data flow

Tallowood Budgeting synchronises Alex's transactions once a day. The
[Synchronise transactions](/docs/workflows/generated/sync-transactions)
workflow describes the calls.

```mermaid
sequenceDiagram
    participant T as Tallowood Budgeting
    participant G as Coralbay API gateway
    participant B as Banking API
    participant L as Core ledger
    T->>G: listTransactions acc-001, page 1
    G->>G: Check token and scope
    G->>B: Forward request
    B->>L: Read transactions after oldest-time
    L-->>B: Records
    B-->>T: Page 1, links.next present
    T->>G: listTransactions acc-001, page 2
    G->>B: Forward request
    B-->>T: Page 2, no links.next
    T->>T: Store transactions, update budget
```

## What moves, and what does not

| Data | Moves to Tallowood Budgeting | Rule |
|---|---|---|
| Account display name and masked number | yes | [listAccounts](/docs/api/banking/list-accounts) |
| Balances | yes | [getAccountBalance](/docs/api/banking/get-account-balance) |
| Transactions | yes, page by page | [listTransactions](/docs/api/banking/list-transactions), [pagination contract](/docs/contracts/pagination) |
| Full account number | no | Only the masked number is shared |
| Holder metrics | no | Removed from the recipient edition by the [recipient overlay](/docs/overlays/recipient) |

Traffic limits for this flow are in the
[non-functional requirements](/docs/contracts/non-functional-requirements).
