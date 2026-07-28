---
name: address-review
description: "Critically evaluate every code-review finding, fix accepted findings, and verify the resulting changes."
---

Address every finding in a code-review report.

Do not assume the report is correct. Evaluate each finding from repository evidence and accept only feedback that is valid, relevant, and within scope.

Do not create a commit.

## Input

Use the report path supplied by the user.

When none is supplied, use `./scratch/code-review.md` if it exists. Also accept findings pasted directly by the user.

Stop if no findings are available.

Verify the report's fixed point, scope, standards sources, spec source, and other context against the current repository.

## Before Editing

Check for existing repository changes. If any exist, ask the user to choose:

1. stage all current changes with `git add -A`; or
2. continue without staging.

Do not edit until the user chooses. Preserve unrelated changes.

## Evaluate

Evaluate every finding against:

- repository guidance;
- the current code and surrounding behavior;
- the confirmed specification when available;
- the reviewed changes; and
- relevant tests or verification evidence.

Classify each finding as:

- **Accepted** — valid, relevant, and appropriate to fix.
- **Contested** — incorrect, unsupported, obsolete, already resolved, outside scope, or contrary to repository guidance.
- **Blocked** — cannot be evaluated or fixed safely.

Do not accept feedback merely because it was marked Blocking.

Record each decision as:

`Accepted|Contested|Blocked — original finding — rationale — evidence`

Do not change code for contested findings.

## Fix

Apply the smallest correct fix for every accepted finding.

Use `/tdd` at pre-agreed seams when available and applicable. Otherwise continue and report the limitation.

Reclassify an accepted finding as Blocked when it cannot be fixed safely.

## Verify

Invoke `verify-change` for affected verification after related fixes, then for complete verification after all accepted findings have been addressed. Allow it to fix verification failures.

Stop if `verify-change` is unavailable.

Reinspect every accepted finding after verification. Mark it resolved only when the code and verification evidence show the issue no longer remains.

## Final Result

Report:

- each finding and its final classification;
- fixes made;
- evidence supporting contested findings;
- blocked findings and reasons;
- verification results;
- `/tdd` limitations;
- missing dependencies or guidance; and
- unresolved accepted findings.

Distinguish this session's changes from pre-existing work.
