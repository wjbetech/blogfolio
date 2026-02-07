import { run } from "@contentlayer/cli";

const args = process.argv.slice(2);
process.argv = ["node", "contentlayer", "build", ...args];

try {
  await run();
} catch (err) {
  if (err && typeof err === "object" && err.code === "ERR_INVALID_ARG_TYPE") {
    process.exit(0);
  }
  throw err;
}
