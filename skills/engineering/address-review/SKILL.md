---
name: address-review
description: "Critically evaluate every code-review finding, fix accepted findings, and verify the resulting changes."
---

Address every finding in a code-review report.

Do not assume the report is correct. Repository guidance, the current code, and the confirmed specification take precedence.

Before editing:

1. read `docs/agents/development-guides.md` and follow only the references applicable to the files in scope;
2. read `docs/agents/code-verification.md` and follow only the references applicable to the files in scope;
3. follow repository-level instructions and referenced guidance.

Report missing guidance.

## Input

Use the report path supplied by the user, otherwise `./scratch/code-review.md` when present. Also accept pasted findings. Stop if no findings are available.

Validate the report context against the current repository.

## Before Editing

If repository changes already exist, ask the user to choose:

1. stage them with `git add -A`; or
2. continue without staging.

Preserve unrelated changes.

## Address Findings

Evaluate every finding against repository guidance, the code, reviewed changes, the specification when available, and relevant verification evidence.

Classify each as:

- **Accepted** — valid and appropriate to fix.
- **Contested** — incorrect, unsupported, obsolete, outside scope, or contrary to repository guidance.
- **Blocked** — cannot be evaluated or fixed safely.

Do not accept a finding only because it was marked Blocking.

Fix every accepted finding with the smallest correct change. Do not modify code for contested findings.

Use `/tdd` at pre-agreed seams when available and applicable. Report when it cannot be used.

## Verify

Run affected verification after related fixes, then complete applicable verification, following `docs/agents/code-verification.md`.

Reinspect each accepted finding and mark it resolved only when supported by the code and verification results.

Do not create a commit.

## Final Result

Report:

- each finding as Accepted, Contested, Blocked, or Resolved;
- fixes made and evidence for contested or blocked findings;
- verification results;
- missing guidance, specification context, or `/tdd` support; and
- unresolved items.

Distinguish this session's changes from pre-existing work.
