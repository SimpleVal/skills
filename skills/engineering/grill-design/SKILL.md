---
name: grill-design
description: Sharpen a plan or design through a relentless interview while updating the domain glossary and recording qualifying ADRs.
---

Run a `/grill-me` session while applying `/domain-modeling` skill.

Inspect the codebase when needed to check factual claims, but do not make implementation or prototype changes. During the session, create or update only `CONTEXT.md` and ADRs that qualify under `/domain-modeling` rules. Defer implementation requests until there are no more questions needed to be asked.

Only after all the questions are answered and the final shared design being confirmed, summarize the resolved decisions and domain-document changes. Then offer these explicit next actions without invoking either automatically:

- Run `/to-spec` to create a spec from the Shared Design.
- Run `/implement` to implement the Shared Design.
