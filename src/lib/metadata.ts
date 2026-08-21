import type { Metadata } from "next";
import type { Post, Project } from "contentlayer/generated";

const SITE_NAME = "BlogFolio";
const SITE_DESCRIPTION = "The combined blog // portfolio of William East";
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wjbeast.com";
export const SITE_URL = rawSiteUrl.replace(/\/$/, "");
const DEFAULT_TWITTER_HANDLE = "@wjbetech";
const DEFAULT_OG_IMAGE = "/images/assets/placeholder.png";
const metadataBase = new URL(SITE_URL);

const normalizeDescription = (value?: string) => value ?? SITE_DESCRIPTION;

/**
 * Core URL absoluter: trims, passes absolute URLs through, normalizes the
 * leading slash, and prepends SITE_URL. Returns undefined for blank input.
 */
export const toSiteUrl = (value?: string | null): string | undefined => {
  const cleaned = value?.trim();
  if (!cleaned) return undefined;
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) return cleaned;
  const normalized = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  return `${SITE_URL}${normalized}`;
};

/** Like toSiteUrl, but falls back to the default OG image instead of undefined. */
export const toAbsoluteUrl = (value?: string) => {
  return toSiteUrl(value) ?? toSiteUrl(DEFAULT_OG_IMAGE)!;
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

export const generateDevProjectMetadata = (project: Project): Metadata => {
  const primaryImage = project.images?.[0]?.trim();

  return buildMetadata({
    title: `${project.title} | BlogFolio Dev`,
    description: project.description,
    images: primaryImage ? [primaryImage] : undefined,
    path: `/dev/${project.slug}`
  });
};

export const createDevMetadata = (): Metadata =>
  buildMetadata({
    title: "Dev Portfolio | BlogFolio",
    description: "My projects - apps and software I built for friends, coworkers, or myself.",
    path: "/dev"
  });

export const createLanguageServicesMetadata = (): Metadata =>
  buildMetadata({
    title: "Language Services | BlogFolio",
    description:
      "Korean-English translation, proofreading, and editing by a native Brit with a master's in Korean linguistics and a decade in Korea.",
    path: "/language-services"
  });
