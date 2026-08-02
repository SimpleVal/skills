---
name: implement
description: "Implement a piece of work based on a confirmed Shared Design, spec, or set of tickets."
---

Implement the work identified by the user.

Treat the designated Shared Design, specification, or tickets as the source of truth. Stop and report material contradictions or missing decisions rather than resolving them silently.

Before editing:

1. read `docs/agents/development-guides.md` and follow only the references applicable to the files in scope;
2. read `docs/agents/code-verification.md` and follow only the references applicable to the files in scope;
3. follow repository-level instructions and referenced guidance.

Continue when guidance is missing, but report the omission.

## Before Editing

Check for existing repository changes. If any exist, ask the user to choose:

1. stage all current changes with `git add -A`; or
2. continue without staging.

Do not edit until the user chooses. Preserve unrelated changes.

## Implement

Make the smallest correct change within the confirmed scope.

Use `/tdd` at pre-agreed seams when available and applicable. Otherwise continue and report the limitation.

When an item cannot be resolved safely, mark it blocked and continue with independent work.

## Verify

Run the complete applicable verification required by `docs/agents/code-verification.md`. Report unresolved blockers.

Do not create a commit.

## Final Result

Report:

- changes made;
- verification performed and results;
- missing guidance;
- `/tdd` limitations; and
- blocked or unresolved items.
