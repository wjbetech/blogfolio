import type { Project } from "../types/project";

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    slug: "portfolio-website",
    description: "A personal portfolio website to showcase my projects and skills.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://myportfolio.com",
    repo: "",
    images: [""],
    featured: true,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "E-commerce Platform",
    slug: "ecommerce-platform",
    description: "A full-featured e-commerce platform with shopping cart and payment integration.",
    tech: ["Next.js", "Node.js", "MongoDB"],
    link: "https://myecommerce.com",
    repo: "",
    images: [""],
    featured: false,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Blog Application",
    slug: "blog-application",
    description: "A blogging platform with user authentication and content management.",
    tech: ["Gatsby", "GraphQL", "Contentful"],
    link: "https://myblog.com",
    repo: "",
    images: [""],
    featured: false,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Task Management Tool",
    slug: "task-management-tool",
    description: "A productivity tool to manage and track tasks and projects.",
    tech: ["Vue.js", "Firebase", "Vuetify"],
    link: "https://mytaskmanager.com",
    repo: "",
    images: [""],
    featured: true,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "Social Media App",
    slug: "social-media-app",
    description: "A social networking app with real-time chat and media sharing features.",
    tech: ["React Native", "Socket.io", "AWS"],
    link: "https://mysocialapp.com",
    repo: "",
    images: [""],
    featured: false,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
