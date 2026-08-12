const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, "skills");
const PACKAGE_FILE = path.join(ROOT, "package.json");
const DISPLAY_NAME_EXCEPTIONS = new Map([["tdd", "TDD"]]);
const PACKAGE_VERSION = JSON.parse(read(PACKAGE_FILE)).version;

assert(
  typeof PACKAGE_VERSION === "string" && PACKAGE_VERSION.trim(),
  "package.json must contain a non-empty version string",
);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function relative(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, "/");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function listSkillDirectories() {
  return fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .flatMap((bucket) => {
      if (!bucket.isDirectory()) {
        return [];
      }

      const bucketDirectory = path.join(SKILLS_DIR, bucket.name);
      return fs
        .readdirSync(bucketDirectory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(bucketDirectory, entry.name));
    });
}

function parseFrontmatter(skillFile, content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert(match, `${relative(skillFile)} must start with YAML frontmatter`);

  return parseSimpleYaml(match[1], relative(skillFile));
}

function parseSimpleYaml(content, source) {
  const result = {};
  const stack = [{ indent: -1, value: result }];

  for (const [index, rawLine] of content.split(/\r?\n/).entries()) {
    if (!rawLine.trim() || rawLine.trimStart().startsWith("#")) {
      continue;
    }

    const match = rawLine.match(/^(\s*)([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    assert(
      match,
      `${source} has invalid YAML on line ${index + 1}: ${rawLine}`,
    );

    const indent = match[1].length;
    const key = match[2];
    const rawValue = match[3] ?? "";

    while (stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].value;
    if (rawValue === "") {
      parent[key] = {};
      stack.push({ indent, value: parent[key] });
    } else {
      parent[key] = parseScalar(rawValue);
    }
  }

  return result;
}

function parseScalar(value) {
  const trimmed = value.trim();
  const quoted = trimmed.match(/^["']([\s\S]*)["']$/);
  if (quoted) {
    return quoted[1];
  }

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  return trimmed;
}

function expectedDisplayName(skillId) {
  if (DISPLAY_NAME_EXCEPTIONS.has(skillId)) {
    return DISPLAY_NAME_EXCEPTIONS.get(skillId);
  }

  return skillId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function verifySkill(skillDirectory) {
  const skillId = path.basename(skillDirectory);
  const skillFile = path.join(skillDirectory, "SKILL.md");
  assert(
    fs.existsSync(skillFile),
    `${relative(skillDirectory)} must contain SKILL.md`,
  );

  const skillContent = read(skillFile);
  const frontmatter = parseFrontmatter(skillFile, skillContent);
  assert(
    frontmatter.name === skillId,
    `${relative(skillFile)} name must be ${skillId}`,
  );
  assert(
    frontmatter.metadata && frontmatter.metadata.version === PACKAGE_VERSION,
    `${relative(skillFile)} metadata.version must be ${JSON.stringify(PACKAGE_VERSION)}`,
  );

  const agentFile = path.join(skillDirectory, "agents", "openai.yaml");
  assert(
    fs.existsSync(agentFile),
    `${relative(skillDirectory)} must contain agents/openai.yaml`,
  );

  const agentMetadata = parseSimpleYaml(read(agentFile), relative(agentFile));
  const displayName =
    agentMetadata.interface && agentMetadata.interface.display_name;
  const expectedName = expectedDisplayName(skillId);
  assert(
    displayName === expectedName,
    `${relative(agentFile)} display_name must be ${JSON.stringify(expectedName)}`,
  );
}

for (const skillDirectory of listSkillDirectories()) {
  verifySkill(skillDirectory);
}

console.log("Skill docs verified");
