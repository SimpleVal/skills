# Code Verification Guidance

Document how developers and AI agents should validate code changes using the project's actual tooling.

## Default location

Recommend:

`docs/development/code-verification.md`

For large multi-scope projects, include scope-specific verification only when commands or required checks differ materially.

## Adaptive template

````md
# Code Verification

Run the checks relevant to the files you changed.

## Quick verification

<Smallest useful verification workflow for normal changes.>

## Lint

```sh
<actual command>
```
````

## Type check

```sh
<actual command>
```

## Tests

```sh
<actual command>
```

## Build

```sh
<actual command>
```

## Full verification

```sh
<complete verification workflow>
```

## Scope-specific verification

<Commands for individual apps, packages, or services when useful.>

```

Include only sections supported by actual project tooling.

## Guidance

- Use commands found in repository configuration or confirmed by the user.
- Do not invent commands based on ecosystem conventions.
- Prefer focused verification for normal changes when the project supports it.
- Document full-project checks separately when they are materially more expensive.
- Confirm the intended workflow when multiple valid verification commands exist and no preferred path is clear.
- Keep coding standards and CI implementation details in their owning documents.
```
