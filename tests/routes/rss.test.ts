/**
 * @jest-environment node
 */
import { GET } from "@/app/rss.xml/route";

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
  ]
}));

describe("rss.xml route", () => {
  it("includes published posts", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).toContain("/blog/published-post");
    expect(body).toContain("Published Post");
  });

  it("excludes draft posts", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).not.toContain("/blog/draft-post");
    expect(body).not.toContain("Draft Post");
  });
});