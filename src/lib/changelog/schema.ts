import { z } from "zod";

const MAX_DESCRIPTION_LENGTH = 280;

export const changelogEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Version must follow semver (e.g., 1.2.3)"),
  changes: z
    .array(
      z.object({
        category: z.enum(["Feature", "Fix", "Bug", "Improvement", "Chore", "Removed", "Test", "Style"]),
        description: z
          .string()
          .min(1, "Description cannot be empty")
          .max(MAX_DESCRIPTION_LENGTH, `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`)
          .refine((desc) => !desc.includes("\n"), "Description must be a single line")
      })
    )
    .min(1, "At least one change is required")
});

export const changelogSchema = z.array(changelogEntrySchema);
