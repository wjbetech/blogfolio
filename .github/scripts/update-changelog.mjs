import { existsSync, readFileSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";

const commitMessage = (process.env.COMMIT_MESSAGE || "").trim();
const commitSha = process.env.COMMIT_SHA || "";

const filePath = join(process.cwd(), "changelog", "entries.json");

let entries = [];
if (existsSync(filePath)) {
  try {
    const raw = readFileSync(filePath, "utf8").trim();
    entries = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(entries)) entries = [];
  } catch (error) {
    console.error(error, "Failed to parse existing entries.json, starting fresh");
    entries = [];
  }
}

if (!commitSha) {
  console.error("No COMMIT_SHA provided; aborting");
  process.exit(1);
}

if (entries.some((e) => e.sha === commitSha)) {
  console.log("Entry already exists for", commitSha);
  process.exit(0);
}

// Detect release version in commit message.
// Accept patterns like:
// - "chore(release): v1.2.3"
// - "release: v1.2.3"
// - "version: v1.2.3"
// - "v1.2.3" (at start of message)
const releaseRegex = /(?:chore\(release\):|release:|version:)\s*(v?\d+\.\d+\.\d+(?:[-+][0-9A-Za-z-.]+)?)/i;
const tagStartRegex = /^v?\d+\.\d+\.\d+(?:[-+][0-9A-Za-z-.]+)?/;

let version = null;
const releaseMatch = commitMessage.match(releaseRegex);
if (releaseMatch) {
  version = releaseMatch[1];
} else if (tagStartRegex.test(commitMessage)) {
  const m = commitMessage.match(tagStartRegex);
  if (m) version = m[0];
}

// Semver validation regex (basic): matches X.Y.Z with optional pre-release/build
const semverValidate = /^v?(\d+)\.(\d+)\.(\d+)(?:-[0-9A-Za-z-.]+)?(?:\+[0-9A-Za-z-.]+)?$/;

if (version) {
  if (!semverValidate.test(version)) {
    console.error("Release commit indicates a version but it's not valid semver:", version);
    process.exit(1);
  }
  // normalize to no leading v
  version = version.replace(/^v/, "");
  console.log("Detected release version:", version);
}

const latestVersion = entries.length > 0 ? entries[0].version : null;
if (!version) {
  if (!latestVersion) {
    console.error("No version found in commit message and no existing changelog entries to infer version.");
    process.exit(1);
  }
  version = latestVersion;
}

const allowedCategories = new Set(["Feature", "Fix", "Bug", "Improvement", "Chore", "Removed", "Test", "Style"]);

const segments = commitMessage
  .split("|")
  .map((segment) => segment.trim())
  .filter(Boolean);

const changes = [];
for (const segment of segments) {
  if (releaseRegex.test(segment) || tagStartRegex.test(segment)) {
    continue;
  }

  const separatorIndex = segment.indexOf(":");
  if (separatorIndex === -1) continue;

  const rawCategory = segment.slice(0, separatorIndex).trim();
  const description = segment.slice(separatorIndex + 1).trim().replace(/\n+/g, " ");
  const normalizedCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();

  if (!allowedCategories.has(normalizedCategory)) continue;
  if (!description) continue;

  changes.push({
    category: normalizedCategory,
    description
  });
}

if (changes.length === 0) {
  changes.push({
    category: "Chore",
    description: (commitMessage || "Update").replace(/\n+/g, " ")
  });
}

/**
 * @type {{date: string; version: string; changes: {category: string; description: string}[]}}
 */
const entry = {
  date: new Date().toISOString().slice(0, 10),
  version,
  changes
};

entries.unshift(entry);

const dir = dirname(filePath);
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

writeFileSync(filePath, JSON.stringify(entries, null, 2) + "\n", "utf8");
console.log("Changelog updated with", commitSha);
