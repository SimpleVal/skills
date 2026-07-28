---
name: implement
description: "Implement a piece of work based on a confirmed Shared Design, spec, or set of tickets."
---

Implement the work identified by the user.
Treat the designated Shared Design, specification, or tickets as the source of truth. Stop and report material contradictions or missing decisions.

## Guidance

Follow repository instructions and, when present:

- `docs/agents/coding-standards.md`
- `docs/agents/code-verification.md`
- guidance referenced by those files

Report missing guidance in the final result.

## Before Editing

Check for existing repository changes. If any exist, ask the user to choose:

1. stage all current changes with `git add -A`; or
2. continue without staging.

Do not edit until the user chooses. Preserve unrelated changes either way.

## Implement

Make the smallest correct change within the confirmed scope.
Use `/tdd` at pre-agreed seams when available and applicable. Otherwise continue and report the limitation.
When an item cannot be resolved safely, mark it blocked and continue with independent work.

## Verify

Run the applicable repository-defined checks, including linting, type checks, tests, and other required verification.
For each failure:

1. make one reasonable fix attempt;
2. rerun the affected checks;
3. mark it blocked if the same failure remains.

If a resolved failure returns, allow one new fix attempt.
Continue with independent failures, then run the complete required verification set. Stop when it passes or all remaining failures are blocked.
Do not create a commit.

## Final Result

Report:

- changes made;
- verification performed and results;
- missing guidance or `/tdd` limitations; and
- blocked or unresolved items.
