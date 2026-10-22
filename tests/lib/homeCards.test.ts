import type { Post, Project } from "contentlayer/generated";
import {
  getBlogCardData,
  getProjectCardData,
  getPublishedBlogCards,
  getPublishedProjectCards
} from "@/lib/homeCards";

jest.mock("contentlayer/generated", () => ({
  allPosts: [
    {
      slug: "published-post",
      title: "Published Post",
      excerpt: "Live excerpt",
      coverImage: "",
      images: [],
      status: "published",
      publishedAt: "2025-01-01",
      readingTime: 5,
      tags: ["nextjs"],
      body: { raw: "First paragraph.\n\nSecond paragraph." }
    },
    {
      slug: "draft-post",
      title: "Draft Post",
      excerpt: "Secret draft text",
      coverImage: "",
      images: [],
      status: "draft",
      publishedAt: "2025-01-02",
      readingTime: 3,
      tags: [],
      body: { raw: "Confidential draft body" }
    }
  ],
  allProjects: [
    {
      slug: "published-project",
      title: "Published Project",
      description: "A project",
      images: ["2.settings.png", "1.home.png"],
      tech: ["Next.js", "TypeScript"],
      status: "published"
    },
    {
      slug: "draft-project",
      title: "Draft Project",
      description: "Hidden",
      images: [],
      tech: [],
      status: "draft"
    }
  ]
}));

describe("homeCards", () => {
  it("excludes draft posts from blog cards", () => {
    const cards = getPublishedBlogCards();
    expect(cards.map((card) => card.slug)).toEqual(["published-post"]);
  });

  it("shapes blog cards with snippet and empty image fallback", () => {
    const [card] = getPublishedBlogCards();
    expect(card).toMatchObject({
      slug: "published-post",
      title: "Published Post",
      snippet: "Live excerpt",
      image: ""
    });
    expect(card.publishedAt).toBeDefined();
    expect(card.readingTime).toBeDefined();
    expect(Array.isArray(card.tags)).toBe(true);
  });

  it("prefers coverImage then first image for blog cards", () => {
    const post = {
      slug: "s",
      title: "t",
      coverImage: "/cover.png",
      images: ["/first.png", "/second.png"],
      publishedAt: "2025-01-01",
      readingTime: 4,
      tags: [],
      body: { raw: "text" }
    } as unknown as Post;
    expect(getBlogCardData(post).image).toBe("/cover.png");

    const postNoCover = { ...post, coverImage: "" } as unknown as Post;
    expect(getBlogCardData(postNoCover).image).toBe("/first.png");
  });

  it("excludes draft projects from project cards", () => {
    const cards = getPublishedProjectCards();
    expect(cards.map((card) => card.slug)).toEqual(["published-project"]);
  });

  it("shapes project cards with the primary ordered image", () => {
    const [card] = getPublishedProjectCards();
    expect(card.image).toBe("1.home.png");
    expect(Array.isArray(card.tech)).toBe(true);
  });
});
