---
name: setup-simval-skills
description: Configure this repo for the engineering skills — set up its issue tracker, triage label vocabulary, and domain doc layout. Run once before first use of the other engineering skills.
---

# Setup Simval Skills

Inspect the repository, collect and confirm each configuration choice, summarize the complete configuration for final approval, then apply it.

Do not skip a configuration question because the repository suggests an answer. Use repository evidence to recommend an answer, but let the user confirm or choose another option.

## 1. Inspect

Inspect:

- `git remote -v` and `.git/config`;
- root `AGENTS.md` and `CLAUDE.md`;
- root `CONTEXT.md`;
- `docs/adr/` and `src/*/docs/adr/`;
- `.scratch/`;
- whether the `triage` skill is installed;
- existing repository documentation relevant to coding standards and verification;
- existing files under `docs/agents/`.

Use the inspection to identify:

- existing configuration;
- missing configuration;
- likely recommendations;
- conflicts with configuration already present.

Do not assume that missing or inferred configuration is approved.

## 2. Configure

Ask about each applicable section below in order.

For each section:

1. briefly state the relevant repository evidence;
2. provide a recommended answer;
3. ask the user to confirm the recommendation or select another answer;
4. record the confirmed choice.

Ask one section at a time. Do not modify files during this step.

### Issue tracker

Determine the likely tracker from the repository remote and existing documentation.

Recommend one of:

- **GitHub** — use GitHub Issues through `gh`;
- **GitLab** — use GitLab Issues through `glab`;
- **Local markdown** — store issues under `.scratch/<feature>/`;
- **Other** — use a user-provided workflow.

Ask the user to confirm the recommendation or choose another tracker.

When **Other** is selected, collect enough detail to describe how skills should read, create, and update issues.

For GitHub and GitLab, leave the template's PR request-surface setting disabled unless the user explicitly enables it.

The confirmed result will be written to `docs/agents/issue-tracker.md`.

### Triage labels

Skip this section when the `triage` skill is not installed.

Otherwise inspect existing label configuration and recommend keeping or changing these defaults:

- `needs-triage`
- `needs-info`
- `ready-for-agent`
- `ready-for-human`
- `wontfix`

Ask the user to confirm the recommended mapping or provide overrides.

The confirmed mapping will be written to `docs/agents/triage-labels.md`.

### Domain docs

Inspect existing domain documentation, including:

- `CONTEXT.md`;
- `docs/adr/`;
- `src/*/docs/adr/`;
- existing `docs/agents/domain.md`.

Recommend the domain-document layout that best matches the repository.

Ask the user to confirm the recommendation or choose another layout.

The confirmed result will be written to `docs/agents/domain.md`.

### Coding standards

Inspect repository-local sources such as:

- `AGENTS.md`;
- `CLAUDE.md`;
- `CONTRIBUTING.md`;
- development documentation;
- dedicated coding-standard files;
- existing `docs/agents/coding-standards.md`.

Recommend the most authoritative applicable source.

Ask:

> What should the Coding Standards Doc Reference point to?

Let the user confirm the recommendation or provide a repository-local path, URL, or prose reference with optional short notes.

The confirmed result will be written to `docs/agents/coding-standards.md`.

### Code verification

Inspect documentation and configuration for:

- tests;
- linting;
- formatting;
- type checks;
- builds;
- release or deployment verification;
- existing `docs/agents/code-verification.md`.

Recommend the most authoritative applicable source.

Ask:

> What should the Code Verification Doc Reference point to?

Let the user confirm the recommendation or provide a repository-local path, URL, or prose reference with optional short notes.

The confirmed result will be written to `docs/agents/code-verification.md`.

Do not put absolute repository paths in reusable skill text. Preserve user-provided repository-local paths, URLs, and prose references as configuration data.

## 3. Confirm

After every applicable section has been resolved, show a concise configuration summary containing:

- selected issue tracker and workflow;
- selected triage-label mapping, when applicable;
- selected domain-document layout;
- selected coding-standards reference;
- selected code-verification reference;
- root instruction file that will be updated;
- configuration files that will be created or changed.

Clearly identify any choice that replaces or conflicts with existing configuration.

Do not show:

- draft file contents;
- template contents;
- the proposed `## Agent skills` block;
- configuration-file previews.

Ask the user for final confirmation before modifying any file.

If the user changes a choice, update the summary and obtain final confirmation again.

## 4. Apply

Apply changes only after the user confirms the configuration summary.

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

Write the confirmed configuration using these templates:

- `issue-tracker-github.md`;
- `issue-tracker-gitlab.md`;
- `issue-tracker-local.md`;
- `triage-labels.md`, when applicable;
- `domain.md`;
- `coding-standards.md`;
- `code-verification.md`.

For another issue tracker, create `docs/agents/issue-tracker.md` from the confirmed user-provided workflow.

Preserve unrelated existing content. Update existing configuration files in place when practical.

## 5. Finish

Report:

- the instruction file updated;
- configuration files created or changed;
- which skills consume each file;
- any configuration that was preserved unchanged;
- any missing or unresolved configuration.

Do not repeat the full configuration-file contents unless the user requests them.

Mention that users may edit `docs/agents/*.md` directly. Re-run this skill only when the repository configuration needs to be rebuilt or substantially changed.
