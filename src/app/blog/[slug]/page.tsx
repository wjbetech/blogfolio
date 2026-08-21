import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { createBlogListMetadata, generatePostMetadata } from "@/lib/metadata";
import { createBlogPostingJsonLd, serializeJsonLd } from "@/lib/metadataHelper";
import { getPublishedPosts } from "@/lib/content";

import { allPosts } from "contentlayer/generated";
import BlogPostView from "@/components/Blog/BlogPostView";

export async function generateStaticParams() {
  return getPublishedPosts(allPosts).map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPosts(allPosts).find((candidate) => candidate.slug === slug);
  if (!post) {
    return createBlogListMetadata();
  }

  return generatePostMetadata(post);
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPublishedPosts(allPosts).find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const blogPostingJsonLd = createBlogPostingJsonLd(post);
  const allPublished = getPublishedPosts(allPosts);
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogPostingJsonLd) }} />
      <BlogPostView post={post} allPosts={allPublished} />
    </>
  );
}
