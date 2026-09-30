---
title: Naming and conventions
sidebar_position: 2
description: Field naming, data types and identifier formats used across all APIs.
---

# Naming and conventions

## Names

| Item | Convention | Example |
|---|---|---|
| JSON fields | camelCase | `availableBalance` |
| Query parameters | kebab-case | `page-size`, `oldest-time` |
| Headers | lower case, hyphenated | `x-v`, `x-fapi-interaction-id` |
| Enumerated values | UPPER_SNAKE_CASE | `TRANS_AND_SAVINGS_ACCOUNTS` |
| Operation identifiers | camelCase verb first | `listTransactions` |

The OAuth token fields in the [Consent API](/docs/api/consent/consent-api)
(`access_token`, `cdr_arrangement_id`) keep the snake_case names that the OAuth
convention uses.

## Data types

| Type | Format | Example |
|---|---|---|
| Amount | String, two decimal places, negative for debits | `"-42.50"` |
| Currency | ISO 4217 code | `"AUD"` |
| Date and time | ISO 8601 with offset | `"2026-09-25T14:02:00+10:00"` |
| Duration | ISO 8601 duration | `"PT2H"` |

Amounts are strings so that no client loses precision by parsing them as
floating-point numbers.

## Response envelope

Every successful response from the Common and Banking APIs has `data`, `links`
and `meta`. See [pagination](/docs/contracts/pagination) for the paged form.

## Example identifiers

All example identifiers use fixed prefixes, so they are easy to recognise as
examples: `acc-` for accounts, `txn-` for transactions, `arr-` for
arrangements.
