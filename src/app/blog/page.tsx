import { allPosts } from "contentlayer/generated";
import { redirect } from "next/navigation";
import { createBlogListMetadata } from "@/lib/metadata";
import {
  sortBlogPosts,
  splitFeaturedPost,
  getBlogTotalPages,
  clampBlogPage,
  parseBlogPageParam
} from "@/lib/blogPagination";
import BlogPageClient from "./BlogPageClient";

export const metadata = createBlogListMetadata();

type BlogPageProps = {
  searchParams?: Promise<{ page?: string | string[] }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawPage = Array.isArray(resolvedSearchParams?.page) ? resolvedSearchParams.page[0] : resolvedSearchParams?.page;

  const requestedPage = parseBlogPageParam(rawPage);

  const sortedPosts = sortBlogPosts(allPosts);
  const { remainingPosts } = splitFeaturedPost(sortedPosts);
  const totalPages = getBlogTotalPages(remainingPosts.length);
  const safeCurrentPage = clampBlogPage(requestedPage, totalPages);

  if (requestedPage !== safeCurrentPage) {
    redirect(safeCurrentPage === 1 ? "/blog" : `/blog?page=${safeCurrentPage}`);
  }

  return <BlogPageClient posts={sortedPosts} currentPage={safeCurrentPage} />;
}
