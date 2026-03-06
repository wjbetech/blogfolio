import { allPosts } from "contentlayer/generated";
import { createBlogListMetadata } from "@/lib/metadata";
import BlogPageClient from "./BlogPageClient";

export const metadata = createBlogListMetadata();

export default function BlogPage() {
  return <BlogPageClient posts={allPosts} />;
}
