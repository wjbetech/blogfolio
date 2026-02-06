import z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(7),
  slug: z.string().min(7),
  summary: z.string().min(16).optional().nullable(),
  content: z.string().min(20).optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
  tags: z.array(z.string())
});
