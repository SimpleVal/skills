---
name: init-docs
description: Initialize or maintain lean project documentation for AI-assisted development, including AGENTS.md, README.md, architecture, coding standards, and code verification guidance.
metadata:
  version: "1.0.0"
---

# Init Docs

Initialize or maintain project documentation using progressive disclosure.

## Principles

- Inspect before asking or writing.
- Treat repository contents as evidence, not proof of project intent.
- Use objective repository facts directly when unambiguous.
- Confirm material decisions with the user before documenting them.
- When asking, give the evidence-based recommendation first and allow another choice or free text.
- If code/configuration conflicts with existing documentation, explain the conflict and ask which reflects the intended state.
- Preserve useful existing content. Make selective updates; do not regenerate unrelated material.
- Keep each fact or rule in one owning document and link to it elsewhere.
- Prefer concise, task-oriented references over duplicated content.
- Omit empty, speculative, or irrelevant sections.
- Never invent commands, architecture decisions, coding policies, project intent, or usage examples.

Use this flow for material content:

`evidence -> recommendation -> user decision -> documentation`

## Workflow

### 1. Discover existing documentation

Inspect `AGENTS.md` first when it exists.

Use its document references to identify existing project guidance and likely owners of information relevant to the user's request.

Then inspect only what is useful, such as:

- `README.md` and referenced documentation
- manifests and workspace definitions
- build, lint, formatting, type-check, and test configuration
- dependency and package structure
- application, service, and library boundaries
- representative entry points and code
- existing architecture or development guidance

Do not load the entire repository or every referenced document without need.

### 2. Determine scope

Identify whether the project is:

- small/single-scope;
- a monorepo;
- composed of multiple substantial applications;
- composed of multiple services or independently owned components.

For large multi-scope projects, proactively recommend scoped architecture or coding-standard documents when doing so prevents irrelevant guidance from being loaded.

Do not split documentation merely because multiple directories exist.

### 3. Resolve uncertainty

Separate discovered information into:

**Objective facts**
May be documented without confirmation when directly observable and unambiguous, for example:

- repository paths
- package/workspace names
- configured tools
- available scripts and commands
- runtime versions explicitly declared by the project

**Material decisions**
Ask the user before documenting, including:

- domain, purpose, or intended scope when not already explicit
- architectural responsibilities or intended boundaries
- coding policies and preferred patterns
- intended developer workflows
- whether an apparent convention is intentional
- interpretation of conflicting sources

Ask focused questions. Include a recommended answer based on repository evidence and explain the evidence briefly when useful.

Do not ask the user to reconfirm objective facts unless they conflict with another source.

### 4. Choose document locations

Use `docs/development/` as the default recommendation.

Ask independently for:

1. architecture and coding-standard document locations;
2. code-verification document location.

For each decision, present three sensible project-specific options:

1. recommended option;
2. reasonable alternative;
3. another reasonable alternative;

and allow free text.

For a normal project, prefer:

- `docs/development/architecture.md`
- `docs/development/coding-standards.md`
- `docs/development/code-verification.md`

For a very small project, architecture and coding standards may be combined if that materially reduces unnecessary documentation. Recommend this rather than assuming it.

### 5. Create or update documents

Load only the reference needed for each artifact:

- `AGENTS.md`: `references/agents.md`
- `README.md`: `references/readme.md`
- architecture: `references/architecture.md`
- coding standards: `references/coding-standards.md`
- code verification: `references/code-verification.md`

Do not load all reference files by default.

When updating an existing file:

1. preserve useful manual content and compatible structure;
2. identify the smallest changes required;
3. update only affected content;
4. avoid unrelated rewriting or stylistic churn.

### 6. Update AGENTS.md last

After the other documentation is resolved, ensure `AGENTS.md` references the relevant project documents.

Each reference should state when an AI agent should read that document.

Do not copy detailed content from referenced documents into `AGENTS.md`.

Remove or correct stale references only when confirmed by repository evidence or the user.

### 7. Review

Before finishing, check:

- referenced paths exist or are the locations explicitly chosen for creation;
- documents do not materially duplicate each other;
- `AGENTS.md` remains lean;
- `README.md` remains human-oriented;
- architecture describes structure rather than coding style;
- coding standards do not restate automated tool configuration unnecessarily;
- verification commands match repository tooling;
- scoped documents are introduced only where useful;
- no unconfirmed material assumptions were documented.

Summarize proposed creations or changes and ask the user to create/update the files at the agreed locations when direct workspace modification is not appropriate.
