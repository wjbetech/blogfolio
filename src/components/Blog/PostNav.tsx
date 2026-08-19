import Link from "next/link";
import React from "react";
import type { Post } from "contentlayer/generated";
import { sortBlogPosts } from "@/lib/blogPagination";
import { getPublishedPosts } from "@/lib/content";

type Props = {
  posts: Post[];
  slug: string;
};

export default function PostNav({ posts, slug }: Props) {
  if (!posts || posts.length === 0) return null;

  const sorted = sortBlogPosts(getPublishedPosts(posts));
  const index = sorted.findIndex((p) => p.slug === slug);

  const prev = index < sorted.length - 1 ? sorted[index + 1] : null; // older
  const next = index > 0 ? sorted[index - 1] : null; // newer

  return (
    <nav className="mt-10 border-t border-accent-100/15 pt-8 flex flex-col sm:flex-row justify-between gap-6">
      {prev ? (
        <Link href={`/blog/${prev.slug}`} className="group flex-1 min-w-0">
          <div className="text-xs uppercase tracking-widest text-paragraph/40">← Older</div>
          <div className="mt-1.5 font-serif font-medium leading-snug text-link group-hover:text-headline line-clamp-2">{prev.title}</div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link href={`/blog/${next.slug}`} className="group flex-1 min-w-0 text-right">
          <div className="text-xs uppercase tracking-widest text-paragraph/40">Newer →</div>
          <div className="mt-1.5 font-serif font-medium leading-snug text-link group-hover:text-headline line-clamp-2">{next.title}</div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
