import type { Post } from "contentlayer/generated";
import {
  sortBlogPosts,
  parseBlogPageParam,
  splitFeaturedPost,
  getBlogTotalPages,
  clampBlogPage,
  getPaginatedBlogPosts,
  BLOG_FIRST_PAGE_POST_COUNT,
  BLOG_POSTS_PER_PAGE
} from "@/lib/blogPagination";

function makePost(overrides: Partial<Post> = {}): Post {
  return {
    _id: "",
    _raw: {} as Post["_raw"],
    type: "Post",
    id: overrides.id ?? "test",
    title: overrides.title ?? "Test",
    author: "William",
    tags: [],
    featured: overrides.featured ?? false,
    publishedAt: overrides.publishedAt ?? "2024-01-01",
    updatedAt: overrides.updatedAt ?? "2024-01-01",
    status: "published",
    body: { raw: "" } as Post["body"],
    slug: overrides.slug ?? "test",
    readingTime: 1,
    url: "/blog/test",
    ...overrides
  } as Post;
}

describe("sortBlogPosts", () => {
  it("sorts posts by publishedAt descending", () => {
    const a = makePost({ publishedAt: "2024-01-01" });
    const b = makePost({ publishedAt: "2024-01-03" });
    const c = makePost({ publishedAt: "2024-01-02" });

    const sorted = sortBlogPosts([a, b, c]);
    expect(sorted.map((p) => p.publishedAt)).toEqual(["2024-01-03", "2024-01-02", "2024-01-01"]);
  });

  it("does not mutate the original array", () => {
    const posts = [makePost({ publishedAt: "2024-01-01" }), makePost({ publishedAt: "2024-01-02" })];
    const original = [...posts];
    sortBlogPosts(posts);
    expect(posts).toEqual(original);
  });
});

describe("parseBlogPageParam", () => {
  it("returns 1 for undefined", () => {
    expect(parseBlogPageParam(undefined)).toBe(1);
  });

  it("returns 1 for non-numeric strings", () => {
    expect(parseBlogPageParam("abc")).toBe(1);
  });

  it("parses a valid string number", () => {
    expect(parseBlogPageParam("3")).toBe(3);
  });

  it("uses the first element of an array", () => {
    expect(parseBlogPageParam(["5", "10"])).toBe(5);
  });
});

describe("splitFeaturedPost", () => {
  it("returns null featured and empty remaining for empty array", () => {
    const result = splitFeaturedPost([]);
    expect(result.featuredPost).toBeNull();
    expect(result.remainingPosts).toEqual([]);
  });

  it("picks the first post when none are featured", () => {
    const a = makePost({ id: "a" });
    const b = makePost({ id: "b" });
    const result = splitFeaturedPost([a, b]);
    expect(result.featuredPost).toEqual(a);
    expect(result.remainingPosts).toEqual([b]);
  });

  it("picks the featured post when one exists", () => {
    const a = makePost({ id: "a", featured: false });
    const b = makePost({ id: "b", featured: true });
    const result = splitFeaturedPost([a, b]);
    expect(result.featuredPost).toEqual(b);
    expect(result.remainingPosts).toEqual([a]);
  });
});

describe("getBlogTotalPages", () => {
  it("returns 1 when count is within first page limit", () => {
    expect(getBlogTotalPages(BLOG_FIRST_PAGE_POST_COUNT)).toBe(1);
  });

  it("calculates correct total pages beyond first page", () => {
    // 4 on first page, then 5 per page
    // 6 total = 1 + ceil((6 - 4) / 5) = 1 + 1 = 2
    expect(getBlogTotalPages(6)).toBe(2);
    // 14 total = 1 + ceil((14 - 4) / 5) = 1 + 2 = 3
    expect(getBlogTotalPages(14)).toBe(3);
  });
});

describe("clampBlogPage", () => {
  it("clamps page to 1 when below range", () => {
    expect(clampBlogPage(0, 5)).toBe(1);
  });

  it("clamps page to totalPages when above range", () => {
    expect(clampBlogPage(10, 5)).toBe(5);
  });

  it("returns page when within range", () => {
    expect(clampBlogPage(3, 5)).toBe(3);
  });

  it("defaults totalPages to 1 when invalid", () => {
    expect(clampBlogPage(5, 0)).toBe(1);
    expect(clampBlogPage(5, -1)).toBe(1);
  });
});

describe("getPaginatedBlogPosts", () => {
  it("returns first page slice", () => {
    const posts = Array.from({ length: 10 }, (_, i) => makePost({ id: String(i) }));
    const result = getPaginatedBlogPosts(posts, 1);
    expect(result.length).toBe(BLOG_FIRST_PAGE_POST_COUNT);
    expect(result[0].id).toBe("0");
  });

  it("returns second page slice", () => {
    const posts = Array.from({ length: 12 }, (_, i) => makePost({ id: String(i) }));
    const result = getPaginatedBlogPosts(posts, 2);
    expect(result.length).toBe(BLOG_POSTS_PER_PAGE);
    // first page takes 4, so second page starts at index 4
    expect(result[0].id).toBe("4");
  });

  it("returns empty array when posts are empty", () => {
    expect(getPaginatedBlogPosts([], 1)).toEqual([]);
  });
});
