---
title: Error model
sidebar_position: 2
description: The shape of every error response, and the error codes the standard defines.
---

# Error model

Every error response from the Common and Banking APIs, and from
`revokeArrangement`, has the same shape:

```json
{
  "errors": [
    {
      "code": "urn:fdsc:error:resource:unavailable",
      "title": "Unavailable account",
      "detail": "Account acc-999 is not shared in this arrangement."
    }
  ]
}
```

| Field | Rule |
|---|---|
| `errors` | An array with at least one item |
| `code` | A URN from the table below. Clients act on the code, not on the text |
| `title` | A short, fixed description of the code |
| `detail` | Text about this occurrence. It must not contain personal data other than identifiers the client already holds |

The token endpoint, [requestToken](/docs/api/consent/request-token), follows
OAuth 2.0 and returns `{"error": "...", "error_description": "..."}` instead.

## Codes

| Code | HTTP status | Operations |
|---|---|---|
| `urn:fdsc:error:header:invalid` | 400 | All operations that take `x-v` |
| `urn:fdsc:error:header:unsupported-version` | 406 | All operations that take `x-v`, see [versioning](./versioning.md) |
| `urn:fdsc:error:authorisation:revoked` | 401 | [listAccounts](/docs/api/banking/list-accounts), [getAccountBalance](/docs/api/banking/get-account-balance), [listTransactions](/docs/api/banking/list-transactions) |
| `urn:fdsc:error:authorisation:expired` | 401 | [revokeArrangement](/docs/api/consent/revoke-arrangement) and all Banking API operations |
| `urn:fdsc:error:resource:unavailable` | 404 | [getAccountBalance](/docs/api/banking/get-account-balance), [listTransactions](/docs/api/banking/list-transactions) |
| `urn:fdsc:error:field:invalid-page` | 422 | [listAccounts](/docs/api/banking/list-accounts), [listTransactions](/docs/api/banking/list-transactions), see [pagination](./pagination.md) |
| `urn:fdsc:error:field:invalid-arrangement` | 422 | [revokeArrangement](/docs/api/consent/revoke-arrangement) |
| `urn:fdsc:error:general:too-many-requests` | 429 | All Banking API operations, see [non-functional requirements](./non-functional-requirements.md) |
| `urn:fdsc:error:general:unexpected` | 500 | All operations |

## Client behaviour

* On `401` with `revoked`, stop calling for this arrangement and mark it
  revoked. See the [consent lifecycle](/docs/use-case/consent-lifecycle).
* On `429`, wait for the number of seconds in `Retry-After` before the next
  request.
* On `500`, retry at most three times with increasing delay.
