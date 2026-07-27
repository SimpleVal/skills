const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, "skills");
const DISPLAY_NAME_EXCEPTIONS = new Map([["tdd", "TDD"]]);

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
  return fs.readdirSync(SKILLS_DIR, { withFileTypes: true }).flatMap((bucket) => {
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
    assert(match, `${source} has invalid YAML on line ${index + 1}: ${rawLine}`);

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

function collectSkillDocReferences(content) {
  const references = new Set();

  for (const match of content.matchAll(/\[[^\]\r\n]+\]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (isLocalDocumentPath(target)) {
      references.add(stripFragment(target));
    }
  }

  for (const match of content.matchAll(/`([^`\r\n]+)`/g)) {
    const target = match[1].trim();
    if (isLocalDocumentPath(target)) {
      references.add(stripFragment(target));
    }
  }

  return [...references];
}

function stripFragment(target) {
  return target.split("#")[0];
}

function isLocalDocumentPath(target) {
  const withoutFragment = stripFragment(target.trim());

  if (!withoutFragment || target.startsWith("#")) {
    return false;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(withoutFragment)) {
    return false;
  }

  if (/\s/.test(withoutFragment)) {
    return false;
  }

  if (/[*?\[\]{}<>]/.test(withoutFragment)) {
    return false;
  }

  if (!/\.(md|markdown)$/i.test(withoutFragment)) {
    return false;
  }

  if (!/[\\/]/.test(withoutFragment)) {
    return false;
  }

  return true;
}

function resolveReference(skillDirectory, reference) {
  const normalized = reference.replace(/\\/g, "/");
  const fromSkillDirectory = path.resolve(skillDirectory, normalized);
  if (fs.existsSync(fromSkillDirectory)) {
    return fromSkillDirectory;
  }

  return path.resolve(ROOT, normalized);
}

function verifySkill(skillDirectory) {
  const skillId = path.basename(skillDirectory);
  const skillFile = path.join(skillDirectory, "SKILL.md");
  assert(fs.existsSync(skillFile), `${relative(skillDirectory)} must contain SKILL.md`);

  const skillContent = read(skillFile);
  const frontmatter = parseFrontmatter(skillFile, skillContent);
  assert(frontmatter.name === skillId, `${relative(skillFile)} name must be ${skillId}`);

  const agentFile = path.join(skillDirectory, "agents", "openai.yaml");
  assert(fs.existsSync(agentFile), `${relative(skillDirectory)} must contain agents/openai.yaml`);

  const agentMetadata = parseSimpleYaml(read(agentFile), relative(agentFile));
  const displayName = agentMetadata.interface && agentMetadata.interface.display_name;
  const expectedName = expectedDisplayName(skillId);
  assert(
    displayName === expectedName,
    `${relative(agentFile)} display_name must be ${JSON.stringify(expectedName)}`,
  );

  for (const reference of collectSkillDocReferences(skillContent)) {
    const resolved = resolveReference(skillDirectory, reference);
    assert(fs.existsSync(resolved), `${relative(skillFile)} references missing document: ${reference}`);
  }
}

for (const skillDirectory of listSkillDirectories()) {
  verifySkill(skillDirectory);
}

console.log("Skill docs verified");
