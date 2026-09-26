---
title: Release
sidebar_position: 8
description: How to publish a new version of the site.
---

# Release

The site version is in `VERSION`, and the history is in `CHANGELOG.md`.
Change them together, in the same commit.

1. Decide the new version with Semantic Versioning: MAJOR for an incompatible
   change to the standard, MINOR for new content, PATCH for fixes.
2. Update `VERSION`, and move the `[Unreleased]` entries in `CHANGELOG.md` under
   a new heading with the version and date.
3. Open a pull request into `dev`. When CI passes, merge it.
4. Open a pull request from `dev` into `main`. When CI passes, merge it. The
   merge deploys the site. See [Deployment](./deployment.md).
5. Tag the merge commit on `main` as `vX.Y.Z`.

## Branches

| Branch | Holds |
|---|---|
| `main` | What is published |
| `dev` | What is ready for the next release |
| `feat/<name>` | Work in progress, cut from `dev` |
