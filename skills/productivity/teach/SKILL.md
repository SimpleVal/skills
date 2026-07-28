---
name: teach
description: Teach the user a new skill or concept, within this workspace.
argument-hint: "What would you like to learn about?"
---

The user has asked you to teach them something. This is a stateful request: they intend to learn the topic over multiple sessions.

## Initialize the Teaching Workspace

Create a dedicated topic folder under the current directory before creating any teaching files.

### Choose the folder name

Derive the base folder name from the skill, knowledge area, or topic the user wants to learn:

1. Convert the topic to lowercase.
2. Replace each sequence of characters other than letters or digits with one hyphen.
3. Remove leading and trailing hyphens.
4. Use `topic` if normalization produces an empty name.

Examples:

- `Python Basics` becomes `python-basics`.
- `System Design / APIs` becomes `system-design-apis`.
- `C++` becomes `c`.
- `!!!` becomes `topic`.

Do not rename or reuse an existing folder.

If the base folder already exists, append the next available two-digit suffix, beginning with `-02`:

- `python`
- `python-02`
- `python-03`

Check candidates sequentially and select the first name that does not already exist. Continue beyond two digits when necessary, such as `python-100`.

### Establish the workspace root

Create the selected folder under the current directory and treat it as the teaching workspace root for the rest of the request.

Keep track of this path as `WORKSPACE_ROOT`. This name is conceptual; it does not need to be exported as an environment variable.

Create these directories inside it when absent:

- `reference/`
- `learning-records/`
- `lessons/`
- `assets/`

Create the required workspace files as they become relevant. Do not create teaching files in the parent directory.

After initialization, resolve every workspace path in this skill relative to `WORKSPACE_ROOT`. For example:

- `MISSION.md` means `<WORKSPACE_ROOT>/MISSION.md`.
- `lessons/0001-example.html` means `<WORKSPACE_ROOT>/lessons/0001-example.html`.
- `assets/styles.css` means `<WORKSPACE_ROOT>/assets/styles.css`.

Files bundled with this skill, including the format documents referenced below, remain relative to the skill directory rather than `WORKSPACE_ROOT`.

Do not create another topic folder during the same teaching request. Continue using the established `WORKSPACE_ROOT`.

## Teaching Workspace

The state of the user's learning is captured inside `WORKSPACE_ROOT`:

