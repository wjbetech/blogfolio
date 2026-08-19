import type { Metadata } from "next";
import type { Project, Post } from "contentlayer/generated";
import {
  createBlogListMetadata,
  createPortfolioMetadata,
  generatePostMetadata,
  generateProjectMetadata
} from "@/lib/metadata";
import {
  createBlogPostingJsonLd,
  createProjectsCollectionJsonLd,
  toAbsoluteStructuredDataUrl,
  toAbsoluteStructuredDataUrls,
  serializeJsonLd
} from "@/lib/metadataHelper";

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://williameast.com").replace(/\/$/, "");


/** Normalize Next.js OGImage union (OGImage | OGImage[]) to extract the first URL. */
function getOgImageUrl(metadata: Metadata): string | undefined {
  const images = metadata.openGraph?.images;
  if (!images) return undefined;
  const first = Array.isArray(images) ? images[0] : images;
  if (typeof first === "string") return first;
  if (first instanceof URL) return first.href;
  const url = first?.url;
  if (typeof url === "string") return url;
  if (url instanceof URL) return url.href;
  return undefined;
}
function makeSamplePost(overrides: Partial<Post> = {}): Post {
  return {
    id: overrides.id ?? "1",
    title: overrides.title ?? "Sample Post",
    excerpt: overrides.excerpt ?? "Test excerpt",
    tags: overrides.tags ?? ["Next.js"],
    featured: overrides.featured ?? true,
    publishedAt: overrides.publishedAt ?? "2026-01-01",
    updatedAt: overrides.updatedAt ?? "2026-01-02",
    slug: overrides.slug ?? "sample-post",
    images: overrides.images ?? [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2F6c41P3JIMTpPP1sMciktCZ_LG6eX3pnag&s"
    ],
    coverImage:
      overrides.coverImage ??
      "https://sites.duke.edu/dek23/wp-content/themes/koji/assets/images/default-fallback-image.png"
  } as Post;
}

const sampleProject: Project = {
  id: "2",
  title: "Sample Project",
  description: "Project description",
  tech: ["React"],
  link: "https://example.com",
  status: "published",
  featured: false,
  publishedAt: "2025-05-05",
  updatedAt: "2025-05-06",
  images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2F6c41P3JIMTpPP1sMciktCZ_LG6eX3pnag&s"],
  slug: "sample-project"
} as Project;

describe("metadata helpers", () => {
  it("uses coverImage first when both coverImage and images exist", () => {
    const post = makeSamplePost({
      coverImage: "https://cdn.example.com/cover.png",
      images: ["https://cdn.example.com/first-image.png"]
    });

    const metadata = generatePostMetadata(post);

    expect(getOgImageUrl(metadata)).toBe("https://cdn.example.com/cover.png");
  });

  it("falls back to the first image when coverImage is blank", () => {
    const post = makeSamplePost({
      coverImage: "",
      images: ["https://cdn.example.com/first-image.png"]
    });

    const metadata = generatePostMetadata(post);

    expect(getOgImageUrl(metadata)).toBe("https://cdn.example.com/first-image.png");
  });

  it("falls back to the default image when both coverImage and images are missing", () => {
    const post = makeSamplePost({
      coverImage: "",
      images: []
    });

    const metadata = generatePostMetadata(post);

    expect(getOgImageUrl(metadata)).toBe(`${BASE_URL}/images/assets/placeholder.png`);
  });

  it("generates canonical data for a project", () => {
    const metadata = generateProjectMetadata(sampleProject);

    expect(metadata.alternates?.canonical).toContain(`/dev/${sampleProject.slug}`);
    expect(getOgImageUrl(metadata)).toBeDefined();
    expect((metadata as Metadata).description).toBe(sampleProject.description);
  });

  it("provides canonical entries for list pages", () => {
    const blogMetadata = createBlogListMetadata();
    const portfolioMetadata = createPortfolioMetadata();

    expect(blogMetadata.alternates?.canonical).toContain("/blog");
    expect(portfolioMetadata.alternates?.canonical).toContain("/dev");
  });
});

describe("structured data helpers", () => {
  it("builds BlogPosting JSON-LD with image and date fallbacks", () => {
    const jsonLd = createBlogPostingJsonLd(
      makeSamplePost({
        coverImage: "",
        images: ["/images/posts/sample.png"],
        updatedAt: ""
      })
    );

    expect(jsonLd["@type"]).toBe("BlogPosting");
    expect(jsonLd.image).toEqual([`${BASE_URL}/images/posts/sample.png`]);
    expect(jsonLd.dateModified).toBe("2026-01-01");
  });

  it("builds CollectionPage JSON-LD for published projects using real current URLs", () => {
    const jsonLd = createProjectsCollectionJsonLd({
      pagePath: "/dev",
      pageTitle: "Dev Portfolio | BlogFolio",
      pageDescription: "Project listing",
      projects: [
        sampleProject,
        {
          ...sampleProject,
          title: "Repo Only Project",
          link: "",
          repo: "https://github.com/example/repo-only",
          images: [],
          status: "published"
        } as Project,
        {
          ...sampleProject,
          title: "Draft Project",
          link: "https://example.com/draft",
          status: "draft"
        } as Project
      ]
    });

    expect(jsonLd["@type"]).toBe("CollectionPage");
    expect(jsonLd.url).toBe(`${BASE_URL}/dev`);
    expect(jsonLd.mainEntity.numberOfItems).toBe(2);
    expect(jsonLd.mainEntity.itemListElement[0]).toEqual(
      expect.objectContaining({
        "@type": "ListItem",
        position: 1,
        item: expect.objectContaining({
          "@type": "CreativeWork",
          name: "Sample Project",
          url: "https://example.com"
        })
      })
    );
    expect(jsonLd.mainEntity.itemListElement[1]).toEqual(
      expect.objectContaining({
        position: 2,
        item: expect.objectContaining({
          name: "Repo Only Project",
          url: "https://github.com/example/repo-only",
          image: undefined
        })
      })
    );
  });

  it("converts relative URL to absolute URL", () => {
    expect(toAbsoluteStructuredDataUrl("/blog/sample-post")).toBe(`${BASE_URL}/blog/sample-post`);
  });

  it("leaves absolute URLs unchaned", () => {
    expect(toAbsoluteStructuredDataUrl("https://example.com/image.png")).toBe("https://example.com/image.png");
  });

  it("returns undefined for blank values", () => {
    expect(toAbsoluteStructuredDataUrl("")).toBeUndefined();
    expect(toAbsoluteStructuredDataUrl("   ")).toBeUndefined();
    expect(toAbsoluteStructuredDataUrl(null)).toBeUndefined();
    expect(toAbsoluteStructuredDataUrl(undefined)).toBeUndefined();
  });

  it("filters empty values out of URL arrays", () => {
    expect(toAbsoluteStructuredDataUrls(["/one.png", " ", undefined, "https://example.com/two.png"])).toEqual([
      `${BASE_URL}/one.png`,
      "https://example.com/two.png"
    ]);
  });

  it("escapes less-than characters in serialized JSON-LD", () => {
    const result = serializeJsonLd({
      headline: "Test <script>alert('xss')</script>"
    });

    expect(result).toContain("\\u003cscript>");
    expect(result).not.toContain("<script>");
  });
});
