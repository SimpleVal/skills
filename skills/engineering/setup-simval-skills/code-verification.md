# Code Verification Doc Reference

Repository verification guidance used by skills that modify and verify code.

## Reference

<replace with the selected repository-local path, URL, or prose reference>

## Failure Handling

Run the applicable verification checks.

For each failure:

1. determine whether it relates to the current changes;
2. make one reasonable fix attempt when safe;
3. rerun the affected check;
4. mark it blocked if the same failure remains unchanged.

If a resolved failure returns, treat it as a regression and allow one new fix attempt.

Continue with independent checks after a failure becomes blocked.

After affected checks pass, run the complete required verification set. Finish when it passes or all remaining failures are blocked.

## Notes

<replace with user-provided notes, or `None`>
