import type { Post } from "../types/post";

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Understanding TypeScript Generics",
    slug: "understanding-typescript-generics",
    excerpt: "A deep dive into TypeScript generics and how they can improve your code.",
    content: "Full content of the post goes here...",
    author: "William East",
    tags: ["TypeScript", "Generics", "Programming"],
    coverImage: "",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Building a Next.js Application",
    slug: "building-a-nextjs-application",
    excerpt: "Step-by-step guide to building a web application using Next.js.",
    content: "Full content of the post goes here...",
    author: "William East",
    tags: ["Next.js", "React", "Web Development"],
    coverImage: "",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "CSS Grid vs. Flexbox: When to Use Which",
    slug: "css-grid-vs-flexbox",
    excerpt: "An analysis of CSS Grid and Flexbox, and guidance on when to use each layout system.",
    content: "Full content of the post goes here...",
    author: "William East",
    tags: ["CSS", "Web Design", "Frontend"],
    coverImage: "",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Introduction to GraphQL",
    slug: "introduction-to-graphql",
    excerpt: "Learn the basics of GraphQL and how it differs from REST APIs.",
    content: "Full content of the post goes here...",
    author: "William East",
    tags: ["GraphQL", "APIs", "Backend"],
    coverImage: "",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "Effective State Management in React",
    slug: "effective-state-management-in-react",
    excerpt: "Explore various state management techniques in React applications.",
    content: "Full content of the post goes here...",
    author: "William East",
    tags: ["React", "State Management", "Frontend"],
    coverImage: "",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
