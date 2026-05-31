import type { Metadata } from "next";
import type { Post, Project } from "contentlayer/generated";

const SITE_NAME = "BlogFolio";
const SITE_DESCRIPTION = "The combined blog // portfolio of William East";
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://williameast.com";
export const SITE_URL = rawSiteUrl.replace(/\/$/, "");
const DEFAULT_TWITTER_HANDLE = "@wjbetech";
const DEFAULT_OG_IMAGE = "/images/assets/placeholder.png";
const metadataBase = new URL(SITE_URL);

const normalizeDescription = (value?: string) => value ?? SITE_DESCRIPTION;

export const toAbsoluteUrl = (value?: string) => {
  if (!value) return DEFAULT_OG_IMAGE;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_URL}${normalized}`;
};

const buildMetadata = (options: {
  title: string;
  description?: string;
  path: string;
  images?: string[];
  type?: "website" | "article";
}): Metadata => {
  const canonical = `${SITE_URL}${options.path}`;
  const imageUrl = toAbsoluteUrl(options.images?.[0]);

  return {
    title: options.title,
    description: normalizeDescription(options.description),
    metadataBase,
    alternates: {
      canonical,
      types: {
        "application/rss+xml": `${SITE_URL}/rss.xml`
      }
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
  buildMetadata({ title: SITE_NAME, description: SITE_DESCRIPTION, path: "/", images: [DEFAULT_OG_IMAGE] });

export const createBlogListMetadata = (): Metadata =>
  buildMetadata({
    title: "Blog | BlogFolio",
    description: "Notes on software, life, and work in Korea.",
    path: "/blog"
  });

export const createPortfolioMetadata = (): Metadata =>
  buildMetadata({
    title: "Projects | BlogFolio",
    description: "Featured projects that showcase product design, DevOps, and engineering work.",
    path: "/portfolio"
  });

export const generatePostMetadata = (post: Post): Metadata => {
  const primaryImage = post.coverImage?.trim() || post.images?.[0]?.trim();

  return buildMetadata({
    title: `${post.title} | BlogFolio`,
    description: post.excerpt,
    images: primaryImage ? [primaryImage] : undefined,
    path: `/blog/${post.slug}`,
    type: "article"
  });
};

export const generateProjectMetadata = (project: Project): Metadata => {
  const primaryImage = project.images?.[0]?.trim();

  return buildMetadata({
    title: `${project.title} | BlogFolio Projects`,
    description: project.description,
    images: primaryImage ? [primaryImage] : undefined,
    path: `/portfolio/${project.slug}`
  });
};
