import type { Post } from "../types/post";
import type { DocumentContentType } from "@contentlayer/source-files";

const POST_CONTENT_TYPE: DocumentContentType = "mdx";

const makeRaw = (filename: string): Post["_raw"] => ({
  sourceFilePath: `posts/${filename}`,
  sourceFileName: filename,
  sourceFileDir: "posts",
  flattenedPath: `posts/${filename.replace(/\.md$/, "")}`,
  contentType: POST_CONTENT_TYPE
});

const makeBody = (raw: string): Post["body"] => ({
  raw,
  code: raw
});

export const mockPosts: Post[] = [
  {
    _id: "posts/2026-02-01-understanding-typescript-generics.md",
    _raw: makeRaw("2026-02-01-understanding-typescript-generics.md"),
    type: "Post",
    id: "1",
    title: "Understanding TypeScript Generics",
    excerpt: "A deep dive into TypeScript generics and how they can improve your code.",
    author: "William East",
    tags: ["TypeScript", "Generics", "Programming"],
    image:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Svelte_TypeScript/03-vscode-hints-in-main-ts.png",
    coverImage: "",
    featured: true,
    publishedAt: new Date("2026-02-01").toISOString(),
    updatedAt: new Date("2026-02-01").toISOString(),
    body: makeBody(`TypeScript generics are a powerful feature that allows you to write reusable, type-safe code. They enable you to create components that work with a variety of types rather than a single one.

In this article, we'll explore:
- What generics are and why they're useful
- How to create generic functions and classes
- Common patterns and best practices
- Real-world examples

Generics provide a way to make components work with any data type and not restrict to one data type. They provide a way to create reusable code components that work with a variety of data types instead of a single one.

By using generics, you can:
1. Write more flexible and reusable code
2. Catch type errors at compile time
3. Improve code maintainability
4. Create type-safe APIs

Let's dive into some practical examples and see how generics can transform your TypeScript code.`),
    slug: "understanding-typescript-generics",
    url: "/blog/understanding-typescript-generics"
  },
  {
    _id: "posts/2026-01-28-building-a-nextjs-application.md",
    _raw: makeRaw("2026-01-28-building-a-nextjs-application.md"),
    type: "Post",
    id: "2",
    title: "Building a Next.js Application",
    excerpt: "Step-by-step guide to building a web application using Next.js.",
    author: "William East",
    tags: ["Next.js", "React", "Web Development"],
    image: "https://developer.mozilla.org/en-US/blog/static-site-generation-with-nextjs/featured.png",
    coverImage: "",
    featured: true,
    publishedAt: new Date("2026-01-28").toISOString(),
    updatedAt: new Date("2026-01-28").toISOString(),
    body: makeBody(`Next.js is a powerful React framework that makes building production-ready web applications easier than ever. With features like server-side rendering, static site generation, and API routes built in, it's become the go-to choice for modern web development.

In this comprehensive guide, we'll cover:
- Setting up your Next.js project
- Understanding the App Router
- Creating dynamic routes
- Working with server and client components
- Optimizing performance

Next.js provides an excellent developer experience with features like hot module replacement, automatic code splitting, and optimized production builds. Whether you're building a blog, an e-commerce site, or a complex web application, Next.js has the tools you need.`),
    slug: "building-a-nextjs-application",
    url: "/blog/building-a-nextjs-application"
  },
  {
    _id: "posts/2026-01-15-css-grid-vs-flexbox.md",
    _raw: makeRaw("2026-01-15-css-grid-vs-flexbox.md"),
    type: "Post",
    id: "3",
    title: "CSS Grid vs. Flexbox",
    excerpt: "An analysis of CSS Grid and Flexbox, and guidance on when to use each layout system.",
    author: "William East",
    tags: ["CSS", "Web Design", "Frontend"],
    image: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids/grid.png",
    coverImage: "",
    featured: false,
    publishedAt: new Date("2026-01-15").toISOString(),
    updatedAt: new Date("2026-01-15").toISOString(),
    body: makeBody(`Both CSS Grid and Flexbox are powerful layout systems that have revolutionized web design. But when should you use one over the other? This article breaks down the key differences and provides practical guidance.

Flexbox is best for:
- One-dimensional layouts (rows or columns)
- Content-driven design where size is determined by content
- Small-scale layouts and components
- Distributing space within a container

CSS Grid excels at:
- Two-dimensional layouts (rows and columns simultaneously)
- Layout-driven design with fixed track sizes
- Large-scale page layouts
- Creating complex responsive designs

Understanding when to use each tool will make you a more effective developer and help you create better, more maintainable layouts.`),
    slug: "css-grid-vs-flexbox",
    url: "/blog/css-grid-vs-flexbox"
  }
];
