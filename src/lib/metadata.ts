import type { Metadata } from "next";
import type { Post, Project } from "contentlayer/generated";

const SITE_NAME = "BlogFolio";
const SITE_DESCRIPTION = "The combined blog // portfolio of William East";
const SITE_URL = "https://blogfolio.dev";
const DEFAULT_TWITTER_HANDLE = "@wjbetech";
const DEFAULT_OG_IMAGE = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";
const metadataBase = new URL(SITE_URL);

const normalizeDescription = (value?: string) => value ?? SITE_DESCRIPTION;

const toAbsoluteUrl = (value?: string) => {
  if (!value) return DEFAULT_OG_IMAGE;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_URL}${normalized}`;
};

const buildMetadata = (options: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: Metadata["openGraph"]["type"];
}): Metadata => {
  const canonical = `${SITE_URL}${options.path}`;
  const imageUrl = toAbsoluteUrl(options.image);

  return {
    title: options.title,
    description: normalizeDescription(options.description),
    metadataBase,
    alternates: {
      canonical
    },
    openGraph: {
      title: options.title,
      description: normalizeDescription(options.description),
      url: canonical,
      siteName: SITE_NAME,
      type: options.type ?? "website",
      images: [
        {
          url: imageUrl,
          alt: `${options.title} | ${SITE_NAME}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      site: DEFAULT_TWITTER_HANDLE,
      title: options.title,
      description: normalizeDescription(options.description),
      images: [imageUrl],
      creator: DEFAULT_TWITTER_HANDLE
    }
  };
};

export const createSiteMetadata = (): Metadata =>
  buildMetadata({ title: SITE_NAME, description: SITE_DESCRIPTION, path: "/", image: DEFAULT_OG_IMAGE });

export const createBlogListMetadata = (): Metadata =>
  buildMetadata({ title: "Blog | BlogFolio", description: "Notes on software, life, and work in Korea.", path: "/blog" });

export const createPortfolioMetadata = (): Metadata =>
  buildMetadata({ title: "Projects | BlogFolio", description: "Featured projects that showcase product design, DevOps, and engineering work.", path: "/portfolio" });

export const generatePostMetadata = (post: Post): Metadata =>
  buildMetadata({
    title: `${post.title} | BlogFolio`,
    description: post.excerpt,
    image: post.coverImage ?? post.image,
    path: `/blog/${post.slug}`,
    type: "article"
  });

export const generateProjectMetadata = (project: Project): Metadata =>
  buildMetadata({
    title: `${project.title} | BlogFolio Projects`,
    description: project.description,
    image: project.images?.[0],
    path: `/portfolio/${project.slug}`
  });

