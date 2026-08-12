# Coding Standards Guidance

Document project-specific implementation conventions that developers and AI agents need when writing or reviewing code.

## Default location

Recommend:

`docs/development/coding-standards.md`

For projects with materially different conventions by service, application, language, or platform, recommend scoped documents when that improves progressive disclosure.

## Adaptive template

```md
# Coding Standards

## General principles

<Project-specific implementation principles not already enforced by tooling.>

## Structure and organization

<Rules for modules, files, packages, layers, or dependency direction.>

## Naming and style

<Only conventions that need explanation beyond automated tooling.>

## Error handling

<Project-specific expectations for failures, logging, or recovery.>

## Testing

<Project-specific expectations for test coverage, scope, or placement.>

## Project-specific conventions

<Important patterns to follow or avoid.>
```

Include only sections that add useful information.

## Guidance

- Document intent that automated tooling does not fully express.
- Do not restate formatter or linter configuration unnecessarily.
- Confirm inferred conventions or policies with the user before documenting them.
- Split by scope only when conventions materially differ.
- Keep architecture, setup, and verification commands in their owning documents.
- Prefer concise rules that affect implementation decisions over generic coding advice.
