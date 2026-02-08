import { defineDocumentType, makeSource } from "contentlayer/source-files";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.{md,mdx}",
  contentType: "mdx",
  fields: {
    id: { type: "string", required: true },
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    content: { type: "string", required: true },
    author: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    image: { type: "string", required: false },
    coverImage: { type: "string", required: false },
    featured: { type: "boolean", required: true },
    publishedAt: { type: "date", required: true },
    updatedAt: { type: "date", required: true }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${post.slug}`
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
    slug: { type: "string", required: true },
    description: { type: "string", required: true },
    tech: { type: "list", of: { type: "string" }, required: true },
    link: { type: "string", required: true },
    repo: { type: "string", required: false },
    images: { type: "list", of: { type: "string" }, required: false },
    featured: { type: "boolean", required: true },
    publishedAt: { type: "date", required: true },
    updatedAt: { type: "date", required: true }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (project) => `/portfolio/${project.slug}`
    }
  }
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Project],
  disableImportAliasWarning: true
});
