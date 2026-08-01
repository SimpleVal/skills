# Code Verification

Identify the affected source scopes, then read only their applicable references.

Do not load every document listed here.

## References

### <Scope>

- Source: `<repository-local path or pattern>`
- Reference: `<canonical verification document>`
- Notes: `<scope notes, or None>`

## Process

Run the applicable affected checks.

For each failure:

1. determine whether it relates to the current changes;
2. make one reasonable fix attempt when safe;
3. rerun the affected check;
4. mark it blocked if the same failure remains unchanged.

If a resolved failure returns, treat it as a regression and allow one new fix attempt.

Continue with independent checks after a failure becomes blocked.

After affected checks pass, run the complete required verification set. Finish when it passes or all remaining failures are blocked.
