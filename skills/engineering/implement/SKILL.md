---
name: implement
description: Implement a prepared Simval delivery or accepted review feedback against the exact bound spec. Use behavior-oriented TDD where appropriate, run required project verification, and record the exact verified head. Do not perform independent review or human-gated decisions.
---

# Implement

Mutate Simval state only through the `simval` CLI.

## Select Work

Use the supplied node, or inspect:

`simval task next --actor agent`

Handle only:

- `implement`
- `assess_review_feedback`

## Assess Review Feedback

For `assess_review_feedback`, read:

`simval review current <node-id>`

For every actionable finding:

`simval review respond <node-id> <review-id> <finding-id> accept|contest --reason-stdin`

Use:

- `accept` when the finding is valid and corrective implementation is required;
- `contest` when the finding is technically or contractually incorrect.

Then run:

`simval review finish-response <node-id> <review-id>`

If any contest remains, stop for human resolution.

If accepted findings return the delivery to `implementing`, continue below.

## Load the Contract

Read:

- `simval node get <node-id>`
- exact bound spec revision with `simval spec get <spec-id> --revision <revision> --content-only`

Load project context, node knowledge, and repository engineering guidance only when relevant.

Do not substitute a newer unadopted spec revision.

## Start or Continue

For a ready delivery:

`simval implementation start <node-id>`

If Simval reports an unmet prerequisite, stop and report it rather than bypassing the workflow.

If already `implementing`, continue directly.

Respect internal dependencies as implementation-order constraints.

## Implement Behavior

Work in coherent behavior slices.

Where automated testing is appropriate:

1. identify observable behavior at a stable seam;
2. demonstrate the missing or incorrect behavior;
3. make the minimum production change;
4. confirm the behavior passes;
5. refactor safely;
6. repeat.

Avoid tautological or unnecessarily implementation-coupled tests.

Follow repository architecture, conventions, and verification guidance. Avoid unrelated cleanup.

## Stop on Contract Ambiguity

Do not invent behavior when implementation exposes a material ambiguity in:

- desired behavior;
- acceptance criteria;
- scope;
- policy;
- shared semantics;
- contractual architecture.

Return it to discovery/spec refinement.

Do not silently adopt a newer spec. If an explicitly approved revision must replace the current contract after implementation started, use:

`simval spec adopt <node-id> <revision>`

## Verify

Ensure the intended delivery state is committed on the associated branch.

Start:

`simval verification start <node-id>`

Run the repository's required deterministic verification externally.

On failure:

`simval verification fail <node-id> [--result-ref <ref>]`

Then, before correcting code:

`simval implementation resume <node-id>`

Fix and repeat.

On success, resolve the exact committed head that was verified and record:

`simval verification pass <node-id> --head <git-sha> [--result-ref <ref>]`

If code changes afterward, the previous verification no longer authorizes the new head.

## Finish

Report:

- delivery node and bound spec revision;
- review findings addressed, if any;
- verification result;
- verified head when successful;
- blockers or contract ambiguity.

Do not perform independent review, contested-finding resolution, risk approval, merge approval, or manual completion.