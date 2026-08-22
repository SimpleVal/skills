---
name: init-simval
description: Initialize or configure a Simval workspace. Use when no Simval workspace exists, Simval configuration must change, or approved initial root requirements should be added. Do not use for discovery or delivery execution.
---

# Init Simval

Mutate Simval state only through the `simval` CLI.

## Initialize

Run:

`simval project show`

If no workspace exists:

`simval project init`

If one already exists, keep it; do not reinitialize.

## Configure

Inspect:

`simval config show`

Apply only requested changes:

`simval config set <key> <value>`

Do not store credentials or secrets in Simval configuration.

## Add Initial Requirements

Add roots only when their intent is supplied or approved:

`simval project add-root --title <title> --summary-stdin`

An empty requirement forest is valid. Do not invent roots to complete setup.

## Validate

Run:

`simval validate`

Report:

- whether the workspace was created or already existed;
- configuration changes;
- roots added, if any;
- validation failures or setup blockers.

Stop after setup unless another workflow phase is explicitly requested.