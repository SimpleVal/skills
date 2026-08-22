---
name: discover
description: Structure broad or pre-delivery Simval requirements. Use to decompose approved specs, organize requirement areas, set planning intent, add real dependencies, and identify grill, research, or prototype needs. Use drill when forming one concrete delivery.
---

# Discover

Mutate Simval state only through the `simval` CLI.

## Start

Use the supplied node, or inspect:

`simval planning suggest`

Load only relevant state:

- `simval node get <node-id>`
- `simval node subtree <node-id>` when structure matters
- `simval context show`
- `simval knowledge context <node-id>`

Avoid unrelated branches and unnecessary source material.

## Resolve Blocking Uncertainty

Use:

- `grill` for human-owned decisions;
- `research` for verifiable facts;
- `prototype` for empirical uncertainty.

Invoke the corresponding skill when supported; otherwise apply the technique directly.

Persist material outcomes before continuing.

## Decompose Approved Specifications

Treat an approved source specification as authoritative.

For large sources:

1. inspect headings and major sections first;
2. identify coherent requirement areas;
3. load detail only for the area being decomposed;
4. create 3–7 children, preferably 3–5;
5. recursively decompose areas still too broad.

Children describe requirements or behavior slices, not implementation tasks.

Use:

`simval decompose begin <node-id>`

`simval decompose add <operation-id> --title <title> --summary-stdin`

`simval decompose commit <operation-id>`

Keep summaries focused on requirement meaning. Record source-section traceability in knowledge/evidence rather than summaries.

Escalate only material contradiction, missing decisions, or technical impossibility. Do not redesign an approved contract merely because alternatives exist.

## Shape the Graph

Use grouping or movement when it makes requirement structure clearer.

Prefer vertical requirement slices.

When a broad mechanical migration cannot safely land as independent vertical slices, model an explicit sequence such as:

`expand → migrate → contract`

with genuine blocking dependencies.

Add dependencies only for real prerequisites:

`simval dependency add <node-id> <dependency-id>`

Do not use dependencies for thematic grouping or mere sequencing preference.

## Set Planning Intent

When decided, use:

`simval node set-intent <node-id> candidate|backlog`

Use `candidate` for intended upcoming work and `backlog` for intentionally deferred work.

Do not use release intent as priority metadata.

## Persist Discovery

Store local outcomes in node knowledge:

- `decision`
- `constraint`
- `open_question`
- `finding`
- `research_result`
- `prototype_result`

Supersede or resolve stale knowledge instead of contradicting it.

Promote only accepted cross-cutting terms, constraints, or relationships into project context.

## Stop

Do not create or prepare a delivery during broad discovery.

When active-release scope is sufficiently structured to form a concrete delivery, hand off to `drill`.

Run:

`simval validate`

Report material graph changes, planning intent, dependencies, persisted decisions/questions, and recommended next discovery or drill work.