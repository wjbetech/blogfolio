import fs from "fs";
import path from "path";
import { changelogSchema } from "./schema";
import type { ChangelogEntry } from "@/app/types/changelog";

export function getChangelogEntries(): ChangelogEntry[] {
  return getChangelogSlice(0, Number.MAX_SAFE_INTEGER);
}

export function getChangelogSlice(offset = 0, limit = 5): ChangelogEntry[] {
  const changelogPath = path.join(process.cwd(), "changelog", "entries.json");

  try {
    const fileContent = fs.readFileSync(changelogPath, "utf-8");
    const parsedData = JSON.parse(fileContent);

    // Log the actual data for debugging
    console.log("Parsed changelog data:", JSON.stringify(parsedData, null, 2));

    const result = changelogSchema.safeParse(parsedData);

    if (!result.success) {
      console.error("Validation failed:");
      result.error.issues.forEach((err) => {
        console.error(`Path: ${err.path.join(".")}`);
        console.error(`Error: ${err.message}`);
        // Log the actual value at that path
        const actualValue = err.path.reduce((obj: any, key) => obj?.[key], parsedData);
        console.error(`Received value:`, actualValue);
      });
      return [];
    }

    const validatedData = result.data;
    // sort by newest entries first
    const sorted = validatedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sorted.slice(offset, offset + limit);
  } catch (error) {
    console.error("Error loading changelog:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return [];
  }
}
