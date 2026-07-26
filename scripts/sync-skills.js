const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const BUCKETS = ["engineering", "productivity"];
const SRC = path.join(ROOT, "skills");
const DST = path.join(ROOT, ".agents", "skills");

async function copyDir(src, dst) {
  await fs.mkdir(dst, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, dstPath);
    } else {
      await fs.copyFile(srcPath, dstPath);
    }
  }
}

async function main() {
  await fs.rm(DST, { recursive: true, force: true });

  for (const bucket of BUCKETS) {
    const bucketDir = path.join(SRC, bucket);
    let entries;
    try {
      entries = await fs.readdir(bucketDir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const src = path.join(bucketDir, entry.name);
      const dst = path.join(DST, entry.name);
      await copyDir(src, dst);
    }
  }

  console.log("Skills synced to .agents/skills");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
