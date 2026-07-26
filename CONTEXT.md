# Simval Skills

This context defines the language for the engineering skill workflows in this repository.

## Language

**Code Reviewer Agent**:
A named agent responsible for assessing implementation changes against review prompts. It may be used for multiple review axes while preserving each axis as a separate review task.
_Avoid_: Review bot, reviewer model

**Review Axis**:
An independent perspective used to review a change, such as standards conformance or spec conformance. Review axes stay separate so one kind of failure does not mask another.
_Avoid_: Review category, review type

**Coding Standards Doc Reference**:
A repository-local setup record that points skills to the human-provided documentation for how code should be written.
_Avoid_: Standards file, style guide path

**Code Verification Doc Reference**:
A repository-local setup record that points skills to the human-provided documentation for how completed implementation work should be verified.
_Avoid_: Test instructions, verification file

**Skill Configuration Docs**:
Repository-local documents that record setup choices consumed by reusable skills.
_Avoid_: Skill settings, generated docs

**Implementer Orchestrator**:
The skill role that coordinates implementation, verification, review, feedback evaluation, and final commit behavior.
_Avoid_: Implement agent, coder

**Implementation Cycle**:
One pass through implementation, verification, and a single code review attempt.
_Avoid_: Review loop, fix pass

**Contested Feedback**:
Code review feedback that the implementer orchestrator explicitly does not accept as valid or appropriate.
_Avoid_: Disagreed feedback, rejected review item
