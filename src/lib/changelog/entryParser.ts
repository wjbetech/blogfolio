import fs from "fs";
import path from "path";
import { changelogSchema } from "./schema";
import type { ChangelogEntry } from "@/app/types/changelog";

export function getChangelogEntries(): ChangelogEntry[] {
  const changelogPath = path.join(process.cwd(), "changelog", "entries.json");

  try {
    const fileContent = fs.readFileSync(changelogPath, "utf-8");
    const parsedData = JSON.parse(fileContent);
    const validatedData = changelogSchema.parse(parsedData);
    // sort by newest entries first
    return validatedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error(error, "Failed to read or parse changelog entries.");
    return [];
  }
}
