import { existsSync, readFileSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";

const commitMessage = process.env.COMMIT_MESSAGE || "";
const commitSha = process.env.COMMIT_SHA || "";
const actor = process.env.GITHUB_ACTOR || "";

const filePath = join(process.cwd(), "docs", "changelog", "entries.json");

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
// - "v1.2.3" (at start of message)
const releaseRegex = /(?:chore\(release\):|release:)\s*(v?\d+\.\d+\.\d+(?:[-+][0-9A-Za-z-.]+)?)/i;
const tagStartRegex = /^v?\d+\.\d+\.\d+(?:[-+][0-9A-Za-z-.]+)?/;

let version = null;
const releaseMatch = commitMessage.match(releaseRegex);
if (releaseMatch) {
  version = releaseMatch[1];
} else if (tagStartRegex.test(commitMessage.trim())) {
  const m = commitMessage.trim().match(tagStartRegex);
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

const entry = {
  sha: commitSha,
  message: commitMessage,
  author: actor,
  date: new Date().toISOString()
};

if (version) entry.version = version;

entries.unshift(entry);

const dir = dirname(filePath);
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

writeFileSync(filePath, JSON.stringify(entries, null, 2) + "\n", "utf8");
console.log("Changelog updated with", commitSha);
