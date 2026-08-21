import type { Post } from "contentlayer/generated";

function normalizeBodyRaw(raw?: string) {
  return (raw ?? "").replace(/\r\n/g, "\n").trim();
}

function getParagraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((segment) => segment.trim())
    .filter(Boolean);
}

export function getPostSnippet(post: Post, maxLength = 160) {
  const paragraphs = getParagraphs(normalizeBodyRaw(post.body?.raw));
  const base = (post.excerpt ?? paragraphs[0] ?? "").trim();
  if (!base) return "";
  if (base.length <= maxLength) return base;
  return `${base.slice(0, maxLength).trim()}…`;
}
