---
title: Parties
sidebar_position: 2
description: The four fictitious parties in the worked example, and what each one is responsible for.
---

# Parties

| Party | Role | Responsibilities |
|---|---|---|
| **Fictitious Data Standards Council (FDSC)** | Standards body | Publishes the standard: the [API reference](/docs/api/banking/banking-api), the workflows (for example [Establish consent](/docs/workflows/generated/establish-consent)) and the [contracts](/docs/contracts/versioning) |
| **Coralbay Mutual Bank** | Data holder | Implements the Common, Banking and Consent APIs. Authenticates the consumer and records consent |
| **Tallowood Budgeting** | Data recipient | Asks for consent, calls the APIs within the arrangement, and revokes the arrangement when consent ends |
| **Alex Sample** | Consumer | Gives, reviews and withdraws consent |

## Identifiers

| Identifier | Example | Issued by |
|---|---|---|
| Client identifier | `tallowood-budgeting` | Registered with Coralbay Mutual Bank before any consent |
| Arrangement identifier | `arr-5520` | Coralbay Mutual Bank, when the [token request](/docs/api/consent/request-token) succeeds |
| Account identifier | `acc-001` | Coralbay Mutual Bank, stable for the life of the arrangement |
| Transaction identifier | `txn-1001` | Coralbay Mutual Bank |

None of these parties exist. The FDSC is not the Data Standards Body, and it has
no connection to any real standards body.
