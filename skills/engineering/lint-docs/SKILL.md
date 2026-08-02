---
name: lint-docs
description: Create or update repository development and verification docs from source evidence.
argument-hint: "Optional source or documentation scope"
---

# Lint Docs

Maintain canonical docs under:

- `docs/development/` — architecture and coding guidance;
- `docs/verification/` — executable verification commands.

## Route

Read `docs/agents/development-guides.md` and `docs/agents/code-verification.md` when present.

Use them only as scope routers: identify the affected source scope first, then read the matching references and declared dependencies. Do not load every referenced document unless the user requests a full audit.

When routers or mappings are missing, inspect the repository, propose scoped documents and mappings, and ask before changing `docs/agents/`.

## Templates

For each missing or substantially restructured canonical document:

- use `development-guide-canonical.md` for files under `docs/development/`;
- use `code-verification-canonical.md` for files under `docs/verification/`.

Read the applicable template before creating or restructuring the document. Preserve its intent, adapt headings to the scope, and omit irrelevant sections. Do not copy placeholder text.

## Inspect

For each selected scope, inspect its source, nearby components, configuration, tests, scripts, CI, existing docs, and relevant ADRs. Detect stale documentation in the surrounding component.

## Update

- Create or update only the selected scoped documents.
- Describe the current implementation only.
- Preserve accurate content; correct stale or contradicted claims.
- Combine architecture and coding guidance in each development guide.
- Keep verification docs limited to existing commands and essential execution context.
- Prefer pnpm scripts for frontend checks.
- Prefer repository scripts for .NET; otherwise document applicable .NET CLI commands.
- Report useful missing scripts; do not create them.
- Link instead of duplicating canonical content.
- Use concise Mermaid diagrams only when useful.
- Do not modify code, configuration, scripts, ADRs, or legacy docs unless separately requested.
- Do not create documents for absent scopes.

## Decisions

Do not invent architecture, rules, or rationale. Complete supported work, then batch unresolved questions when evidence conflicts, a pattern may be accidental, an ADR conflicts, or scope ownership is unclear.

## Finish

Check affected links, duplicated guidance, unsupported claims, documented commands, and router coverage.

Summarize created or updated docs, replaced duplication, diagram changes, missing-script recommendations, routing recommendations, and unresolved decisions.
