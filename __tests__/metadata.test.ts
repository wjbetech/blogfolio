import type { Metadata } from "next";
import type { Project, Post } from "contentlayer/generated";
import {
  createBlogListMetadata,
  createPortfolioMetadata,
  generatePostMetadata,
  generateProjectMetadata
} from "@/lib/metadata";

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

    expect(metadata.openGraph?.images?.[0]?.url).toBe("https://cdn.example.com/cover.png");
  });

  it("falls back to the first image when coverImage is blank", () => {
    const post = makeSamplePost({
      coverImage: "",
      images: ["https://cdn.example.com/first-image.png"]
    });

    const metadata = generatePostMetadata(post);

    expect(metadata.openGraph?.images?.[0]?.url).toBe("https://cdn.example.com/first-image.png");
  });

  it("falls back to the default image when both coverImage and images are missing", () => {
    const post = makeSamplePost({
      coverImage: "",
      images: []
    });

    const metadata = generatePostMetadata(post);

    expect(metadata.openGraph?.images?.[0]?.url).toContain("images.unsplash.com");
  });

  it("generates canonical data for a project", () => {
    const metadata = generateProjectMetadata(sampleProject);

    expect(metadata.alternates?.canonical).toContain(`/portfolio/${sampleProject.slug}`);
    expect(metadata.openGraph?.images?.[0]?.url).toBeDefined();
    expect((metadata as Metadata).description).toBe(sampleProject.description);
  });

  it("provides canonical entries for list pages", () => {
    const blogMetadata = createBlogListMetadata();
    const portfolioMetadata = createPortfolioMetadata();

    expect(blogMetadata.alternates?.canonical).toContain("/blog");
    expect(portfolioMetadata.alternates?.canonical).toContain("/portfolio");
  });
});
