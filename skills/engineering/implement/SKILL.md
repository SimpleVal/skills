---
name: implement
description: "Implement a piece of work based on a confirmed Shared Design, spec, or set of tickets."
---

Act as the **Implementer Orchestrator** for the work described by the user in a confirmed Shared Design, spec, or tickets.

Before implementation, read the repo-local Skill Configuration Docs when they exist:

- `docs/agents/coding-standards.md` — the Coding Standards Doc Reference. Use it to find the human-provided coding standards that guide implementation.
- `docs/agents/code-verification.md` — the Code Verification Doc Reference. Use it to find the human-provided verification rules that guide test, typecheck, lint, and full-suite choices.

If either Skill Configuration Doc is missing, continue with the repository's visible instructions and report the missing doc in the final result.

Use /tdd where possible, at pre-agreed seams.

## Implementation Cycle

Run at most three Implementation Cycles. Each cycle contains implementation, verification, one Code Review attempt, and review-feedback evaluation.

### 1. Implement

Make the smallest correct change that satisfies the confirmed Shared Design, spec, or tickets, following the Coding Standards Doc Reference and repo instructions. Preserve unrelated user changes.

### 2. Verify

Run typechecking regularly, single test files regularly, and the full test suite once at the end, guided by the Code Verification Doc Reference.

If verification fails, fix the implementation and rerun verification. Retry up to three verification attempts in the current Implementation Cycle. If verification still fails after three attempts, start the next Implementation Cycle unless the three-cycle cap has been reached.

### 3. Review

Start /code-review only after verification passes. Run exactly one Code Review attempt per Implementation Cycle.

### 4. Evaluate Review Feedback

Classify every review finding as accepted feedback or Contested Feedback.

- Accepted feedback is feedback the Implementer Orchestrator agrees is valid and relevant. Apply it by returning to implementation and verification in the next Implementation Cycle.
- Contested Feedback is feedback the Implementer Orchestrator does not accept as valid or appropriate. Do not apply it silently. Report the finding and the reason for disagreement.

If accepted feedback remains unresolved after the third Implementation Cycle, report it as unresolved accepted feedback.

If Contested Feedback remains after review, report it with the disagreement reason. Do not keep cycling solely to erase contested items unless new implementation work is accepted.

## Commit Gate

Commit your work to the current branch only when all of these are true:

- Verification passes.
- No unresolved accepted feedback remains.
- No Contested Feedback remains.

Do not commit if verification is failing, unresolved accepted feedback remains, Contested Feedback remains, or the three Implementation Cycles have been exhausted with unresolved accepted feedback or Contested Feedback. Report the remaining unresolved feedback instead.
