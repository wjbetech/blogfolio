import type { Post, Project } from "contentlayer/generated";
import {
  toAbsoluteStructuredDataUrl,
  toAbsoluteStructuredDataUrls,
  serializeJsonLd,
  createBlogPostingJsonLd,
  createPersonJsonLd,
  createWebSiteJsonLd,
  createProjectsCollectionJsonLd
} from "@/lib/metadataHelper";

describe("toAbsoluteStructuredDataUrl", () => {
  it("returns undefined for empty input", () => {
    expect(toAbsoluteStructuredDataUrl(undefined)).toBeUndefined();
    expect(toAbsoluteStructuredDataUrl("")).toBeUndefined();
    expect(toAbsoluteStructuredDataUrl("   ")).toBeUndefined();
  });

  it("returns absolute URLs as-is", () => {
    expect(toAbsoluteStructuredDataUrl("https://example.com/image.png")).toBe("https://example.com/image.png");
    expect(toAbsoluteStructuredDataUrl("http://example.com/image.png")).toBe("http://example.com/image.png");
  });

  it("prepends site URL to relative paths", () => {
    expect(toAbsoluteStructuredDataUrl("/blog/post")).toMatch(/\/blog\/post$/);
  });

  it("adds leading slash if missing", () => {
    expect(toAbsoluteStructuredDataUrl("blog/post")).toMatch(/\/blog\/post$/);
  });
});

describe("toAbsoluteStructuredDataUrls", () => {
  it("filters out undefined and null values", () => {
    const result = toAbsoluteStructuredDataUrls(["/a", null, undefined, "/b"]);
    expect(result).toHaveLength(2);
  });

  it("returns empty array for undefined input", () => {
    expect(toAbsoluteStructuredDataUrls(undefined)).toEqual([]);
  });
});

describe("serializeJsonLd", () => {
  it("serializes objects to JSON strings", () => {
    const data = { name: "Test" };
    expect(serializeJsonLd(data)).toBe('{"name":"Test"}');
  });

  it("escapes less-than signs", () => {
    const data = { html: "<script>" };
    expect(serializeJsonLd(data)).toBe('{"html":"\\u003cscript>"}');
  });
});

describe("createBlogPostingJsonLd", () => {
  it("returns valid BlogPosting structure", () => {
    const post = {
      slug: "test-post",
      title: "Test Post",
      excerpt: "A test excerpt.",
      coverImage: "/images/test.png",
      images: ["/images/alt.png"],
      publishedAt: "2024-01-01",
      updatedAt: "2024-01-02",
      tags: ["test", "jest"]
    } as unknown as Post;

    const result = createBlogPostingJsonLd(post);

    expect(result["@type"]).toBe("BlogPosting");
    expect(result.headline).toBe("Test Post");
    expect(result.image).toContain("https://williameast.com/images/test.png");
    expect(result.datePublished).toBe("2024-01-01");
    expect(result.dateModified).toBe("2024-01-02");
  });

  it("falls back dateModified to datePublished when updatedAt is missing", () => {
    const post = {
      slug: "test-post",
      title: "Test Post",
      publishedAt: "2024-01-01",
      updatedAt: "   ",
      tags: []
    } as unknown as Post;

    const result = createBlogPostingJsonLd(post);
    expect(result.dateModified).toBe("2024-01-01");
  });
});

describe("createPersonJsonLd", () => {
  it("returns a Person schema", () => {
    const result = createPersonJsonLd();
    expect(result["@type"]).toBe("Person");
    expect(result.name).toBe("William East");
    expect(result.sameAs).toContain("https://github.com/wjbetech");
  });
});

describe("createWebSiteJsonLd", () => {
  it("returns a WebSite schema with search action", () => {
    const result = createWebSiteJsonLd();
    expect(result["@type"]).toBe("WebSite");
    expect(result.name).toBe("BlogFolio");
    expect(result.potentialAction).toBeDefined();
  });
});

describe("createProjectsCollectionJsonLd", () => {
  it("filters out non-published projects", () => {
    const projects = [
      { title: "Published", description: "Desc", status: "published" },
      { title: "Draft", description: "Desc", status: "draft" }
    ] as unknown as Project[];

    const result = createProjectsCollectionJsonLd({
      pagePath: "/dev",
      pageTitle: "Projects",
      pageDescription: "My projects",
      projects
    });

    expect(result["@type"]).toBe("CollectionPage");
    expect(result.mainEntity.numberOfItems).toBe(1);
    expect(result.mainEntity.itemListElement[0].item.name).toBe("Published");
  });

  it("handles empty projects array", () => {
    const result = createProjectsCollectionJsonLd({
      pagePath: "/dev",
      pageTitle: "Projects",
      pageDescription: "My projects",
      projects: []
    });

    expect(result.mainEntity.numberOfItems).toBe(0);
    expect(result.mainEntity.itemListElement).toEqual([]);
  });
});
