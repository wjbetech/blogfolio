/**
 * @jest-environment node
 */
import { GET } from "@/app/sitemap.xml/route";

jest.mock("contentlayer/generated", () => ({
  allPosts: [
    {
      slug: "published-post",
      title: "Published Post",
      excerpt: "Visible",
      publishedAt: "2026-01-01",
      updatedAt: "2026-01-02",
      status: "published"
    },
    {
      slug: "draft-post",
      title: "Draft Post",
      excerpt: "Hidden",
      publishedAt: "2026-01-03",
      updatedAt: "2026-01-03",
      status: "draft"
    }
  ],
  allProjects: [
    {
      slug: "published-project",
      title: "Published Project",
      publishedAt: "2025-01-01",
      updatedAt: "2025-01-02",
      status: "published"
    },
    {
      slug: "draft-project",
      title: "Draft Project",
      publishedAt: "2025-01-03",
      updatedAt: "2025-01-03",
      status: "draft"
    }
  ]
}));

describe("sitemap.xml route", () => {
  it("lists published content only", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).toContain("/blog/published-post");
    expect(body).toContain("/dev/published-project");
  });

  it("excludes draft posts and projects", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).not.toContain("/blog/draft-post");
    expect(body).not.toContain("/dev/draft-project");
  });

  it("uses /dev as the canonical project section", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).toContain("/dev");
    expect(body).not.toContain("/portfolio");
  });
});