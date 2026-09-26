---
title: Consumer journey
sidebar_position: 3
description: What Alex Sample sees and does, from first consent to withdrawal.
---

# Consumer journey

This page follows Alex Sample through the journey. The API calls behind each
step are in the [Establish consent](/docs/workflows/generated/establish-consent)
workflow.

```mermaid
sequenceDiagram
    actor Alex as Alex Sample
    participant T as Tallowood Budgeting
    participant C as Coralbay Mutual Bank
    Alex->>T: Connect my Coralbay accounts
    T->>Alex: Explain the data requested and the 90-day duration
    Alex->>T: Continue
    T->>C: Redirect Alex to sign in (browser)
    Alex->>C: Sign in and select accounts
    C->>Alex: Show the data requested
    Alex->>C: Approve
    C->>T: Redirect back with an authorisation code
    T->>C: requestToken (authorisation code)
    C-->>T: access token and arrangement arr-5520
    T->>C: listAccounts
    C-->>T: acc-001 and acc-002
    T->>Alex: Show the connected accounts
```

## Steps

1. **Ask.** Tallowood Budgeting tells Alex which data it will read (accounts,
   balances, transactions), why, and for how long (90 days).
2. **Authenticate.** Alex signs in to Coralbay Mutual Bank. Tallowood Budgeting
   never sees Alex's banking password.
3. **Authorise.** Alex selects the accounts to share and approves. The bank
   records the consent.
4. **Connect.** Tallowood Budgeting exchanges the authorisation code with
   [requestToken](/docs/api/consent/request-token), then calls
   [listAccounts](/docs/api/banking/list-accounts).
5. **Withdraw.** At any time, Alex can withdraw consent in the app. Tallowood
   Budgeting then calls [revokeArrangement](/docs/api/consent/revoke-arrangement).

The rules that apply to the token and the redirect are in the
[security profile](/docs/contracts/security-profile).
