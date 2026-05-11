import { allPosts } from "contentlayer/generated";
import { createBlogListMetadata } from "@/lib/metadata";
import BlogPageClient from "./BlogPageClient";

export const metadata = createBlogListMetadata();

export default function BlogPage({ searchParams }: { searchParams?: { page?: string } }) {
  const rawPage = searchParams?.page ?? "1";
  const currentPage = Math.max(1, Number(rawPage) || 1);

  return <BlogPageClient posts={allPosts} currentPage={currentPage} />;
}
