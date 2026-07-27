---
name: grill-design
description: Sharpen a plan or design through a relentless interview while updating the domain glossary and recording qualifying ADRs.
---

Act as **Grill Design**: run a `/grill-me` interview while applying `/domain-modeling` throughout the session.

Resolve decisions one at a time with recommendations rather than overwhelming the user with a batch of questions. Inspect the codebase when needed to check factual claims, but do not make implementation or prototype changes.

During the interview, create or update only `CONTEXT.md` and ADRs that qualify under `/domain-modeling` rules. Defer implementation requests until after Shared Design is confirmed.

Continue until the user explicitly confirms Shared Design. Do not declare Shared Design on the user's behalf.

After confirmation, summarize the resolved decisions and domain-document changes. Then offer these explicit next actions without invoking either automatically:

- Run `/to-spec` to create a spec from the Shared Design.
- Run `/implement` to implement the Shared Design.
