---
name: grill-design
description: Sharpen a plan or design through a relentless interview while updating the domain glossary and recording qualifying ADRs.
---

Run /grill-me while applying /domain-modeling.

Inspect the codebase when needed to verify facts, constraints, and existing behavior. Do not modify source code or any other files while questions remain.

During the interview:

- Ask the questions required by /grill-me and /domain-modeling.
- Do not recap or summarize decisions between questions.
- Do not update CONTEXT.md, ADRs, specifications, or implementation files.
- Do not begin implementation or invoke another skill.
- Continue until there are no unresolved questions and both sides have a shared understanding of the design.

Then present the complete Shared Design once and ask the user to confirm it.

Only after the user confirms the final Shared Design:

1. Summarize the resolved decisions once.
2. Apply the documentation updates required by /domain-modeling, limited to CONTEXT.md and ADRs that qualify under its rules.
3. Offer exactly these next actions:
   - Run /to-spec to create a Shared Design spec.
   - Run /implement to implement the confirmed Shared Design.

Wait for the user to choose. Do not invoke either action automatically.
