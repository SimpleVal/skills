const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function assertIncludes(file, text) {
  const content = read(file);
  if (!content.includes(text)) {
    throw new Error(`${file} must include: ${text}`);
  }
}

function assertNotIncludes(file, text) {
  const content = read(file);
  if (content.includes(text)) {
    throw new Error(`${file} must not include: ${text}`);
  }
}

const setupSkill = "skills/engineering/setup-simval-skills/SKILL.md";
const implementSkill = "skills/engineering/implement/SKILL.md";
const codeReviewSkill = "skills/engineering/code-review/SKILL.md";
const codeReviewAgent = "skills/engineering/code-review/agents/openai.yaml";
const codingStandardsTemplate = "skills/engineering/setup-simval-skills/coding-standards.md";
const codeVerificationTemplate = "skills/engineering/setup-simval-skills/code-verification.md";
const codeReviewerAgentTemplate = "skills/engineering/setup-simval-skills/code-reviewer-agent.md";

assertIncludes(setupSkill, "Coding Standards Doc Reference");
assertIncludes(setupSkill, "Code Verification Doc Reference");
assertIncludes(setupSkill, "docs/agents/coding-standards.md");
assertIncludes(setupSkill, "docs/agents/code-verification.md");
assertIncludes(setupSkill, "`.kilo/`");
assertIncludes(setupSkill, "OpenAI/GPT-5.6 Sol - Medium");
assertNotIncludes(setupSkill, "C:\\Users\\khait\\me\\dev\\simval-skills");

assertIncludes(implementSkill, "Implementer Orchestrator");
assertIncludes(implementSkill, "docs/agents/coding-standards.md");
assertIncludes(implementSkill, "docs/agents/code-verification.md");
assertIncludes(implementSkill, "up to three verification attempts");
assertIncludes(implementSkill, "one Code Review attempt per Implementation Cycle");
assertIncludes(implementSkill, "accepted feedback");
assertIncludes(implementSkill, "Contested Feedback");
assertIncludes(implementSkill, "three Implementation Cycles");
assertIncludes(implementSkill, "Do not commit");

assertIncludes(codeReviewSkill, "Code Reviewer Agent");
assertIncludes(codeReviewSkill, "docs/agents/code-reviewer-agent.md");
assertIncludes(codeReviewSkill, "docs/agents/coding-standards.md");
assertIncludes(codeReviewSkill, "docs/agents/code-verification.md");
assertIncludes(codeReviewSkill, "Use the Code Reviewer Agent");
assertIncludes(codeReviewSkill, "## Standards");
assertIncludes(codeReviewSkill, "## Spec");

assertIncludes(codeReviewAgent, "display_name: \"Code Reviewer Agent\"");

assertIncludes(codingStandardsTemplate, "# Coding Standards Doc Reference");
assertIncludes(codeVerificationTemplate, "# Code Verification Doc Reference");
assertIncludes(codeReviewerAgentTemplate, "# Code Reviewer Agent");
assertIncludes(codeReviewerAgentTemplate, "OpenAI/GPT-5.6 Sol - Medium");

console.log("Skill docs verified");
