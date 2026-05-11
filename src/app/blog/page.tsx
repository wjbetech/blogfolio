import { allPosts } from "contentlayer/generated";
import { createBlogListMetadata } from "@/lib/metadata";
import BlogPageClient from "./BlogPageClient";

export const metadata = createBlogListMetadata();

type BlogPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawPage = resolvedSearchParams?.page ?? "1";
  const currentPage = Math.max(1, Number(rawPage) || 1);

  return <BlogPageClient posts={allPosts} currentPage={currentPage} />;
}
