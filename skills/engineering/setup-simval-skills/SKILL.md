---
name: setup-simval-skills
description: Configure this repo for the engineering skills — set up its issue tracker, triage label vocabulary, and domain doc layout. Run once before first use of the other engineering skills.
---

# Setup Simval's Skills

Scaffold the per-repo configuration that the engineering skills assume:

- **Issue tracker** — where issues live (GitHub by default; local markdown is also supported out of the box)
- **Triage labels** — the strings used for the five canonical triage roles
- **Domain docs** — where `CONTEXT.md` and ADRs live, and the consumer rules for reading them
- **Coding Standards Doc Reference** — where this repo records the human-provided source for coding standards
- **Code Verification Doc Reference** — where this repo records the human-provided source for verification rules
- **Code Reviewer Agent** — optional Kilo custom-agent setup when the repository already has `.kilo/`

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `git remote -v` and `.git/config` — is this a GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root — does either exist? Is there already an `## Agent skills` section in either?
- `CONTEXT.md` at the repo root
- `docs/adr/` and any `src/*/docs/adr/` directories
- `.kilo/` — check `.kilo/` as a directory directly, not only with recursive globs (`glob(".kilo/**/*")`), because an existing `.kilo/` may contain only ignored files or no matched files. If `.kilo/` is present, Kilo Code Reviewer Agent setup may be offered; if absent, skip that setup entirely
- If `.kilo/` exists, check `.kilo/agent/code-reviewer.md` — if it exists, the user may be offered to replace it with a new one
- `.scratch/` — sign that a local-markdown issue tracker convention is already in use
- Is the `triage` skill installed? (a `triage` skill folder alongside this one, or `triage` in your available skills.) This decides whether Section B runs at all.

### 2. Present findings and ask

Summarise what's present and what's missing. Then take the sections in order — one section, one answer, then the next.

Lead each section with the recommended answer so the user can accept it in a word. Give a one-line explainer only when the choice genuinely branches; skip the section entirely when exploration already settled it (Section B when `triage` isn't installed, Section C when there's no monorepo).

**Section A — Issue tracker.**

> Explainer: The "issue tracker" is where issues live for this repo. Skills like `to-tickets`, `triage`, `to-spec`, and `qa` read from and write to it — they need to know whether to call `gh issue create`, write a markdown file under `.scratch/`, or follow some other workflow you describe. Pick the place you actually track work for this repo.

Default posture: these skills were designed for GitHub. If a `git remote` points at GitHub, propose that. If a `git remote` points at GitLab (`gitlab.com` or a self-hosted host), propose GitLab. Otherwise (or if the user prefers), offer:

- **GitHub** — issues live in the repo's GitHub Issues (uses the `gh` CLI)
- **GitLab** — issues live in the repo's GitLab Issues (uses the [`glab`](https://gitlab.com/gitlab-org/cli) CLI)
- **Local markdown** — issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without a remote)
- **Other** (Jira, Linear, etc.) — ask the user to describe the workflow in one paragraph; the skill will record it as freeform prose

Record the choice in `docs/agents/issue-tracker.md`. The GitHub and GitLab templates carry a "PRs as a request surface" flag, defaulted **off** — leave it off and don't raise it; a user who wants external PRs in the triage queue can flip the flag in the file later.

**Section B — Triage label vocabulary.** Skip this section entirely if the `triage` skill isn't installed (exploration told you) — an uninstalled skill needs no labels.

If it is installed, ask exactly one question:

> Do you want to keep the default triage labels? (recommended: **yes**)

The defaults are the five canonical roles, each label string equal to its name: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. On **yes**, write them as-is. Only if the user says no — usually because their tracker already uses other names (e.g. `bug:triage` for `needs-triage`) — collect the overrides so `triage` applies existing labels instead of creating duplicates.

**Section C — Skill Configuration Docs.** Ask these as two separate questions, even when the same source answers both:

