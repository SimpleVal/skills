---
name: implement
description: "Implement a piece of work based on a confirmed Shared Design, spec, or set of tickets."
---

Act as the **Implementer Orchestrator** for the work identified by the user.

Treat the user-designated Shared Design, specification, or tickets as the source of truth. Stop and report material contradictions or missing decisions rather than resolving them silently.

## Repository Guidance

When present, read and follow:

- `docs/agents/coding-standards.md`
- `docs/agents/code-verification.md`
- repository-level instructions and any guidance referenced by those files

If either file is missing, continue using the available repository guidance and report the omission in the final result.

## Working-Tree Gate

Before implementation, check for staged, unstaged, and untracked changes.

If any exist, ask the user to choose:

1. clear or commit them before continuing; or
2. continue with committing disabled for this session.

Recheck the working tree after the user responds. If it remains dirty, continue only when the user chose to do so, preserve unrelated changes, and do not commit during this session.

Record the initial state so final changes can be distinguished from pre-existing work.

## Implement

Make the smallest correct change that satisfies the confirmed source of truth. Follow repository guidance and preserve unrelated user changes.

Use /tdd at pre-agreed seams when available and applicable. If it cannot be used, continue and report the limitation.

Stop expanding an item when it cannot be resolved safely within the confirmed scope, but continue working on other independent items.

## Verify and Review

### 1. Verify

Before code review, run the applicable repository-defined checks, including linting, type checks, tests, and other required verification.

Fix each failure and rerun the checks affected by the fix.

An item becomes blocked when it reappears unchanged after one reasonable fix attempt. If a previously resolved item reappears later, treat it as a regression and allow one new fix attempt before marking it blocked.

Track blocked items, but continue addressing other distinct failures.

### 2. Review

Run /code-review only after the applicable verification checks pass.

Classify each finding:

- Accepted: valid and relevant; fix it, then rerun only the affected verification checks before reviewing again.
- Contested: not valid or appropriate; do not apply it. Record the finding and disagreement reason for human resolution.

Apply the same blocked-item rule used for verification. Continue addressing other findings after one becomes blocked.

If /code-review is unavailable or fails to run, record the reason and disable committing.

Repeat verification and review until no actionable findings remain or remaining items are blocked or contested.

### 3. Final Verification

When review is clear, run the complete verification set required by the repository.

For each new failure:

1. fix it;
2. rerun the affected checks;
3. run /code-review again;
4. repeat complete final verification.

Continue until final verification passes or remaining items become blocked.

## Commit Gate

Commit the session's implementation changes to the current branch only when all of the following are true:

- the post-choice working-tree check was clean;
- /code-review completed successfully;
- no blocked verification issue remains;
- no unresolved accepted finding remains;
- no contested finding remains;
- complete final verification passes; and
- the commit contains only changes produced by this session.

Otherwise, do not commit and report each blocking reason.

## Final Result

Report:

- what changed;
- verification and review performed;
- whether a commit was created;
- missing repository guidance;
- /tdd limitations;
- blocked or contested items and their reasons; and
- any other unresolved blocker.
