Skills are organized into bucket folders under `skills/`:

- `engineering/` — daily code work
- `productivity/` — daily non-code workflow tools
- `misc/` — kept around but rarely used, not promoted
- `personal/` — tied to my own setup, not promoted

Reusable skill changes must be made and reviewed against the **Canonical Skill Sources** under `skills/**`. Do not edit or review `.agents/skills/**` directly; those entries are generated **Harness Skill Copies** refreshed from the canonical sources by `npm run sync-skills`.

Every skill in `engineering/` or `productivity/` (the **promoted** buckets) must have a reference in the top-level `README.md`. Skills in `misc/`, `personal/`, `in-progress/`, and `deprecated/` must not appear in either.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

Each bucket folder has a `README.md` that lists every skill in the bucket with a one-line description, with the skill name linked to its `SKILL.md`. The promoted buckets' `README.md`s and the top-level `README.md` group entries into **User-invoked** and **Model-invoked**; non-promoted bucket `README.md`s (`misc/`, `personal/`) use a flat list.

Every `SKILL.md` is either user-invoked (`policy.allow_implicit_invocation: false` in `agents/openai.yaml`, visible in Kilo's picker, and protected from implicit invocation) or model-invoked (model- or user-reachable). User-invoked skills omit `disable-model-invocation: true` for Kilo picker compatibility and may explicitly compose skills through `/skill` instructions. See [.agents/invocation.md](./.agents/invocation.md).

To (re)link every skill into the local harness skill directories (`~/.claude/skills`, `~/.agents/skills`), run `scripts/link-skills.sh`. Each entry is a symlink into this repo, so a `git pull` keeps installed skills current; re-run the script after adding, removing, or renaming a skill.

## Agent skills

### Issue tracker

Issues and PRDs for this repo live as GitHub issues. See `docs/agents/issue-tracker.md`.

### Triage labels

This repo uses the default canonical triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo: read root `CONTEXT.md` and relevant ADRs under `docs/adr/`. See `docs/agents/domain.md`.

### Coding standards

No coding standards document is currently defined for this AI skill repository. See `docs/agents/coding-standards.md`.

### Code verification

Verification is recorded in `package.json` script `test` and run with `npm test`. See `docs/agents/code-verification.md`.
