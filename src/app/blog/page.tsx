import { allPosts } from "contentlayer/generated";
import { redirect } from "next/navigation";
import { createBlogListMetadata } from "@/lib/metadata";
import { sortBlogPosts, splitFeaturedPost, getBlogTotalPages, clampBlogPage } from "@/lib/blogPagination";
import BlogPageClient from "./BlogPageClient";

export const metadata = createBlogListMetadata();

type BlogPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawPage = resolvedSearchParams?.page ?? "1";
  const parsedPage = Number(rawPage);
  const requestedPage = Math.max(1, Number.isFinite(parsedPage) ? Math.trunc(parsedPage) : 1);

  const sortedPosts = sortBlogPosts(allPosts);
  const { remainingPosts } = splitFeaturedPost(sortedPosts);
  const totalPages = getBlogTotalPages(remainingPosts.length);
  const safeCurrentPage = clampBlogPage(requestedPage, totalPages);

  if (requestedPage !== safeCurrentPage) {
    redirect(safeCurrentPage === 1 ? "/blog" : `/blog?page=${safeCurrentPage}`);
  }

  return <BlogPageClient posts={allPosts} currentPage={safeCurrentPage} />;
}
