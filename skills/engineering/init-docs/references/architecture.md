# Architecture Documentation Guidance

Document the system structure and the architectural constraints developers need to preserve.

## Default location

Recommend:

`docs/development/architecture.md`

For large multi-service or multi-app projects, recommend scoped architecture documents when that improves progressive disclosure.

Example:

```text
docs/development/
├── architecture.md
├── services/
│   └── <service>/architecture.md
└── clients/
    └── <client>/architecture.md
```

Keep the top-level document focused on shared structure and relationships.

## Adaptive template

```md
# Architecture

## Overview

<Major system responsibilities and architectural shape.>

## Structure

<Key applications, services, modules, or layers and their responsibilities.>

## Boundaries

<Important dependency, ownership, or layering boundaries.>

## Key flows

<Important data or control flows, when useful.>

## Integrations

<Important external systems or interfaces, when useful.>

## Constraints

<Architectural rules developers must preserve.>
```

Include only sections that add useful information.

## Guidance

- Document objective structure directly when repository evidence is clear.
- Confirm inferred responsibilities, boundaries, ownership, or architectural intent with the user.
- Prefer responsibilities and relationships over directory listings.
- Split by service or application only when scopes have materially different architecture.
- Do not include coding standards, setup instructions, or verification commands.
- Avoid speculative rationale and implementation detail that does not help architectural decisions.
