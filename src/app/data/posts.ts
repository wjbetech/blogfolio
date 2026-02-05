import type { Post } from "../types/post";

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Understanding TypeScript Generics",
    slug: "understanding-typescript-generics",
    image:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Svelte_TypeScript/03-vscode-hints-in-main-ts.png",
    excerpt: "A deep dive into TypeScript generics and how they can improve your code.",
    content: `TypeScript generics are a powerful feature that allows you to write reusable, type-safe code. They enable you to create components that work with a variety of types rather than a single one.

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

Let's dive into some practical examples and see how generics can transform your TypeScript code.`,
    author: "William East",
    tags: ["TypeScript", "Generics", "Programming"],
    coverImage: "",
    featured: true,
    publishedAt: new Date("2026-02-01").toISOString(),
    updatedAt: new Date("2026-02-01").toISOString()
  },
  {
    id: "2",
    title: "Building a Next.js Application",
    slug: "building-a-nextjs-application",
    image: "https://developer.mozilla.org/en-US/blog/static-site-generation-with-nextjs/featured.png",
    excerpt: "Step-by-step guide to building a web application using Next.js.",
    content: `Next.js is a powerful React framework that makes building production-ready web applications easier than ever. With features like server-side rendering, static site generation, and API routes built in, it's become the go-to choice for modern web development.

In this comprehensive guide, we'll cover:
- Setting up your Next.js project
- Understanding the App Router
- Creating dynamic routes
- Working with server and client components
- Optimizing performance

Next.js provides an excellent developer experience with features like hot module replacement, automatic code splitting, and optimized production builds. Whether you're building a blog, an e-commerce site, or a complex web application, Next.js has the tools you need.`,
    author: "William East",
    tags: ["Next.js", "React", "Web Development"],
    coverImage: "",
    publishedAt: new Date("2026-01-28").toISOString(),
    updatedAt: new Date("2026-01-28").toISOString()
  },
  {
    id: "3",
    title: "CSS Grid vs. Flexbox",
    slug: "css-grid-vs-flexbox",
    image: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids/grid.png",
    excerpt: "An analysis of CSS Grid and Flexbox, and guidance on when to use each layout system.",
    content: `Both CSS Grid and Flexbox are powerful layout systems that have revolutionized web design. But when should you use one over the other? This article breaks down the key differences and provides practical guidance.

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

Understanding when to use each tool will make you a more effective developer and help you create better, more maintainable layouts.`,
    author: "William East",
    tags: ["CSS", "Web Design", "Frontend"],
    coverImage: "",
    publishedAt: new Date("2026-01-15").toISOString(),
    updatedAt: new Date("2026-01-15").toISOString()
  },
  {
    id: "4",
    title: "Introduction to GraphQL",
    slug: "introduction-to-graphql",
    excerpt: "Learn the basics of GraphQL and how it differs from REST APIs.",
    content: `GraphQL is a query language for APIs and a runtime for executing those queries. Developed by Facebook, it provides a more efficient, powerful, and flexible alternative to REST.

Key benefits of GraphQL:
- Request exactly the data you need
- Get multiple resources in a single request
- Strong typing system
- Better developer experience with introspection

Unlike REST, where you might need to make multiple requests to different endpoints, GraphQL allows you to fetch all the data you need in a single request. This reduces network overhead and makes your applications faster.

In this article, we'll explore the fundamentals of GraphQL, compare it to REST, and show you how to get started building GraphQL APIs.`,
    author: "William East",
    tags: ["GraphQL", "APIs", "Backend"],
    coverImage: "",
    publishedAt: new Date("2025-12-20").toISOString(),
    updatedAt: new Date("2025-12-20").toISOString()
  },
  {
    id: "5",
    title: "Effective State Management in React",
    slug: "effective-state-management-in-react",
    excerpt: "Explore various state management techniques in React applications.",
    content: `State management is one of the most important aspects of building React applications. As your app grows, managing state becomes increasingly complex. This guide explores different approaches and helps you choose the right solution.

State management options:
- useState and useReducer for local state
- Context API for shared state
- Redux for complex applications
- Zustand for simpler global state
- React Query for server state

Each solution has its own use cases and trade-offs. The key is understanding when to use each approach and how they can work together to create a maintainable application architecture.

We'll also discuss best practices, common pitfalls, and patterns that will help you manage state effectively in your React applications.`,
    author: "William East",
    tags: ["React", "State Management", "Frontend"],
    coverImage: "",
    publishedAt: new Date("2025-12-10").toISOString(),
    updatedAt: new Date("2025-12-10").toISOString()
  },
  {
    id: "6",
    title: "Modern Authentication Patterns",
    slug: "modern-authentication-patterns",
    excerpt: "Implementing secure authentication in web applications using modern best practices.",
    content: `Authentication is a critical part of any web application. This article explores modern authentication patterns including JWT, OAuth, and session-based auth.

Topics covered:
- Token-based authentication
- OAuth 2.0 and OpenID Connect
- Session management
- Security best practices
- Implementing auth in Next.js

We'll look at practical examples and discuss the trade-offs of each approach to help you make informed decisions for your applications.`,
    author: "William East",
    tags: ["Authentication", "Security", "Backend"],
    coverImage: "",
    publishedAt: new Date("2025-11-25").toISOString(),
    updatedAt: new Date("2025-11-25").toISOString()
  }
];
