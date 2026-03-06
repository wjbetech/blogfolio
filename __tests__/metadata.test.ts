import type { Metadata } from "next";
import type { Project } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";
import {
  createBlogListMetadata,
  createPortfolioMetadata,
  generatePostMetadata,
  generateProjectMetadata
} from "@/lib/metadata";

const samplePost = {
  id: "1",
  title: "Sample Post",
  excerpt: "Test excerpt",
  author: "William",
  tags: ["Next.js"],
  featured: true,
  publishedAt: "2026-01-01",
  updatedAt: "2026-01-02",
  status: "published",
  slug: "sample-post"
} as Post;

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
  images: ["/images/test.png"],
  slug: "sample-project"
} as Project;

describe("metadata helpers", () => {
  it("generates canonical data for a post", () => {
    const metadata = generatePostMetadata(samplePost);

    expect(metadata.alternates?.canonical).toContain(`/blog/${samplePost.slug}`);
    expect(metadata.openGraph?.url).toContain(`/blog/${samplePost.slug}`);
    expect(metadata.openGraph?.type).toBe("article");
    expect(metadata.openGraph?.images?.[0]?.url).toBeDefined();
    expect((metadata as Metadata).description).toContain(samplePost.excerpt);
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