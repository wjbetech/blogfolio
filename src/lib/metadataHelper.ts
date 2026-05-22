import type { Post, Project } from "contentlayer/generated";
import { SITE_URL } from "@/lib/metadata";

// cleanly handle a single URL
export function toAbsoluteStructuredDataUrl(value?: string | null) {
  const cleaned = value?.trim();

  if (!cleaned) return undefined;

  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) return cleaned;

  const normalized = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  return `${SITE_URL}${normalized}`;
}

// handle the image arrays
export function toAbsoluteStructuredDataUrls(values?: Array<string | null | undefined>) {
  return (values ?? [])
    .map((value) => toAbsoluteStructuredDataUrl(value))
    .filter((value): value is string => Boolean(value));
}

// give the exact string to drop into dangerouslySetInnerHTML
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function createBlogPostingJsonLd(
  post: Pick<Post, "slug" | "title" | "excerpt" | "coverImage" | "images" | "publishedAt" | "updatedAt" | "tags">
) {
  const postUrl = toAbsoluteStructuredDataUrl(`/blog/${post.slug}`);
  const images = toAbsoluteStructuredDataUrls([post.coverImage, ...(post.images ?? [])]);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt?.trim() || undefined,
    image: images.length > 0 ? images : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt?.trim() || post.publishedAt,
    url: postUrl,
    keywords: post.tags
  };
}

type ProjectsCollectionJsonLdOptions = {
  pagePath: string;
  pageTitle: string;
  pageDescription: string;
  projects: Array<Pick<Project, "title" | "description" | "images" | "link" | "repo" | "status">>;
};

export function createProjectsCollectionJsonLd({
  pagePath,
  pageTitle,
  pageDescription,
  projects
}: ProjectsCollectionJsonLdOptions) {
  const publishedProjects = projects.filter((project) => project.status.trim() === "published");

  const itemListElement = publishedProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description?.trim() || undefined,
      url: toAbsoluteStructuredDataUrl(project.link || project.repo),
      image: toAbsoluteStructuredDataUrls(project.images ?? [])[0] || undefined
    }
  }));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: toAbsoluteStructuredDataUrl(pagePath),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: itemListElement.length,
      itemListElement
    }
  };
}
