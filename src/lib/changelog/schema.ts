import z from "zod";

const MAX_DESC_LENGTH = 200;

export const changelogEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in ISO 8601 format (YYYY-MM-DD)"),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Version must follow semantic versioning [semver] (MAJOR.MINOR.PATCH)"),
  changes: z
    .array(
      z.object({
        category: z.enum(["Feature", "Bug", "Chore", "Removed", "Test", "Style"]),
        description: z
          .string()
          .min(10, "Description must be at least 10 characters long")
          .max(MAX_DESC_LENGTH, `Description must be at most ${MAX_DESC_LENGTH} characters long`)
          .refine((desc) => !desc.includes("\n"), "Description must be a single line")
      })
    )
    .min(1, "There must be at least one change entry")
});

export const changelogSchema = z.array(changelogEntrySchema);
