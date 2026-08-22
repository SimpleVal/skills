---
name: research
description: Answer a bounded factual question for Simval discovery or delivery formation. Use when repository behavior, documentation, standards, APIs, constraints, or other verifiable facts are uncertain.
---

# Research

Mutate Simval state only through the `simval` CLI.

## Bound the Question

Load only relevant context:

- `simval node get <node-id>`
- `simval context show`
- `simval knowledge context <node-id>`

Reduce broad investigation to the smallest factual question that can affect the current requirement or decision.

Avoid open-ended research without a concrete consequence.

## Prefer Strong Evidence

Use the strongest practical source:

1. current repository code and tests;
2. first-party documentation;
3. standards or specifications;
4. other primary sources;
5. reputable secondary sources when stronger evidence is unavailable.

For repository behavior, inspect the repository rather than relying on generic documentation.

Verify material claims about the current system instead of repeating assumptions.

For code evidence, prefer immutable references such as:

`git:<commit>:<path>[:line-range]`

## Separate Fact From Choice

Distinguish:

- supported facts;
- uncertainty or conflicting evidence;
- implications for the requirement.

Do not turn an engineering or product choice into a factual conclusion.

Use `grill` when evidence exposes a human-owned decision.

Use `prototype` when the answer requires empirical observation.

When authoritative sources conflict, explain the conflict and preserve unresolved uncertainty rather than manufacturing certainty.

## Persist the Result

Record the concise conclusion with:

`simval knowledge add <node-id> --kind research_result [--evidence <ref> ...] --text-stdin`

Include only useful provenance and limitations.

Add separate findings, constraints, or open questions only when they materially improve downstream work.

Promote only accepted cross-cutting semantics into project context.

Do not silently reinterpret an approved source contract.

## Finish

Report the question, conclusion, strongest evidence, material uncertainty, and any required `grill` or `prototype` follow-up.