> What should the Coding Standards Doc Reference point to? (recommended: the repo's existing `AGENTS.md`, `CONTRIBUTING.md`, or coding-standards document if one exists)

> What should the Code Verification Doc Reference point to? (recommended: the repo's existing test, typecheck, lint, or release-verification document if one exists)

Record the answers as repo-local Skill Configuration Docs:

- `docs/agents/coding-standards.md` — stores the Coding Standards Doc Reference and any short notes the user gave.
- `docs/agents/code-verification.md` — stores the Code Verification Doc Reference and any short notes the user gave.

Never hard-code this repository's absolute path, or any target repository's absolute path, into reusable skill text. Store user-provided repository-local paths, URLs, or prose references exactly as configuration data inside the target repo's `docs/agents/*.md` files.

**Section D — Kilo Code Reviewer Agent.** Run this section only when exploration found `.kilo/` in the target repo. If `.kilo/` is missing, do not mention or offer Kilo agent setup.

When `.kilo/` exists and `.kilo/agent/code-reviewer.md` does not exist, ask:

> Do you want to configure a Kilo Code Review Agent for `/code-review`? (recommended: yes)

When `.kilo/` exists and `.kilo/agent/code-reviewer.md` already exists, ask:

> A Kilo Code Reviewer Agent already exists. Do you want to replace it with a new one? (recommended: no)

If the answer for either the questions above is yes, ask for the model to pin in the Kilo agent. Recommend the current session's model, because it is the user's active model choice and avoids silently switching model families. Record the model in Kilo's `provider/model` format when known. If the user wants no pinned model, omit the `model` field from `.kilo/agent/code-reviewer.md` so Kilo uses the normal selector behavior. If the user gives a display name rather than a provider/model ID, record exactly what the user gave only if that is the format Kilo accepts in the current environment; otherwise ask once for the provider/model ID.

If yes and either no Code Review Agent file exists or the user approves replacement, prepare the draft content of `.kilo/agent/code-reviewer.md` from this skill's [code-reviewer-agent.md](./code-reviewer-agent.md) template and substitute the selected model if one was selected. Do not write the Kilo agent choice into `docs/agents/`.

### 3. Confirm and edit

Show the user a draft of:

- The `## Agent skills` block to add to whichever of `CLAUDE.md` / `AGENTS.md` is being edited (see step 4 for selection rules)
- The contents of `docs/agents/issue-tracker.md`, `docs/agents/domain.md`, `docs/agents/coding-standards.md`, `docs/agents/code-verification.md`, and `docs/agents/triage-labels.md` (the last only when `triage` is installed)
- The contents of `.kilo/agent/code-reviewer.md` only when `.kilo/` exists, the user accepts Section D, and either the file does not already exist or the user approves replacing it

Let them edit before writing.

### 4. Write

**Pick the file to edit:**

- If `AGENTS.md` exists, edit it.
- Else if `CLAUDE.md` exists, edit it.
- If neither exists, ask the user which one to create — don't pick for them.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa) — always edit the one that's already there.

If an `## Agent skills` block already exists in the chosen file, update its contents in-place rather than appending a duplicate. Don't overwrite user edits to the surrounding sections.

The block:

```markdown
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout — "single-context"]. See `docs/agents/domain.md`.

### Coding standards

[one-line summary of the Coding Standards Doc Reference]. See `docs/agents/coding-standards.md`.

### Code verification

[one-line summary of the Code Verification Doc Reference]. See `docs/agents/code-verification.md`.
```

Include the `### Triage labels` sub-block, and write `docs/agents/triage-labels.md`, only when `triage` is installed and Section B ran. When it isn't, both are omitted.

Then write the docs files using the seed templates in this skill folder as a starting point:

- [issue-tracker-github.md](./issue-tracker-github.md) — GitHub issue tracker
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md) — GitLab issue tracker
- [issue-tracker-local.md](./issue-tracker-local.md) — local-markdown issue tracker
- [triage-labels.md](./triage-labels.md) — label mapping (only if `triage` is installed)
- [domain.md](./domain.md) — domain doc consumer rules + layout
- [coding-standards.md](./coding-standards.md) — Coding Standards Doc Reference
- [code-verification.md](./code-verification.md) — Code Verification Doc Reference
- [code-reviewer-agent.md](./code-reviewer-agent.md) — template for `.kilo/agent/code-reviewer.md` (only when `.kilo/` exists, the user accepts Section D, and replacement rules allow writing it)

For "other" issue trackers, write `docs/agents/issue-tracker.md` from scratch using the user's description.

### 5. Done

Tell the user the setup is complete and which engineering skills will now read from these files. Mention they can edit `docs/agents/*.md` directly later — re-running this skill is only necessary if they want to switch issue trackers or restart from scratch.
