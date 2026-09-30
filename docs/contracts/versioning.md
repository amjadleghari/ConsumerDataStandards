---
title: Versioning and deprecation
sidebar_position: 1
description: How clients ask for an endpoint version, and how long old versions stay available.
---

# Versioning and deprecation

Each endpoint has its own version number. The version is an integer, and a
client asks for it in a request header.

## Rules

| # | Rule |
|---|---|
| V-1 | Every request carries the `x-v` header with a positive integer, for example `x-v: 1`. |
| V-2 | The data holder returns the version it served in the `x-v` response header. |
| V-3 | If the data holder does not support the requested version, it returns `406` with `urn:fdsc:error:header:unsupported-version`. See the [error model](./error-model.md). |
| V-4 | A malformed `x-v` returns `400` with `urn:fdsc:error:header:invalid`. |
| V-5 | A new version is needed for any change that is not backward compatible: a removed field, a renamed field, a changed type, or a new required request field. |
| V-6 | Adding an optional response field does not need a new version. Clients ignore fields they do not know. |
| V-7 | The data holder supports the previous version for 12 months after a new version is published. |

## Operations this contract governs

Every operation that takes `x-v`:
[getStatus](/docs/api/common/get-status),
[getOutages](/docs/api/common/get-outages),
[listAccounts](/docs/api/banking/list-accounts),
[getAccountBalance](/docs/api/banking/get-account-balance) and
[listTransactions](/docs/api/banking/list-transactions).

The Consent API operations follow the OAuth token endpoint conventions and do
not take `x-v`.

## Standard version

The standard itself is versioned separately, with Semantic Versioning. The
current version is 1.0.0, and each API document states its own version in
`info.version`.
