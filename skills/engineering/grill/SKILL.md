---
name: grill
description: Resolve human-owned requirement decisions. Use when intent, terminology, behavior, policy, constraints, relationships, or trade-offs are unclear. Ask for decisions, not cheaply verifiable facts.
---

# Grill

Mutate Simval state only through the `simval` CLI.

## Focus the Decision

Load only relevant context:

- `simval node get <node-id>`
- `simval context show`
- `simval knowledge context <node-id>`

Find the smallest unresolved decision that blocks useful progress. Resolve prerequisite decisions before dependent ones.

Stop when the current objective is clear enough to continue.

## Ask for Decisions, Not Facts

Ask the human about:

- desired behavior;
- product intent or policy;
- terminology;
- ownership;
- lifecycle;
- cardinality;
- constraints;
- trade-offs;
- acceptable failure behavior.

Do not ask the human to investigate facts that can be cheaply verified from code, tests, documentation, standards, or other reliable sources.

Use `research` for factual uncertainty and `prototype` for empirical uncertainty.

## Challenge Ambiguity

Probe material ambiguity such as:

- conflicting terms;
- vague language;
- unclear ownership or cardinality;
- missing lifecycle rules;
- contradictory constraints;
- hidden relationship assumptions;
- undefined failure behavior.

Use a small concrete scenario when abstract discussion remains unclear.

For user-facing behavior, probe actors, journeys, permissions, failure/recovery states, and business rules only when they could change the contract.

Treat claims about current system behavior as hypotheses when they can reasonably be verified.

## Recommend When Useful

When evidence supports a clear engineering recommendation:

1. state the relevant trade-off briefly;
2. recommend an option;
3. ask the human to accept, reject, or refine it.

Do not hide genuine product or policy choices inside an engineering recommendation.

## Persist Outcomes

Record material results with `simval knowledge`.

Use:

- `decision` for accepted decisions;
- `constraint` for local constraints;
- `open_question` for unresolved issues;
- `finding` for useful observations.

Supersede or resolve stale entries when needed.

Promote only accepted cross-cutting terms, constraints, or relationships into project context.

Do not silently change an approved source contract.

## Finish

Report the decisions settled, remaining blocking questions, and whether any factual or empirical uncertainty should move to `research` or `prototype`.