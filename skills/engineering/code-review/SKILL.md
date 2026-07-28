---
name: code-review
description: Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes — Standards (does the code follow this repo's documented coding standards?) and Spec (does the code match what the originating issue/PRD asked for?). Runs both reviews in parallel sub-agents and reports them side by side. Use when the user wants to review a branch, a PR, work-in-progress changes, or asks to "review since X".
---

Review changes independently along two axes:

- **Standards** — conformity with repository guidance and the smell baseline.
- **Spec** — conformity with the originating issue, PRD, specification, or tickets.

Keep the axes separate so one cannot mask the other.

## Scope

Require a fixed point such as a commit, branch, or tag. Ask for one if none is provided.

When the user has not selected a scope, ask them to choose:

1. committed changes only; or
2. committed and work-in-progress changes.

Resolve the fixed point and stop if it is invalid.

For both modes, inspect:

- `git diff <fixed-point>...HEAD`
- `git log <fixed-point>..HEAD --oneline`

For work-in-progress mode, also inspect staged, tracked unstaged, and untracked changes.

Stop if the selected scope contains no changes.

## Guidance

Read `docs/agents/coding-standards.md` first when present. Also follow:

- repository-level instructions;
- guidance referenced by the coding standards;
- other applicable repository documentation.

Use `docs/agents/issue-tracker.md` when available to retrieve referenced issues. Continue without missing guidance and report the omission.

## Spec

Identify the originating spec from:

1. a source supplied by the user;
2. issue references in reviewed commits;
3. repository specs or tickets clearly associated with the change.

Treat inferred matches as candidates rather than confirmed sources.

If no spec is found, skip the Spec axis and report this in the final result.

Stop and report material contradictions between confirmed sources.

## Standards Baseline

Repository guidance overrides this baseline. Treat each smell as a judgement call rather than a hard violation, and skip issues already enforced by repository tooling.

- **Mysterious Name** — a name does not reveal what the value or behavior represents. Recommend renaming; inability to name it may indicate unclear design.
- **Duplicated Code** — the same logic shape appears in multiple changed locations. Recommend extracting the shared behavior.
- **Feature Envy** — code uses another object's data more than its own. Recommend moving the behavior closer to that data.
- **Data Clumps** — the same group of values repeatedly travels together. Recommend introducing a type representing the group.
- **Primitive Obsession** — a primitive represents a domain concept that warrants its own type.
- **Repeated Switches** — repeated branching on the same type or condition appears across the change. Recommend centralizing the decision or using polymorphism where appropriate.
- **Shotgun Surgery** — one logical change requires scattered edits across many locations. Recommend gathering related behavior.
- **Divergent Change** — one module changes for several unrelated reasons. Recommend separating responsibilities.
- **Speculative Generality** — abstractions, parameters, or extension points exist without a confirmed requirement. Recommend removing or inlining them.
- **Message Chains** — callers navigate through long object chains. Recommend hiding the navigation behind an appropriate method.
- **Middle Man** — a component mostly delegates without adding meaningful behavior. Recommend calling the underlying component directly.
- **Refused Bequest** — a subtype rejects or ignores much of its inherited contract. Recommend composition or a more appropriate abstraction.

## Review

Evaluate Standards and Spec independently.

Use isolated parallel sub-agents when available. Otherwise perform the reviews sequentially without carrying conclusions between axes.

### Standards

Review every selected change against repository guidance and the smell baseline.

For documented-standard violations, cite the source file and rule. For smells, name the smell and explain why it applies.

### Spec

Review every selected change against the confirmed spec.

Identify:

- missing or partial requirements;
- behavior outside the requested scope;
- implementations inconsistent with a requirement.

Cite the relevant requirement for each finding.

## Findings

Report each material finding as:

`Blocking|Non-blocking — file:line — issue — evidence — recommended correction`

Use **Blocking** when the issue must be resolved before acceptance. Use **Non-blocking** for worthwhile improvements that do not prevent acceptance.

Deduplicate findings within each axis. Do not merge or rerank across axes.

## Final Result

Present:

## Standards

Findings or an explicit pass.

## Spec

Findings, an explicit pass, or notice that the axis was skipped.

Then report:

- finding totals for each axis;
- the most serious finding within each axis;
- missing repository or issue-tracker guidance;
- files that could not be reviewed;
- fixed point and selected scope;
- standards and spec sources used.

Offer to save the complete report to `./scratch/code-review.md` for use in a separate session.

Create `./scratch` if needed, but write the report only after the user agrees. Do not overwrite an existing file without approval.
