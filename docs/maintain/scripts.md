---
title: Scripts
sidebar_position: 3
description: Every npm script in this repository and what it does.
---

# Scripts

| Script | What it does |
|---|---|
| `start` | Starts the development server. `prestart` runs first |
| `prestart` | Applies the overlays and generates the API and workflow pages |
| `build` | Builds the production site into `build/`. `prebuild` runs first |
| `prebuild` | Same as `prestart` |
| `serve` | Serves `build/` locally |
| `clear` | Deletes the Docusaurus cache |
| `docusaurus` | Runs the Docusaurus command line directly |
| `typecheck` | Type-checks the TypeScript configuration and pages |
| `specs:overlay` | Applies both overlays to all three APIs into `specs/generated/`, then checks that each overlay had its effect |
| `specs:lint` | Lints the source and generated OpenAPI documents with the rules in `redocly.yaml` |
| `docs:gen` | Generates the API reference pages, then the workflow pages |
| `arazzo:lint` | Lints the Arazzo descriptions |
| `arazzo:test` | Starts a mock server for each sandbox edition and runs every workflow against the mocks |
| `validate` | Runs `specs:overlay`, `specs:lint`, `arazzo:lint` and `arazzo:test` in order |
| `test:unit` | Runs the unit tests in `tests/unit/` |
| `test:render` | Serves `build/`, then checks in a browser that every Mermaid diagram renders |

## What each check catches

| Check | Fails when |
|---|---|
| `specs:overlay` | An overlay target matches nothing, so the overlay changed nothing |
| `specs:lint` | An OpenAPI document breaks the OpenAPI specification or a rule in `redocly.yaml` |
| `arazzo:test` | A workflow step does not meet its success criteria against the mock |
| `docs:gen` | A workflow step names an operation that has no API reference page |
| `build` | Any internal link or anchor is broken |
| `test:render` | A Mermaid block does not render, which a build alone does not detect |
