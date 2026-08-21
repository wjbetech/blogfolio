import type { Post } from "contentlayer/generated";
import { getPostSnippet } from "@/lib/post";

function makePost(bodyRaw: string, excerpt?: string): Post {
  return {
    _id: "",
    _raw: {} as Post["_raw"],
    type: "Post",
    id: "test",
    title: "Test",
    author: "William",
    tags: [],
    featured: false,
    publishedAt: "2024-01-01",
    updatedAt: "2024-01-01",
    status: "published",
    body: { raw: bodyRaw } as Post["body"],
    slug: "test",
    readingTime: 1,
    url: "/blog/test",
    excerpt
  } as Post;
}

describe("getPostSnippet", () => {
  it("returns excerpt when available", () => {
    const post = makePost("Body text here.", "Custom excerpt.");
    expect(getPostSnippet(post)).toBe("Custom excerpt.");
  });

  it("returns first paragraph when no excerpt", () => {
    const post = makePost("First paragraph.\n\nSecond paragraph.");
    expect(getPostSnippet(post)).toBe("First paragraph.");
  });

  it("truncates long text to maxLength", () => {
    const longText = "a".repeat(200);
    const post = makePost(longText);
    expect(getPostSnippet(post, 50)).toBe("a".repeat(50) + "…");
  });

  it("returns empty string when no content", () => {
    const post = makePost("");
    expect(getPostSnippet(post)).toBe("");
  });

  it("normalizes Windows line endings", () => {
    const post = makePost("Paragraph one.\r\n\r\nParagraph two.");
    expect(getPostSnippet(post)).toBe("Paragraph one.");
  });
});
