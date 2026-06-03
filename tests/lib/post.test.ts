import type { Post } from "contentlayer/generated";
import { getPostSnippet, getPostReadingTime } from "@/lib/post";

function makePost(bodyRaw: string, excerpt?: string): Post {
  return {
    _id: "",
    _raw: {} as any,
    type: "Post",
    id: "test",
    title: "Test",
    author: "William",
    tags: [],
    featured: false,
    publishedAt: "2024-01-01",
    updatedAt: "2024-01-01",
    status: "published",
    body: { raw: bodyRaw } as any,
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

describe("getPostReadingTime", () => {
  it("returns 1 for empty content", () => {
    const post = makePost("");
    expect(getPostReadingTime(post)).toBe(1);
  });

  it("calculates reading time based on 200 wpm", () => {
    // 400 words should be 2 minutes
    const words = Array.from({ length: 400 }, () => "word").join(" ");
    const post = makePost(words);
    expect(getPostReadingTime(post)).toBe(2);
  });

  it("falls back to excerpt when body is empty", () => {
    const post = makePost("", "word ".repeat(100));
    expect(getPostReadingTime(post)).toBe(1); // 100 words / 200 = 0.5 => ceil => 1
  });
});
