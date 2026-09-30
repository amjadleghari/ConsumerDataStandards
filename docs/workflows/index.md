---
title: Workflows
sidebar_position: 1
description: Arazzo descriptions of the multi-step journeys in the Coralbay Open Data Standard.
---

# Workflows

An [Arazzo](https://spec.openapis.org/arazzo/v1.0.1.html) description puts
API calls in order. Each step names an operation from an OpenAPI document,
says what counts as success, and passes values to later steps.

The standard describes three workflows. Each one follows a part of the use case.

| Workflow | What Tallowood Budgeting does | Source |
|---|---|---|
| [Establish consent and read accounts](./generated/establish-consent.mdx) | Exchanges Alex Sample's authorisation code for a token, then reads the shared accounts | `specs/arazzo/establish-consent.arazzo.yaml` |
| [Synchronise transactions](./generated/sync-transactions.mdx) | Reads every page of transactions on the first shared account | `specs/arazzo/sync-transactions.arazzo.yaml` |
| [Revoke an arrangement](./generated/revoke-arrangement.mdx) | Revokes the arrangement after Alex Sample withdraws consent | `specs/arazzo/revoke-arrangement.arazzo.yaml` |

## How the pages are made

`npm run docs:gen` generates one page per workflow. Each step in a page links
to its operation in the [API reference](/docs/api/banking/banking-api). If a
step names an operation that has no reference page, generation fails, so a
workflow cannot point at an operation that does not exist.

## How the workflows are tested

`npm run arazzo:test` runs every workflow. It starts a mock server for the
sandbox edition of each API (see [Overlays](../overlays/index.md)), and runs
each workflow against the mocks. A workflow passes only when every step meets
its success criteria.

The consent redirect, in which Alex Sample signs in to Coralbay Mutual Bank, is
a browser interaction. It is described in the first workflow but not executed.
