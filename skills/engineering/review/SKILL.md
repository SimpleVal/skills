---
name: review
description: Independently review a verified Simval delivery against its exact bound spec and immutable PR diff. Run separate spec and code perspectives, aggregate actionable findings, and record outcome and risk. Do not implement fixes or perform human-gated decisions.
---

# Review

Mutate Simval state only through the `simval` CLI.

## Select Work

Use the supplied node, or inspect:

`simval task next --actor agent`

Handle only:

`agent_review`

## Load the Review Contract

Read:

- `simval node get <node-id>`
- exact bound spec with `simval spec get <spec-id> --revision <revision> --content-only`

Load project context, node knowledge, and repository engineering guidance only when relevant.

Do not review against a newer unadopted spec.

Resolve:

- base ref;
- merge-base SHA;
- current PR head SHA.

Require the PR head to equal `verified_head`. If it differs, stop for re-verification.

Begin:

`simval review begin <node-id> --base-ref <ref> --merge-base <sha> --head <sha>`

Both review perspectives must inspect the same immutable:

`merge-base → head`

## Run Two Independent Perspectives

Keep the reviews independent until both finish.

Prefer isolated or parallel reviewer contexts when supported.

### Spec Review

Check the exact diff against the bound contract:

- acceptance criteria;
- required behavior and flows;
- explicit constraints;
- exclusions;
- unintended scope changes;
- acceptance-criterion-to-test traceability.

Do not invent requirements outside the spec.

### Code Review

Check:

- correctness and regressions;
- repository-specific standards;
- test quality;
- maintainability;
- relevant security, reliability, data, concurrency, and performance risks.

Repository standards override generic maintainability heuristics when intentional.

As heuristics, not automatic violations, consider:

- unclear names;
- duplicated logic;
- feature envy;
- primitive obsession or data clumps;
- repeated conditionals;
- shotgun surgery;
- divergent responsibilities;
- speculative generality;
- excessive message chains;
- needless indirection;
- inappropriate inheritance.

Report a smell only when it materially harms clarity, correctness, changeability, or maintenance.

## Record Actionable Findings

A finding should explain:

- what is wrong;
- why it matters;
- where it occurs;
- the affected contract, repository rule, or engineering principle.

Do not record cosmetic preference, speculative concerns without a plausible failure mode, or unrelated refactoring wishes.

After both reviews finish:

1. normalize findings;
2. deduplicate the same root issue;
3. preserve provenance as `spec`, `code`, or both.

Add findings with:

`simval review add-finding <operation-id> --source spec|code --summary <summary> --details-stdin`

Add additional provenance with:

`simval review add-source <operation-id> <finding-id> spec|code`

## Determine Outcome and Risk

Use:

- `clean` only when there are no actionable findings;
- `unresolved` otherwise.

Assess high risk separately from findings.

Mark high risk only when the change warrants explicit human technical review because of material consequences such as security sensitivity, irreversible data change, migration risk, concurrency, large blast radius, difficult rollback, or major operational impact.

Do not use high risk as a substitute for a concrete finding.

## Commit

Use the appropriate form:

`simval review commit <operation-id> --outcome clean|unresolved [--high-risk] [--reason-stdin]`

If the review cannot be completed after `review begin`:

`simval operation abort <operation-id>`

Do not commit a partial review as complete.

## Finish

Report:

- delivery node and bound spec revision;
- reviewed head and merge-base;
- review round;
- actionable findings and provenance;
- outcome;
- high-risk flag and reason when applicable;
- resulting Simval state;
- required implementation or human follow-up.

Do not implement fixes, assess findings as accept/contest, resolve contests, approve risk, approve merge, or complete manual testing.