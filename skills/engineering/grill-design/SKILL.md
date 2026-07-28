---
name: grill-design
description: Sharpen a plan or design through a relentless interview while updating the domain glossary and recording qualifying ADRs.
---

Run /grill-me while applying /domain-modeling.

During the interview:

- Allow the updates required by /domain-modeling, but do not implement the design, update specifications, or invoke another skill.
- Do not recap or summarize decisions between questions.

When the design is fully resolved, present the complete Shared Design once and ask the user to confirm it.

After confirmation:

1. Summarize the resolved decisions once.
2. Offer exactly these next actions:
   - Run /to-spec to create a Shared Design spec.
   - Run /implement to implement the confirmed Shared Design.

Wait for the user to choose. Do not invoke either action automatically.
