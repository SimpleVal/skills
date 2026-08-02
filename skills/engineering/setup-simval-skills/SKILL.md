---
name: setup-simval-skills
description: Configure this repository for the Simval engineering skills.
---

# Setup Simval Skills

Inspect the repository, confirm each configuration choice, summarize the final configuration, then apply it.

Use repository evidence to recommend answers, but never treat an inferred choice as approved.

## 1. Inspect

Inspect:

- `git remote -v` and `.git/config`;
- root `AGENTS.md` or `CLAUDE.md`;
- `CONTEXT.md`, `docs/adr/`, and `src/*/docs/adr/`;
- `.scratch/`;
- installed skills;
- existing development and verification documentation;
- existing files under `docs/agents/`.

Identify existing configuration, missing configuration, likely recommendations, and conflicts.

## 2. Configure

Ask one section at a time. For each section:

1. state the relevant evidence briefly;
2. recommend an answer;
3. ask the user to confirm or choose another option;
4. record the confirmed choice.

Do not modify files yet.

### Repository documentation

Inspect project scopes, development guides, verification documents, and their existing references.

Recommend running `/lint-docs` when canonical documentation is missing, stale, incomplete, or poorly mapped.

Ask whether to run it.

When accepted:

1. run `/lint-docs` for the repository;
2. resolve any decisions it raises;
3. resume setup using the resulting canonical documents and routing recommendations.

When declined, continue with the existing documentation.

### Issue tracker

Infer the likely tracker from the repository and recommend one of:

- **GitHub** — GitHub Issues through `gh`;
- **GitLab** — GitLab Issues through `glab`;
- **Local markdown** — `.scratch/<feature>/`;
- **Other** — user-provided workflow.

For **Other**, collect enough detail for skills to read, create, and update issues.

For GitHub and GitLab, keep PR or MR request-surface support disabled unless explicitly enabled.

Write the confirmed result to `docs/agents/issue-tracker.md`.

### Triage labels

Skip when the `triage` skill is not installed.

Otherwise confirm the mapping for:

- `needs-triage`
- `needs-info`
- `ready-for-agent`
- `ready-for-human`
- `wontfix`

Write it to `docs/agents/triage-labels.md`.

### Domain docs

Inspect `CONTEXT.md`, ADR locations, and `docs/agents/domain.md`.

Recommend and confirm the domain-document layout.

Write it to `docs/agents/domain.md`.

### Development guides

Inspect source scopes and canonical guides produced or discovered above.

Recommend scoped mappings containing:

- source path or pattern;
- canonical guide path;
- dependent guides to read, when required;
- optional scope notes.

The router must state that agents identify the affected scope first and read only matching references.

Write the confirmed map to `docs/agents/development-guides.md`.

### Code verification

Inspect tests, linting, formatting, type checks, builds, deployment checks, scripts, and existing verification docs.

Recommend scoped mappings containing:

- source path or pattern;
- canonical verification document;
- optional scope notes.

Keep the shared verification process in this reference file. Keep executable commands in the canonical verification documents.

Write the confirmed result to `docs/agents/code-verification.md`.

Do not put absolute repository paths in reusable skill text.

## 3. Confirm

Show a concise summary containing:

- issue tracker and workflow;
- triage-label mapping, when applicable;
- domain-document layout;
- development-guide mappings;
- verification mappings;
- root instruction file to update;
- files to create or change;
- conflicts with existing configuration.

Do not show draft file contents or template previews.

Ask for final confirmation. If any choice changes, update the summary and confirm again.

## 4. Apply

Apply changes only after final confirmation.

Use the existing root instruction file:

1. `AGENTS.md` when present;
2. otherwise `CLAUDE.md` when present;
3. otherwise ask which one to create.

Update an existing `## Agent skills` section in place. Preserve unrelated content.

Use this block, omitting sections that do not apply:

```markdown
## Agent skills

### Issue tracker

Skills that read or update issues must follow `docs/agents/issue-tracker.md`.

### Triage labels

The `triage` skill must follow `docs/agents/triage-labels.md`.

### Domain docs

Skills requiring domain context or architectural decisions must follow
`docs/agents/domain.md`.

### Development guides

Skills that design, plan, implement, review, or modify code must use
`docs/agents/development-guides.md` as a scope router.

Read only the guides mapped to the affected source scopes.

### Code verification

Skills that verify or fix code must use `docs/agents/code-verification.md` as a
scope router and read only references mapped to the affected source scopes.
```

Use these templates:

- `issue-tracker-github.md`
- `issue-tracker-gitlab.md`
- `issue-tracker-local.md`
- `triage-labels.md`, when applicable
- `domain.md`
- `development-guides.md`
- `code-verification.md`

For another issue tracker, create `docs/agents/issue-tracker.md` from the confirmed workflow.

Update existing files in place when practical.

## 5. Finish

Report:

- instruction file updated;
- configuration files created or changed;
- skills consuming each file;
- preserved configuration;
- unresolved configuration.

Do not repeat full file contents unless requested.
