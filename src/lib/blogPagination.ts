import type { Post } from "contentlayer/generated";

export const BLOG_FIRST_PAGE_POST_COUNT = 4;
export const BLOG_POSTS_PER_PAGE = 5;

export function sortBlogPosts(posts: Post[]) {
  return [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function parseBlogPageParam(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const rawNum = Number(rawValue);

  if (!Number.isFinite(rawNum)) {
    return 1;
  }

  return rawNum;
}

export function splitFeaturedPost(posts: Post[]) {
  if (posts.length === 0) {
    return { featuredPost: null, remainingPosts: [] as Post[] };
  }

  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const remainingPosts = posts.filter((post) => post.id !== featuredPost.id);

  return { featuredPost, remainingPosts };
}

export function getBlogTotalPages(regularPostCount: number) {
  if (regularPostCount <= BLOG_FIRST_PAGE_POST_COUNT) {
    return 1;
  }

  return 1 + Math.ceil((regularPostCount - BLOG_FIRST_PAGE_POST_COUNT) / BLOG_POSTS_PER_PAGE);
}

export function clampBlogPage(page: number, totalPages: number) {
  const safePage = Number.isFinite(page) ? Math.trunc(page) : 1;
  const safeTotalPages = Number.isFinite(totalPages) && totalPages > 0 ? Math.trunc(totalPages) : 1;

  return Math.max(1, Math.min(safePage, safeTotalPages));
}

export function getPaginatedBlogPosts(posts: Post[], page: number) {
  const safePage = Math.max(1, page);

  const startIndex = safePage === 1 ? 0 : BLOG_FIRST_PAGE_POST_COUNT + (safePage - 2) * BLOG_POSTS_PER_PAGE;

  const endIndex = safePage === 1 ? BLOG_FIRST_PAGE_POST_COUNT : startIndex + BLOG_POSTS_PER_PAGE;

  return posts.slice(startIndex, endIndex);
}
