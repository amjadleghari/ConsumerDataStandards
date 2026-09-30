---
title: Add an overlay
sidebar_position: 5
description: Produce a new edition of the APIs with an OpenAPI Overlay.
---

# Add an overlay

1. Add `specs/overlays/<edition>.overlay.yaml` in Overlay 1.0.0 format.
2. Add `<edition>` to the `editions` list in `scripts/apply-overlays.mjs`.
3. **Add a check for the overlay's effect** in `scripts/check-overlays.mjs`.
   The overlay tool does not fail when a target matches nothing, so without a
   check a mistyped target publishes an unchanged document.
4. Run `npm run specs:overlay && npm run specs:lint`.
5. Add a page under `docs/overlays/` that shows the overlay and a before and
   after table.

## Two rules that the tool does not enforce

* An `update` on an array appends to it. To replace an array, `remove` it, then
  `update` its parent. See the [sandbox edition](/docs/overlays/sandbox).
* To remove a whole path, filter on the path item, for example
  `$.paths[?(@['x-fdsc-audience'] == 'holder')]`. Filtering on the operation
  leaves an empty path item behind.
