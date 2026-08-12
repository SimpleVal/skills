# AGENTS.md Guidance

Use `AGENTS.md` as the lean entry point for AI-assisted development.

It should contain:

- a brief project domain, scope, and purpose summary;
- links to relevant project documentation;
- a short indication of when each document should be read.

## Adaptive template

```md
# Project Guidance

## Project

<Brief domain, scope, and purpose summary.>

## Development documentation

Read only the documentation relevant to the current task:

- [Architecture](path) — Read when changing system structure, boundaries, integrations, or major flows.
- [Coding standards](path) — Read when implementing or reviewing code governed by project conventions.
- [Code verification](path) — Read when validating changes or choosing required checks.

## Additional documentation

<Only important additional references, each with a concise "read when" description.>
```

Include only sections and references that are useful.

## Guidance

- Keep `AGENTS.md` concise; detailed guidance belongs in referenced documents.
- Use references to route agents to task-relevant context instead of duplicating content.
- Do not instruct agents to load all referenced documents up front.
- Preserve useful project-level AI guidance already present.
- Keep document references current when related documentation is created, moved, or updated.
