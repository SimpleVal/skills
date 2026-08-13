---
name: implement
description: "Implement a piece of work based on a confirmed Shared Design, spec, or set of tickets."
metadata:
  version: "1.1.0"
---

Implement the work described by the user in the spec or tickets.

Use /tdd where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, use /code-review to review the work.

Commit your work to the current branch.

If the implementation is related to an issue ticket, use the following commit message format:

`#{issueId} - {Short summary of the commit}`

For example:

`#123 - Add validation for user registration`