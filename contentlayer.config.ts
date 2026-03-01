import { defineDocumentType, makeSource } from "contentlayer/source-files";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.{md,mdx}",
  contentType: "mdx",
  fields: {
    id: { type: "string", required: true },
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    // `slug` is computed from the file path when not provided in frontmatter.
    // `content` is stored as a frontmatter block (the file body is empty), so we
    // keep it here so Contentlayer recognizes it as part of the schema.
    content: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    author: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    image: { type: "string", required: false },
    coverImage: { type: "string", required: false },
    featured: { type: "boolean", required: true },
    publishedAt: { type: "date", required: true },
    updatedAt: { type: "date", required: true }
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
        if (post.slug) return post.slug;
        if (raw.flattenedPath) return raw.flattenedPath.split("/").pop();
        if (raw.sourceFileName) return raw.sourceFileName.replace(/\.[^.]+$/, "");
        return "";
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
    slug: { type: "string", required: true },
    tech: { type: "list", of: { type: "string" }, required: true },
    link: { type: "string", required: true },
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
        if ((project as any).slug) return (project as any).slug;
        if (raw.flattenedPath) return raw.flattenedPath.split("/").pop();
        if (raw.sourceFileName) return raw.sourceFileName.replace(/\.[^.]+$/, "");
        return "";
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