- `MISSION.md`: Captures the reason the user is interested in the topic. Use it to ground all teaching. Follow the bundled `MISSION-FORMAT.md`.
- `reference/*.html`: Compressed learning materials such as cheat sheets, algorithms, syntax guides, yoga poses, and glossaries. They should be attractive, printable, and designed for quick reference.
- `RESOURCES.md`: Lists resources used to ground the teaching or help the user acquire knowledge and wisdom. Follow the bundled `RESOURCES-FORMAT.md`.
- `learning-records/*.md`: Captures non-obvious lessons and key insights that may need revision or influence future sessions. These records are loosely equivalent to architectural decision records and help determine the user's zone of proximal development. Name them `0001-<dash-case-name>.md`, incrementing the number for each record. Follow the bundled `LEARNING-RECORD-FORMAT.md`.
- `lessons/*.html`: Contains lessons. A lesson is one self-contained HTML document teaching a tightly scoped subject tied to the mission.
- `assets/*`: Contains reusable components shared across lessons. See [Assets](#assets).
- `NOTES.md`: Stores user preferences and working notes.

## Philosophy

Deep learning requires three things:

- **Knowledge**, acquired from high-quality, trustworthy resources
- **Skills**, developed through relevant interactive lessons based on that knowledge
- **Wisdom**, gained through interaction with learners and practitioners

Until `RESOURCES.md` is well populated, prioritize finding high-quality resources that help the user acquire knowledge. Do not rely on unsupported parametric knowledge.

The balance between knowledge and skills depends on the topic. Theoretical physics may be primarily knowledge-based, while yoga may be primarily skills-based.

### Fluency vs. Storage Strength

Distinguish between:

- **Fluency strength**: immediate retrieval of knowledge
- **Storage strength**: long-term retention of knowledge

Fluency can create an illusion of mastery. Storage strength is the goal. Design lessons that use desirable difficulty to improve retention:

- Retrieval practice: recalling information from memory
- Spacing: distributing practice over time
- Interleaving: mixing related topics during skills practice

## Lessons

A lesson is the primary unit through which knowledge and skills reach the user.

Save each lesson as one self-contained HTML file under `lessons/`. Name lessons `0001-<dash-case-name>.html`, incrementing the number each time.

Lessons should be visually attractive, with clean and readable typography and layout. Aim for a restrained, information-dense style similar to Tufte.

Keep each lesson short and quickly completable. Working memory is limited. Each lesson should provide one tangible win that builds toward the mission and fits the user's zone of proximal development.

When the environment supports it, open the completed lesson for the user with an appropriate local command.

Each lesson should:

- Link to relevant lessons and reference documents with HTML anchors.
- Recommend one primary high-quality, trustworthy source to read or watch.
- Remind the user that they can ask the agent follow-up questions.

## Assets

Build lessons from reusable components stored under `assets/`. Components may include stylesheets, quiz widgets, simulators, diagram helpers, or anything another lesson could reuse.

Reuse components by default. Before creating a lesson:

1. Inspect the existing contents of `assets/`.
2. Reuse suitable components.
3. Add a new component when the lesson needs reusable behavior or presentation.
4. Link to the component instead of inlining code that future lessons would duplicate.

The first reusable component should normally be a shared stylesheet linked by every lesson. This gives the workspace a consistent course design rather than a collection of unrelated pages.

Grow the component library only when a component has current value and credible reuse potential.

## The Mission

Tie every lesson to the user's mission: the reason they want to learn the topic.

If the mission is unclear or `MISSION.md` is missing or incomplete, first ask why the user wants to learn the topic.

Without a clear mission:

- Knowledge acquisition lacks a practical goal.
- Lessons may become too abstract.
- There is no reliable basis for selecting the next lesson.

A mission may change as the user develops knowledge and skills. Before changing it:

1. Confirm the change with the user.
2. Update `MISSION.md`.
3. Add a learning record explaining the change.

## Zone of Proximal Development

Each lesson should challenge the user just enough.

The user may request a specific subject. Otherwise, determine an appropriate next lesson by:

1. Reading `MISSION.md`.
2. Reading the existing learning records.
3. Identifying the most relevant next skill.
4. Selecting a lesson that fits the user's current ability.

## Knowledge

Design each lesson around a skill the user will acquire. Include only the knowledge needed to develop that skill.

Teach the necessary knowledge first, then have the user practise through an interactive feedback loop.

Gather knowledge from trustworthy resources and track those resources in `RESOURCES.md`. Support factual claims in lessons with links to external sources.

When acquiring knowledge, unnecessary difficulty consumes working memory needed for understanding. Keep explanations direct and manageable.

## Skills

Knowledge supports acquisition; practice creates durability and flexibility.

Use productive difficulty to make knowledge stick. Effortful retrieval builds storage strength.

Teach skills through interactive lessons such as:

- Quizzes and lightweight in-browser tasks
- Guided real-world procedures, such as yoga sequences
- Exercises with immediate or automatic feedback

Every skills exercise should have a feedback loop. Keep that loop as tight as practical.

For multiple-choice quizzes, make answer choices the same number of words and, where practical, the same number of characters. Do not reveal the answer through formatting or unequal option length.

## Acquiring Wisdom

Wisdom develops through real-world interaction and testing outside the teaching workspace.

When a question requires practitioner judgment:

1. Give the best grounded answer available.
2. Explain relevant uncertainty.
3. Recommend an appropriate community where the user can test their understanding.

A community may be:

- An online forum
- A moderated discussion group
- A professional or enthusiast community
- A local class
- A local interest group

Prefer reputable communities. Respect the user's preference if they do not want to join one.

## Reference Documents

Create reference documents alongside lessons when the material will remain useful.

Lessons may not be revisited frequently, but reference documents should capture the durable, compressed essence of what was taught.

Topics suited to reference documents include:

- Programming syntax and code snippets
- Algorithms and process flowcharts
- Yoga poses and sequences
- Fitness exercises and routines
- Domain terminology and glossaries

Create a glossary when the topic has specialized terminology. Once established, use its terminology consistently throughout later lessons.

## `NOTES.md`

Record durable teaching preferences and relevant working notes in `NOTES.md`.

Examples include:

- Preferred teaching style
- Accessibility requirements
- Desired lesson duration
- Familiar tools or terminology
- Topics the user finds difficult
- Subjects the user wants to avoid

Do not use `NOTES.md` as a substitute for learning records or the mission.
