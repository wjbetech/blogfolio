import { allPosts, allProjects } from "contentlayer/generated";
import type { Post, Project } from "contentlayer/generated";
import { getPublishedPosts, getPublishedProjects } from "@/lib/content";
import { getPostSnippet } from "@/lib/post";
import { getPrimaryProjectImage } from "@/lib/projectImages";

/**
 * Plain, serializable card data for client surfaces (home carousels).
 *
 * Shaping happens server-side so client components never import the raw
 * Contentlayer collections — draft bodies must not reach the browser bundle.
 */
export type BlogCardData = {
  slug: string;
  title: string;
  snippet: string;
  /** Declared cover image, or "" when the card should use the placeholder. */
  image: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
};

export type ProjectCardData = {
  slug: string;
  title: string;
  description: string;
  /** Primary ordered screenshot, or "" when the card should use the placeholder. */
  image: string;
  tech: string[];
};

export function getBlogCardData(post: Post): BlogCardData {
  return {
    slug: post.slug,
    title: post.title,
    snippet: getPostSnippet(post, 120),
    image: post.coverImage?.trim() || post.images?.[0]?.trim() || "",
    publishedAt: post.publishedAt,
    readingTime: post.readingTime ?? 0,
    tags: (post.tags ?? []).slice(0, 3)
  };
}

export function getProjectCardData(project: Project): ProjectCardData {
  return {
    slug: project.slug,
    title: project.title,
    description: project.description ?? "",
    image: getPrimaryProjectImage(project.images),
    tech: (project.tech ?? []).slice(0, 4)
  };
}

export function getPublishedBlogCards(): BlogCardData[] {
  return getPublishedPosts(allPosts).map(getBlogCardData);
}

export function getPublishedProjectCards(): ProjectCardData[] {
  return getPublishedProjects(allProjects).map(getProjectCardData);
}
