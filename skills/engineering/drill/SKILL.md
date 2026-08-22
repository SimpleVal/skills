---
name: drill
description: Turn active-release Simval scope into one concrete delivery. Use to resolve delivery-specific uncertainty, choose the boundary, create or revise the spec, obtain explicit human approval, and prepare the delivery.
---

# Drill

Mutate Simval state only through the `simval` CLI.

## Select Scope

Use the supplied node, or inspect:

`simval task next --actor human`

Handle only:

`drill_down`

Load only relevant state:

- `simval node get <node-id>`
- `simval node subtree <node-id>` when descendants matter
- `simval context show`
- `simval knowledge context <node-id>`

The suggested node is an entry point, not a forced delivery boundary.

## Resolve Delivery Uncertainty

Use:

- `grill` for human-owned decisions;
- `research` for verifiable facts;
- `prototype` for empirical, interaction, or design uncertainty.

Invoke the corresponding skill when supported; otherwise apply the technique directly.

Persist material outcomes before finalizing the delivery.

## Choose the Boundary

Choose the largest vertical slice that can coherently be:

- understood;
- specified;
- implemented;
- verified;
- independently reviewed;
- merged.

If the scope remains too broad or mixes independently deliverable concerns, decompose it first.

Respect the active release and existing delivery boundaries.

Treat dependencies inside the selected delivery as implementation-order constraints. Unfinished dependencies outside it are external blockers.

## Create or Revise the Spec

Each node owns at most one logical spec.

Create one when absent:

`simval spec create <node-id> --content-stdin`

Otherwise revise it:

`simval spec update <spec-id> --content-stdin`

Include only material contract information:

- goal and scope;
- relevant decisions and constraints;
- approved-source references;
- applicable user/domain flows;
- acceptance criteria;
- verification plan;
- acceptance-criterion-to-test traceability;
- relevant artifact IDs;
- exclusions.

Use stable acceptance-criterion IDs such as `AC-1`.

Prefer observable behavior over internal implementation detail unless the architecture itself is contractual.

Choose only the verification layers needed to establish each criterion.

## Preserve Source Authority

When the delivery comes from an approved specification:

- keep that source authoritative;
- preserve relevant section traceability in knowledge/evidence;
- do not silently redesign it.

Escalate material contradiction, missing decisions, or technical impossibility.

## Obtain Approval

Before preparing the delivery, show the human:

- selected boundary;
- effective unfinished scope;
- important exclusions;
- internal dependencies;
- external blockers;
- spec summary;
- acceptance criteria;
- verification approach;
- remaining uncertainty.

Obtain explicit approval of the boundary and contract.

Do not infer approval from prior discovery.

## Prepare

After approval:

`simval delivery prepare <node-id>`

Do not invent branch or PR references.

If a prepared delivery must be reshaped before implementation starts:

`simval delivery cancel <node-id>`

Then revise and prepare again after approval.

## Finish

Run:

`simval validate`

Report the prepared node, bound spec revision, scope, blockers, acceptance criteria, verification approach, and any remaining prerequisite.

If approval or clarity is missing, do not prepare the delivery.