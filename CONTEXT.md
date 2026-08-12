# Simval Skills

This context defines the language for the engineering skill workflows in this repository.

## Language

**Code Review**:
The reusable engineering skill that reviews implementation changes against standards and spec prompts.
_Avoid_: Code Reviewer, Review Agent

**Code Reviewer Agent**:
An optional Kilo custom agent, internally named `code-reviewer`, that can execute Code Review tasks. It may be used for multiple review axes while preserving each axis as a separate review task.
_Avoid_: Code Review Agent, review bot, reviewer model

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

**Promoted Bucket**:
A skill bucket whose skills must be advertised in repository README files and grouped by invocation mode.
_Avoid_: Public bucket, published bucket

**Grill with Docs**:
The user-invoked engineering skill, internally named `grill-with-docs`, that sharpens a proposed design through a Grill Me interview while applying Domain Modeling. “Design” alone refers to the activity or its result, not the skill.
_Avoid_: Design skill, Design

**User-invoked Skill**:
A skill presented for deliberate human selection and excluded from implicit model invocation through its available harness policy. It may explicitly compose other skills.
_Avoid_: Human-only skill, non-model skill

**Shared Design**:
The explicitly confirmed understanding produced by a Grill Design session. It is valid input for either specification or direct implementation.
_Avoid_: Design notes, chat context

**Canonical Skill Source**:
The skill definition under `skills/<bucket>/<skill>/` that maintainers edit and review as the source of truth.
_Avoid_: source skill file, real skill

**Harness Skill Copy**:
A generated copy of a Canonical Skill Source under `.agents/skills/`, refreshed by `npm run sync-skills` and not edited or reviewed directly.
_Avoid_: agent skill source, copied skill

**Skill ID**:
The canonical kebab-case identifier for a skill, stored in `SKILL.md` frontmatter as `name` and matching the skill's parent folder name exactly.
_Avoid_: skill name, frontmatter display name

**Skill Display Name**:
The human-readable skill name shown by an agent harness, stored in `agents/openai.yaml` as `interface.display_name` and derived from the Skill ID with approved casing exceptions.
_Avoid_: skill ID, yaml name

**Skill Doc Reference**:
A local document reference inside `SKILL.md`, written either as a Markdown link or a backticked local file path, whose target should exist.
_Avoid_: prose path mention, external URL, heading reference
