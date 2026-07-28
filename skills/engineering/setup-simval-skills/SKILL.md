---
name: setup-simval-skills
description: Configure this repo for the engineering skills — set up its issue tracker, triage label vocabulary, and domain doc layout. Run once before first use of the other engineering skills.
---

# Setup Simval Skills

Configure the repository guidance used by the engineering skills:

- issue tracker;
- triage labels, when the `triage` skill is installed;
- domain-document layout;
- coding-standards reference;
- code-verification reference.

Explore the repository, present the proposed configuration, obtain approval, then write it.

## 1. Explore

Inspect:

- `git remote -v` and `.git/config`;
- root `AGENTS.md` and `CLAUDE.md`;
- root `CONTEXT.md`;
- `docs/adr/` and `src/*/docs/adr/`;
- `.scratch/`;
- whether the `triage` skill is installed;
- existing repository documentation relevant to coding standards and verification.

Do not assume missing configuration.

## 2. Configure

Present what exists and what is missing. Ask about each applicable section in order.

### Issue tracker

Recommend the tracker indicated by the repository remote:

- **GitHub** — use GitHub Issues through `gh`;
- **GitLab** — use GitLab Issues through `glab`;
- **Local markdown** — store issues under `.scratch/<feature>/`;
- **Other** — record the user-provided workflow.

Write the result to `docs/agents/issue-tracker.md`.

For GitHub and GitLab, leave the template's PR request-surface setting disabled unless the user explicitly changes it later.

### Triage labels

Skip this section when the `triage` skill is not installed.

Otherwise ask whether to keep these defaults:

- `needs-triage`
- `needs-info`
- `ready-for-agent`
- `ready-for-human`
- `wontfix`

Collect overrides only when requested. Write the mapping to `docs/agents/triage-labels.md`.

### Coding standards

Ask:

> What should the Coding Standards Doc Reference point to?

Recommend an existing repository-local source such as `AGENTS.md`, `CONTRIBUTING.md`, or a coding-standards document.

Write the selected path, URL, or prose reference and any short notes to `docs/agents/coding-standards.md`.

### Code verification

Ask separately:

> What should the Code Verification Doc Reference point to?

Recommend existing documentation for tests, linting, type checks, builds, or release verification.

Write the selected path, URL, or prose reference and any short notes to `docs/agents/code-verification.md`.

Do not put absolute repository paths in reusable skill text. Preserve user-provided repository-local paths, URLs, and prose references as configuration data.

## 3. Confirm

Before writing, show drafts of:

- the `## Agent skills` block;
- `docs/agents/issue-tracker.md`;
- `docs/agents/domain.md`;
- `docs/agents/coding-standards.md`;
- `docs/agents/code-verification.md`;
- `docs/agents/triage-labels.md`, when applicable.

Allow the user to revise the drafts.

## 4. Write

Use the existing root instruction file:

1. edit `AGENTS.md` when it exists;
2. otherwise edit `CLAUDE.md` when it exists;
3. when neither exists, ask which one to create.

Do not create one when the other already exists.

Update an existing `## Agent skills` section in place. Do not duplicate it or overwrite surrounding user content.

Use this block, omitting Triage labels when the `triage` skill is not installed:

```markdown
## Agent skills

### Issue tracker

Skills that read or update issues must follow `docs/agents/issue-tracker.md`.

### Triage labels

The `triage` skill must follow `docs/agents/triage-labels.md`.

### Domain docs

Skills that require domain context or architectural decisions must follow
`docs/agents/domain.md`.

### Coding standards

The `implement`, `code-review`, and `address-review` skills must read and follow
`docs/agents/coding-standards.md` before evaluating or editing code.

### Code verification

The `implement` and `address-review` skills must read and follow
`docs/agents/code-verification.md` when verifying or fixing code changes.
```

Write the configuration files from these templates:

- `issue-tracker-github.md`
- `issue-tracker-gitlab.md`
- `issue-tracker-local.md`
- `triage-labels.md`, when applicable
- `domain.md`
- `coding-standards.md`
- `code-verification.md`

For another issue tracker, create `docs/agents/issue-tracker.md` from the user-provided workflow.

## 5. Finish

Report:

- the instruction file updated;
- configuration files created or changed;
- which skills consume each file; and
- any missing or unresolved configuration.

Mention that users may edit `docs/agents/*.md` directly. Re-run this skill only when the repository configuration needs to be rebuilt or substantially changed.
