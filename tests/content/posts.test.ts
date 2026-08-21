import fs from "fs";
import path from "path";
import { deriveSlugFromFile, readFrontMatter } from "../utils/frontmatter";

type PostMeta = {
  file: string;
  slug: string;
  id: string | undefined;
  title: string | undefined;
  excerpt: string | undefined;
  author: string | undefined;
  tags: string[];
  featured: boolean | undefined;
  status: string | undefined;
  publishedAt: string | undefined;
  updatedAt: string | undefined;
  images: string[] | undefined;
  coverImage: string | undefined;
};

function readPostMeta(): PostMeta[] {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const postFiles = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  return postFiles
    .map((file) => {
      const data = readFrontMatter(path.join(postsDir, file));
      const slug = deriveSlugFromFile(path.join(postsDir, file), data.slug as string | undefined);
      if (!slug) return null;

      return {
        file,
        slug,
        id: data.id as string | undefined,
        title: data.title as string | undefined,
        excerpt: data.excerpt as string | undefined,
        author: data.author as string | undefined,
        tags: (data.tags as string[] | undefined) ?? [],
        featured: data.featured as boolean | undefined,
        status: data.status as string | undefined,
        publishedAt: data.publishedAt as string | undefined,
        updatedAt: data.updatedAt as string | undefined,
        images: Array.isArray(data.images) ? data.images : undefined,
        coverImage: data.coverImage as string | undefined
      };
    })
    .filter((meta): meta is PostMeta => meta !== null);
}

describe("Blog post frontmatter", () => {
  it("includes canonical post fields", () => {
    const posts = readPostMeta();
    const required = [
      "id",
      "title",
      "slug",
      "excerpt",
      "author",
      "tags",
      "featured",
      "publishedAt",
      "updatedAt",
      "status"
    ];

    posts.forEach((post) => {
      required.forEach((key) => {
        const value = (post as Record<string, unknown>)[key];
        expect(value).toBeDefined();
      });
      expect(post.tags?.length).toBeGreaterThan(0);
      expect(post.status).toMatch(/^(draft|published)$/);
    });
  });

  it("uses normalized date formats", () => {
    const posts = readPostMeta();
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    posts.forEach((post) => {
      expect(post.publishedAt).toMatch(pattern);
      expect(post.updatedAt).toMatch(pattern);
    });
  });

  it("keeps ids unique", () => {
    const ids = readPostMeta()
      .map((post) => post.id)
      .filter(Boolean) as string[];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps slugs unique", () => {
    const slugs = readPostMeta().map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("includes at least three published slugs", () => {
    const publishedSlugs = readPostMeta()
      .filter((post) => post.status === "published")
      .map((post) => post.slug);
    expect(publishedSlugs.length).toBeGreaterThanOrEqual(3);
  });

  it("uses ordered image arrays and only allows non-blank image entries", () => {
    const posts = readPostMeta();
    posts.forEach((post) => {
      const images = post.images ?? [];

      expect(Array.isArray(images)).toBe(true);
      expect(images.every((src) => typeof src === "string" && src.trim().length > 0)).toBe(true);

      if (post.coverImage !== undefined) {
        expect(typeof post.coverImage).toBe("string");
      }
    });
  });
});
