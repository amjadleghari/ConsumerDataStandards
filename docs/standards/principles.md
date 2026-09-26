---
title: Principles
sidebar_position: 1
description: The design principles behind the Coralbay Open Data Standard.
---

# Principles

The FDSC applies these principles when it changes the standard.

| # | Principle | How the standard applies it |
|---|---|---|
| P-1 | **The consumer is in control.** | Data moves only within an arrangement the consumer approved, and the consumer can end it at any time. See the [consent lifecycle](/docs/use-case/consent-lifecycle). |
| P-2 | **Share the minimum.** | Only masked account numbers are shared, and holder-only operations are removed from the [recipient edition](/docs/overlays/recipient). |
| P-3 | **One description, many editions.** | Each API has one source document. [Overlays](/docs/overlays) produce the editions, so the editions cannot drift apart. |
| P-4 | **Journeys are specified, not implied.** | Multi-step journeys are [Arazzo workflows](/docs/workflows), tested against a mock of every API. |
| P-5 | **Contracts are explicit.** | Versioning, errors, pagination, security and performance each have a [contract page](/docs/contracts/versioning). |
| P-6 | **Change is versioned.** | Incompatible changes need a new endpoint version. See [versioning](/docs/contracts/versioning). |
