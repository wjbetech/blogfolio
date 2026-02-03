#!/usr/bin/env node
import { spawnSync } from "child_process";

/**
 * @param {string} cmd
 * @param {readonly string[]} args
 */
function run(cmd, args) {
  return spawnSync(cmd, args, { encoding: "utf8", shell: true });
}

console.log("Fetching all remotes and pruning...");
let res = run("git", ["fetch", "--all", "--prune"]);
if (res.status !== 0) {
  console.error(res.stderr || res.stdout || "git fetch failed");
  process.exit(res.status || 1);
}

console.log("Listing remote branches...");
res = run("git", ["branch", "-r"]);
if (res.status !== 0) {
  console.error(res.stderr || res.stdout || "git branch -r failed");
  process.exit(res.status || 1);
}

const lines = (res.stdout || "")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);
const prefix = "origin/";
const branches = [];
for (const line of lines) {
  if (line.includes("->")) continue;
  if (!line.startsWith(prefix)) continue;
  const name = line.slice(prefix.length);
  if (name === "HEAD") continue;
  branches.push(name);
}

branches.sort();
if (branches.length === 0) {
  console.log("No origin/* remote branches found.");
  process.exit(0);
}

for (const name of branches) {
  const check = run("git", ["show-ref", "--verify", `refs/heads/${name}`]);
  if (check.status === 0) {
    console.log(`Local branch '${name}' exists; skipping`);
    continue;
  }

  console.log(`Creating local branch '${name}' tracking origin/${name}...`);
  const create = run("git", ["branch", "--track", name, `origin/${name}`]);
  if (create.status === 0) {
    console.log(`Created '${name}'`);
  } else {
    console.error(`Failed to create '${name}': ${create.stderr || create.stdout}`);
  }
}

console.log("Done");
