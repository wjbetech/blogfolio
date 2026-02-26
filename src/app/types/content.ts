import type { Post } from "contentlayer/generated";

export type UIArticle = Pick<Post, "id" | "slug" | "title" | "excerpt" | "publishedAt" | "tags" | "featured"> & {
  readingTime?: number;
};

export const computeReadingTime = (content?: string) => {
  const text = typeof content === "string" ? content : "";
  const words = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 200));
};

export default {};
