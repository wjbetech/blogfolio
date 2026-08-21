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
};

export type ProjectCardData = {
  slug: string;
  title: string;
  description: string;
  /** Primary ordered screenshot, or "" when the card should use the placeholder. */
  image: string;
};

export function getBlogCardData(post: Post): BlogCardData {
  return {
    slug: post.slug,
    title: post.title,
    snippet: getPostSnippet(post, 120),
    image: post.coverImage?.trim() || post.images?.[0]?.trim() || ""
  };
}

export function getProjectCardData(project: Project): ProjectCardData {
  return {
    slug: project.slug,
    title: project.title,
    description: project.description ?? "",
    image: getPrimaryProjectImage(project.images)
  };
}

export function getPublishedBlogCards(): BlogCardData[] {
  return getPublishedPosts(allPosts).map(getBlogCardData);
}

export function getPublishedProjectCards(): ProjectCardData[] {
  return getPublishedProjects(allProjects).map(getProjectCardData);
}
