---
title: Non-functional requirements
sidebar_position: 5
description: Fictitious availability, performance and traffic thresholds for data holders and recipients.
---

# Non-functional requirements

All thresholds are fictitious. They show the kind of obligation a standard
sets, not real values.

## Data holder obligations

| # | Requirement | Threshold |
|---|---|---|
| N-1 | Monthly availability of each API, excluding planned outages published through [getOutages](/docs/api/common/get-outages) | 99.5% |
| N-2 | 95th percentile response time, [getStatus](/docs/api/common/get-status) and [getOutages](/docs/api/common/get-outages) | 500 ms |
| N-3 | 95th percentile response time, [listAccounts](/docs/api/banking/list-accounts) and [getAccountBalance](/docs/api/banking/get-account-balance) | 1000 ms |
| N-4 | 95th percentile response time, [listTransactions](/docs/api/banking/list-transactions) | 1500 ms |
| N-5 | Notice before a planned outage | 7 days |

## Data recipient obligations

| # | Requirement | Threshold |
|---|---|---|
| N-6 | Requests per second, per data recipient, per data holder | 50 |
| N-7 | Unattended synchronisation calls, per consumer, per day | 20 |
| N-8 | Behaviour on `429` | Wait for `Retry-After`. See the [error model](./error-model.md) |

N-7 is why Tallowood Budgeting synchronises once a day in the
[data flow](/docs/use-case/data-flow).
