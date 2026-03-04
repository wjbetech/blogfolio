import { defineDocumentType, makeSource } from "contentlayer/source-files";

const dropDatePrefix = (value: string) => value.replace(/^\d{4}-\d{2}-\d{2}-/, "");

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.{md,mdx}",
  contentType: "mdx",
  fields: {
    id: { type: "string", required: true },
    title: { type: "string", required: true },
    // `slug` is computed from the file path when not provided in frontmatter.
    // `content` is the document body rather than a frontmatter field, so
    // we remove it from required fields to avoid duplication.
    excerpt: { type: "string", required: false },
    author: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    image: { type: "string", required: false },
    coverImage: { type: "string", required: false },
    featured: { type: "boolean", required: true },
    publishedAt: { type: "date", required: true },
    updatedAt: { type: "date", required: true },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => {
        // Prefer an explicit frontmatter `slug`, otherwise derive from the
        // source filename (without extension) or flattenedPath.
        // Use `_raw.flattenedPath` when available (works for nested files).
        // Fallback to the source file name.
        // @ts-ignore - contentlayer exposes _raw at runtime
        const raw = (post as any)._raw || {};
        const fallbackSlugs = [
          post.slug,
          raw.flattenedPath?.split("/").pop(),
          raw.sourceFileName?.replace(/\.[^.]+$/, "")
        ];
        const candidate = fallbackSlugs.find(Boolean);
        return candidate ? dropDatePrefix(candidate) : "";
      }
    },
    readingTime: {
      type: "number",
      resolve: (post) => {
        const bodyText = (post as any).body?.raw ?? "";
        const words = bodyText
          .split(/\s+/)
          .map((token: string) => token.trim())
          .filter(Boolean).length;
        return Math.max(1, Math.round(words / 200));
      }
    },
    url: {
      type: "string",
      resolve: (post) => `/blog/${(post as any).slug}`
    }
  }
}));

const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.md",
  contentType: "markdown",
  fields: {
    id: { type: "string", required: true },
    title: { type: "string", required: true },
    // `slug` computed from file path when not provided in frontmatter
    description: { type: "string", required: true },
    tech: { type: "list", of: { type: "string" }, required: true },
    link: { type: "string", required: true },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true
    },
    repo: { type: "string", required: false },
    images: { type: "list", of: { type: "string" }, required: false },
    featured: { type: "boolean", required: true },
    publishedAt: { type: "date", required: true },
    updatedAt: { type: "date", required: true }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (project) => {
        // @ts-ignore
        const raw = (project as any)._raw || {};
        const candidate = [
          (project as any).slug,
          raw.flattenedPath?.split("/").pop(),
          raw.sourceFileName?.replace(/\.[^.]+$/, "")
        ].find(Boolean);
        return candidate ? dropDatePrefix(candidate) : "";
      }
    },
    url: {
      type: "string",
      resolve: (project) => `/portfolio/${(project as any).slug}`
    }
  }
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Project],
  disableImportAliasWarning: true
});
