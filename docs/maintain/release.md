---
title: Release
sidebar_position: 8
description: How to publish a new version of the site.
---

# Release

The site version is in `VERSION`, and the history is in `CHANGELOG.md`.
Change them together, in the same commit.

1. Run `npm audit`. Upgrade any dependency that has a fix within its major
   version, and run all checks again. Record in the pull request any advisory
   that has no non-breaking fix, with the reason it is accepted.
2. Decide the new version with Semantic Versioning: MAJOR for an incompatible
   change to the standard, MINOR for new content, PATCH for fixes.
3. Update `VERSION`, and move the `[Unreleased]` entries in `CHANGELOG.md` under
   a new heading with the version and date.
4. Open a pull request into `dev`. When CI passes, merge it.
5. Open a pull request from `dev` into `main`. When CI passes, merge it. The
   merge deploys the site. See [Deployment](./deployment.md).
6. Tag the merge commit on `main` as `vX.Y.Z`.

## Branches

| Branch | Holds |
|---|---|
| `main` | What is published |
| `dev` | What is ready for the next release |
| `feat/<name>` | Work in progress, cut from `dev` |
