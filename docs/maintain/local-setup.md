---
title: Local setup
sidebar_position: 2
description: Install the tools and run the site locally.
---

# Local setup

## Requirements

* Node.js 20 or later. CI uses Node.js 24.
* Git.
* For the render tests on your computer: Google Chrome. CI uses the Chromium
  that Playwright installs.

## Install and run

```bash
npm ci
npm start
```

`npm start` first applies the overlays and generates the API and workflow
pages, then starts a development server at
`http://localhost:3000/ConsumerDataStandards/`.

## Check everything before you open a pull request

```bash
npm run validate      # OpenAPI lint, overlays, Arazzo lint and workflow tests
npm run test:unit     # unit tests for the workflow page generator
npm run build         # production build; fails on any broken link
npm run test:render   # every Mermaid diagram renders
```

CI runs the same four commands on every pull request.

## Known platform differences

* On Windows, the Arazzo test tool can crash after it prints its summary, with
  a message such as `Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)`.
  The summary is correct. CI runs on Linux, and its result is the one that
  counts.
* The render tests start their own server on `127.0.0.1:3919`. Stop anything
  else on that port first.
