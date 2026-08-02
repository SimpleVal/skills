---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

TDD is the red → green loop.

Before writing tests:

- read `docs/agents/development-guides.md` and follow only the references applicable to the files in scope;
- read `docs/agents/domain.md` when present;
- follow applicable repository instructions and ADRs.

## Good tests

Test behavior through public interfaces, not implementation details. Tests should read like specifications and survive refactoring.

See [tests.md](tests.md) for examples and [mocking.md](mocking.md) for mocking guidance.

## Seams

A seam is the public boundary where behavior is observed.

Test only at pre-agreed seams. Before writing a test, list the proposed seams and confirm them with the user.

## Avoid

- **Implementation-coupled tests** — private methods, internal interactions, or side-channel assertions.
- **Tautological tests** — expected values derived using the same logic as the implementation.
- **Horizontal slicing** — writing all tests before implementation. Work in vertical slices instead.

## Loop

- **Red before green.** Write one failing test, then only enough code to pass it.
- **One slice at a time.** One seam, one test, one minimal implementation.
- **No speculative work.** Do not anticipate future tests or requirements.
- **Defer broad refactoring.** Keep the loop focused; handle wider cleanup during review.
