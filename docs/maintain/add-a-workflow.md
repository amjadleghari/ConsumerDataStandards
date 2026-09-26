---
title: Add a workflow
sidebar_position: 6
description: Describe a new multi-step journey in Arazzo, test it, and publish its page.
---

# Add a workflow

1. Add `specs/arazzo/<name>.arazzo.yaml` in Arazzo 1.0.1 format. Point each
   `sourceDescriptions` entry at `../openapi/<api>.yaml`.
2. Refer to operations by `operationId`, either bare (`listAccounts`) or
   qualified (`$sourceDescriptions.banking.listAccounts`). The page generator
   supports only `operationId` steps.
3. Add a run to `tests/arazzo/runs.json` with the workflow's inputs.
4. Run `npm run arazzo:lint && npm run arazzo:test`.
5. Run `npm run docs:gen`. The page appears under
   `docs/workflows/generated/`. Add a row for it to the
   [workflows index](/docs/workflows).

## Rules for published workflows

* **No mock hosts.** Never write `localhost` or `127.0.0.1` in a workflow. The
  test runner sends requests to the mocks with a server override.
* **No mock-only values as literals.** A value that only a mock needs, such as
  the `Prefer: example=...` header that selects an example response, enters
  the workflow as an input. `tests/arazzo/runs.json` supplies it.
* **Loops need a condition that ends.** Use a JSONPath filter such as
  `$[?(@.links.next)]` for the `goto`, and assert the end condition on the last
  step. See the
  [Synchronise transactions](/docs/workflows/generated/sync-transactions)
  workflow.
