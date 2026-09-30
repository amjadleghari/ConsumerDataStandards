---
title: Maintain this site
sidebar_position: 1
description: How to build, test, extend and release this documentation site.
---

# Maintain this site

This section is for people who change the site or the standard it describes.

| Page | Read it when you want to |
|---|---|
| [Local setup](./local-setup.md) | Build and run the site on your computer |
| [Scripts](./scripts.md) | Know what each `npm run` command does |
| [Add an API](./add-an-api.md) | Add a new OpenAPI document |
| [Add an overlay](./add-an-overlay.md) | Produce a new edition of the APIs |
| [Add a workflow](./add-a-workflow.md) | Describe a new multi-step journey in Arazzo |
| [Add a diagram](./add-a-diagram.md) | Add a Mermaid diagram to a page |
| [Release](./release.md) | Publish a new version of the site |
| [Deployment](./deployment.md) | Understand how changes reach GitHub Pages |

## Repository layout

| Path | Holds | Edited by hand |
|---|---|---|
| `docs/` | Guide pages | yes |
| `docs/api/` | API reference pages | no, generated |
| `docs/workflows/generated/` | Workflow pages | no, generated |
| `specs/openapi/` | Source OpenAPI documents | yes |
| `specs/overlays/` | Overlay documents | yes |
| `specs/arazzo/` | Arazzo workflow descriptions | yes |
| `specs/generated/` | Overlay outputs | no, generated |
| `scripts/` | Build and test scripts | yes |
| `tests/` | Unit, render and workflow test configuration | yes |
| `.github/workflows/` | CI and deployment | yes |

Generated paths are listed in `.gitignore` and rebuilt by every build.
