---
title: Use case overview
sidebar_position: 1
description: The worked example used on every page of this site.
---

# Use case overview

Every page on this site uses one worked example.

**Alex Sample** banks with **Coralbay Mutual Bank**. Alex starts to use
**Tallowood Budgeting**, an app that builds a monthly budget from real
transactions. To do that, Tallowood Budgeting needs to read Alex's accounts and
transactions from Coralbay Mutual Bank, with Alex's consent.

The story has four parts:

1. **Consent.** Alex gives Tallowood Budgeting consent to read account and
   transaction data for 90 days. See [Consent lifecycle](./consent-lifecycle.md).
2. **First read.** Tallowood Budgeting exchanges the consent for an access token
   and reads Alex's accounts. See the
   [Establish consent](/docs/workflows/generated/establish-consent) workflow.
3. **Regular synchronisation.** Tallowood Budgeting reads new transactions,
   page by page. See the
   [Synchronise transactions](/docs/workflows/generated/sync-transactions)
   workflow and the [pagination contract](/docs/contracts/pagination).
4. **Withdrawal.** Alex withdraws consent, and Tallowood Budgeting revokes the
   arrangement. See the
   [Revoke an arrangement](/docs/workflows/generated/revoke-arrangement)
   workflow.

| Part | API operations | Contract pages |
|---|---|---|
| Consent | [requestToken](/docs/api/consent/request-token) | [Security profile](/docs/contracts/security-profile) |
| First read | [getStatus](/docs/api/common/get-status), [listAccounts](/docs/api/banking/list-accounts) | [Versioning](/docs/contracts/versioning) |
| Synchronisation | [listTransactions](/docs/api/banking/list-transactions) | [Pagination](/docs/contracts/pagination), [Non-functional requirements](/docs/contracts/non-functional-requirements) |
| Withdrawal | [revokeArrangement](/docs/api/consent/revoke-arrangement) | [Error model](/docs/contracts/error-model) |

:::note
All names, identifiers and amounts are invented. `acc-001`, `txn-1001` and
`arr-5520` are example identifiers, not real ones.
:::
