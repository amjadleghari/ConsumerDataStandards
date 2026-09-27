---
title: Security profile
sidebar_position: 4
description: A simplified, fictitious summary of the security rules for the standard.
---

# Security profile

:::caution Simplified and fictitious
This profile is a teaching summary. It is not complete, and it is not suitable
for a real system. A real consumer data standard requires a full security
profile, such as a financial-grade OAuth 2.0 profile, with its own conformance
testing.
:::

## Rules

| # | Rule | Operations |
|---|---|---|
| S-1 | All traffic uses TLS 1.2 or later. | All |
| S-2 | The consumer authenticates only at the data holder, never at the data recipient. | Consent redirect |
| S-3 | An authorisation code is single-use and expires after 60 seconds. | [requestToken](/docs/api/consent/request-token) |
| S-4 | An access token expires after 600 seconds (`expires_in`). | [requestToken](/docs/api/consent/request-token) |
| S-5 | Every Banking API call carries `Authorization: Bearer <access token>`. | [listAccounts](/docs/api/banking/list-accounts), [getAccountBalance](/docs/api/banking/get-account-balance), [listTransactions](/docs/api/banking/list-transactions) |
| S-6 | A token grants only the scopes the consumer approved, for example `bank:accounts.basic:read`. | All Banking API operations |
| S-7 | Revoking an arrangement invalidates every token issued for it, at once. | [revokeArrangement](/docs/api/consent/revoke-arrangement) |
| S-8 | The Common API discovery operations need no token. | [getStatus](/docs/api/common/get-status), [getOutages](/docs/api/common/get-outages) |

## Where the rules appear in the workflows

The [Establish consent](/docs/workflows/generated/establish-consent) workflow
passes the access token from the `exchangeCode` step to the `readAccounts` step
in the `Authorization` header (S-5).
