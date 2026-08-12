const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, "skills");
const PACKAGE_FILE = path.join(ROOT, "package.json");

async function listSkillFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listSkillFiles(entryPath)));
    } else if (entry.isFile() && entry.name === "SKILL.md") {
      files.push(entryPath);
    }
  }

  return files;
}

function setVersionMetadata(content, version, skillFile) {
  const frontmatter = content.match(/^---(\r?\n)([\s\S]*?)\r?\n---/);
  if (!frontmatter) {
    throw new Error(`${skillFile} must start with YAML frontmatter`);
  }

  const newline = frontmatter[1];
  const lines = frontmatter[2].split(/\r?\n/);
  const metadataIndex = lines.findIndex((line) => /^metadata:\s*$/.test(line));
  const versionLine = `  version: ${JSON.stringify(version)}`;

  if (metadataIndex === -1) {
    lines.push("metadata:", versionLine);
  } else {
    let blockEnd = metadataIndex + 1;
    while (
      blockEnd < lines.length &&
      (!lines[blockEnd].trim() || /^\s/.test(lines[blockEnd]))
    ) {
      blockEnd += 1;
    }

    const existingVersionIndex = lines.findIndex(
      (line, index) =>
        index > metadataIndex &&
        index < blockEnd &&
        /^  version:\s*.*$/.test(line),
    );

    if (existingVersionIndex === -1) {
      lines.splice(metadataIndex + 1, 0, versionLine);
    } else {
      lines[existingVersionIndex] = versionLine;
    }
  }

  const updatedFrontmatter = `---${newline}${lines.join(newline)}${newline}---`;
  return content.replace(frontmatter[0], updatedFrontmatter);
}

async function main() {
  const { version } = JSON.parse(await fs.readFile(PACKAGE_FILE, "utf8"));
  if (typeof version !== "string" || !version.trim()) {
    throw new Error("package.json must contain a non-empty version string");
  }

  const skillFiles = await listSkillFiles(SKILLS_DIR);
  for (const skillFile of skillFiles) {
    const content = await fs.readFile(skillFile, "utf8");
    const updated = setVersionMetadata(content, version, skillFile);
    if (updated !== content) {
      await fs.writeFile(skillFile, updated);
    }
  }

  console.log(`Set version metadata to ${version} in ${skillFiles.length} skills`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
