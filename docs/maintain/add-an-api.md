---
title: Add an API
sidebar_position: 4
description: Add a new OpenAPI document and publish its reference pages.
---

# Add an API

1. Add the document as `specs/openapi/<name>.yaml`. Use OpenAPI 3.1.0, and give
   every operation an `operationId`, a `summary`, a tag and examples. Follow the
   [naming conventions](/docs/standards/naming-and-conventions) and the
   [error model](/docs/contracts/error-model).
2. Add `<name>` to the `apis` list in `scripts/apply-overlays.mjs` and
   `scripts/check-overlays.mjs`.
3. Add `<name>` to the list in the `docusaurus-plugin-openapi-docs` entry in
   `docusaurus.config.ts`.
4. Add an `apiSection('<name>', '<Title>')` line to the `api` sidebar in
   `sidebars.ts`.
5. If a workflow will call the API, add a mock port for `<name>` in
   `tests/arazzo/runs.json`.
6. Run `npm run validate && npm run build`.

Mark a path that only the data holder may call with `x-fdsc-audience: holder`
on its path item. The [recipient overlay](/docs/overlays/recipient) removes it.
