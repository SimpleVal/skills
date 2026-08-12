---
name: refine-spec
description: Refine software product or feature ideas into lean product requirements specifications. Use for user-facing digital products to challenge and clarify business requirements, users, journeys, UX behavior, scope, business rules, edge cases, success criteria, and high-level technical direction. Also use to refine an existing or child feature spec. Excludes detailed architecture, infrastructure, API/database design, deployment, and implementation design.
---

# Refine Spec

Turn a rough idea, partial specification, existing PRD, or child feature spec into a concise, complete product requirements specification.

Focus on business requirements, product behavior, UI/UX, realistic user scenarios, and high-level technical direction. Leave detailed solution design to specialized skills.

## Align with domain language

At the start, read the repository's `CONTEXT.md` when available and use its canonical domain language throughout the discussion and specification.

Do not edit `CONTEXT.md` from this skill.

When refinement exposes a missing, ambiguous, or conflicting domain term:

1. surface the terminology issue immediately;
2. delegate resolution and any `CONTEXT.md` update to `$domain-modeling` when available;
3. continue refinement using the resolved terminology.

Do not duplicate domain-modeling work inside this skill.

## Refine interactively

First assess what is already known. Ask only about missing, weak, conflicting, or risky areas.

- Work on the highest-impact gaps first.
- Ask 1–3 closely related questions per round.
- Keep resolved decisions without repeating them; revisit only if new information conflicts.
- Challenge vague answers until behavior, users, boundaries, scenarios, or outcomes are concrete.
- Challenge terminology that conflicts with `CONTEXT.md` rather than silently introducing synonyms.
- If vagueness comes from excessive scope, recommend decomposition instead of continuing broad questioning.
- Use realistic scenarios to expose missing states, alternate paths, invalid actions, permissions, interruptions, and user-visible failures.
- Do not manufacture requirements merely to complete a checklist.

When a meaningful product or UX decision is unresolved, provide at least 3 concise options. Put the recommended option first and state the main tradeoff for each. The user may choose, modify, combine, or replace them.

## Check completeness

Ensure relevant areas are sufficiently defined:

- problem and business objective;
- target users;
- scenarios / jobs-to-be-done;
- scope and non-goals;
- core journeys;
- functional behavior;
- UI/UX and important states;
- business rules;
- roles and permissions;
- user-visible edge and failure behavior;
- success measures;
- dependencies and assumptions;
- risks and open questions;
- high-level technical constraints or likely technology choices.

Treat unresolved gaps as:

- **blocking** — continue refinement;
- **non-blocking** — retain as an assumption, risk, or open question.

Do not finalize with blocking gaps.

## Control scope

Recommend decomposition when independent journeys, users, capabilities, objectives, or success criteria make the scope difficult to reason about or keep concise.

When proposing a split:

1. explain why;
2. propose child-feature boundaries;
3. show a Mermaid feature map when useful;
4. get approval before finalizing the split or producing child specs.

After approval, keep the parent at the level needed to define the overall product and child boundaries. Refine each child in a separate future session.

## Produce the specification

Prefer Mermaid diagrams, compact tables, and short bullets over prose. Avoid repeating requirements and omit sections that add no value.

Use this structure as needed:

1. **Overview** — problem, objective, users, goals, success measures.
2. **Scope** — in scope, non-goals, assumptions.
3. **Experience** — scenarios, journeys, diagrams, important UI states.
4. **Requirements** — behavior, business rules, roles, edge/failure handling.
5. **Product considerations** — dependencies, high-level technical direction, risks.
6. **Open questions** — non-blocking items only.
7. **Feature map** — approved child features and references.

Suggest a descriptive kebab-case filename such as `<feature-name>-spec.md`.

For an approved decomposition, provide separate lightweight child specs at:

`features/<feature-name>-spec.md`

Each child spec should contain only enough context for a later refinement session:

- purpose and business value;
- users;
- scope and boundaries;
- key scenarios;
- parent/sibling relationships;
- known requirements or constraints;
- dependencies;
- risks and open questions.

Do not invent detailed child requirements before that feature is refined.

## Boundary

Output specification content and suggested paths only. File creation, GitHub issues, tickets, domain-model updates, and other publishing actions belong to separate skills or requests.
