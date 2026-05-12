import { allPosts } from "contentlayer/generated";
import { redirect } from "next/navigation";
import { createBlogListMetadata } from "@/lib/metadata";
import BlogPageClient from "./BlogPageClient";

export const metadata = createBlogListMetadata();

type BlogPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawPage = resolvedSearchParams?.page ?? "1";
  const requestedPage = Math.max(1, Number(rawPage) || 1);

  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const featuredPost = sortedPosts.find((post) => post.featured) ?? sortedPosts[0];

  const remainingPosts = sortedPosts.filter((post) => post.id !== featuredPost.id);

  const firstPagePostCount = 4;
  const pagePostCount = 5;

  const totalPages =
    remainingPosts.length <= firstPagePostCount
      ? 1
      : 1 + Math.ceil((remainingPosts.length - firstPagePostCount) / pagePostCount);

  const safeCurrentPage = Math.min(requestedPage, totalPages);

  if (requestedPage !== safeCurrentPage) {
    redirect(safeCurrentPage === 1 ? "/blog" : `/blog?page=${safeCurrentPage}`);
  }

  return <BlogPageClient posts={allPosts} currentPage={safeCurrentPage} />;
}
