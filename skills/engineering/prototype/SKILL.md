---
name: prototype
description: Resolve one Simval uncertainty through an empirical prototype. Use when feasibility, runtime behavior, integration, interaction, visual design, or another question is better answered by observation than discussion or documentation.
---

# Prototype

Mutate Simval state only through the `simval` CLI.

## Bound the Experiment

Load only relevant context:

- `simval node get <node-id>`
- `simval context show`
- `simval knowledge context <node-id>`

State one observable uncertainty to test.

Prefer:

> Can X produce Y under condition Z?

over broad exploration.

Use `research` when reliable evidence can answer the question without experimentation.

Use `grill` when the uncertainty is a human-owned decision.

## Build Only What the Question Needs

Minimize scope, not necessarily fidelity.

Use the lowest effort that can answer the question. For visual or interaction design, a high-fidelity prototype is appropriate when realistic layout, content, states, transitions, or interaction quality materially affect the answer.

Avoid production hardening, unrelated refactoring, generalized abstractions, and work that does not improve the experiment.

Define what evidence would distinguish the relevant outcomes before evaluating the prototype.

## Observe and Preserve Evidence

Capture only evidence that materially supports the conclusion.

Store useful outputs with:

`simval artifact add <node-id> <file-path> --kind <kind>`

Reference relevant artifact IDs from the prototype result.

For design prototypes, preserve only useful evidence such as the prototype, screenshots, recordings, or evaluation results.

Do not archive unnecessary experiment state.

## Persist the Result

Record:

`simval knowledge add <node-id> --kind prototype_result [--evidence <ref> ...] --text-stdin`

State:

- what was tested;
- what was observed;
- what conclusion is supported;
- important limitations or remaining uncertainty.

Do not generalize beyond the experiment.

Promote only accepted cross-cutting semantics into project context.

Do not silently change an approved source contract.

## Keep Prototype Separate From Production

Prototype code or design is evidence, not production implementation.

Remove disposable experiment changes when practical.

If the result should become production behavior or design, implement it later through `implement` against the bound delivery spec.

## Finish

Report the uncertainty tested, observed result, conclusion, material evidence, and any required `grill`, `research`, or follow-up prototype.