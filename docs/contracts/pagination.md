---
title: Pagination
sidebar_position: 3
description: How list operations return data one page at a time.
---

# Pagination

List operations return data one page at a time:
[listAccounts](/docs/api/banking/list-accounts) and
[listTransactions](/docs/api/banking/list-transactions).

## Request

| Parameter | Default | Rule |
|---|---|---|
| `page` | 1 | The page to return. The first page is 1 |
| `page-size` | 25 | Records per page, from 1 to 1000 |

## Response

| Field | Rule |
|---|---|
| `links.self` | The URL of this page |
| `links.next` | The URL of the next page. **Present while more pages exist, and absent on the last page** |
| `meta.totalRecords` | The number of records across all pages |
| `meta.totalPages` | The number of pages at the requested `page-size` |

A `page` greater than `meta.totalPages` returns `422` with
`urn:fdsc:error:field:invalid-page`. See the [error model](./error-model.md).

## Client behaviour

Follow `links.next` until it is absent. Do not compute page URLs.

The [Synchronise transactions](/docs/workflows/generated/sync-transactions)
workflow shows this rule as Arazzo: after each page, it goes to the next step
only while the response has `links.next`, and it asserts that the last page has
none.
