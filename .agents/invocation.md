# Model-invoked vs user-invoked

Every `SKILL.md` in this repo is a skill. The one axis that splits them is **invocation** — who can reach it:

- **User-invoked** — reachable only by deliberate user selection or by an explicit `/skill` instruction from another user-invoked workflow. Set `policy.allow_implicit_invocation: false` in `agents/openai.yaml` and omit `disable-model-invocation: true` from frontmatter so Kilo keeps the skill visible in the user-facing picker. The `description` is **human-facing**: a one-line summary read by a person browsing slash-commands. Strip trigger lists ("Use when the user says…").
- **Model-invoked** — reachable by **model or user**. The default: omit `disable-model-invocation` and the `policy` block from `agents/openai.yaml`. The `description` is **model-facing** and keeps rich trigger phrasing ("Use when the user wants…, mentions…, asks for…") so auto-invocation fires. The test for whether a skill should stay model-invoked: _could the model usefully reach for this autonomously?_ (Reuse is the reason to extract a skill, not the test.)

User-invoked skills are protected from implicit model selection, but may explicitly compose other skills through `/skill` instructions. This is an intentional Kilo compatibility tradeoff recorded in ADR-0002: keeping picker visibility matters more than identical metadata across harnesses.

Every skill also carries an `agents/openai.yaml` beside its `SKILL.md`. It holds picker metadata — `interface.display_name` and `interface.short_description` — and, for user-invoked skills, `policy.allow_implicit_invocation: false`.

Bucket `README.md`s and the top-level `README.md` group entries into **User-invoked** and **Model-invoked**.

## Dependencies between them

Dependencies are expressed as **`/skill`-style prose invocation** ("Run the `/grill-me` skill"), not deep `../other-skill/FILE.md` cross-references. Shared reference docs live inside the skill that owns them; other skills reach that material by invoking the skill, not by linking across folders.

## Passive vs active domain work

Merely _reading_ `CONTEXT.md` for vocabulary is a one-line prose pointer, not the `domain-modeling` skill. Only the active build/sharpen discipline (challenge terms, edge-case scenarios, write ADRs, update `CONTEXT.md` inline) is `domain-modeling`.
