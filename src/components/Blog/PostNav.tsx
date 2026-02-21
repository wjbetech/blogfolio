import Link from "next/link";
import React from "react";
import type { Post } from "contentlayer/generated";

type Props = {
  posts: Post[];
  slug: string;
};

export default function PostNav({ posts, slug }: Props) {
  if (!posts || posts.length === 0) return null;

  // Sort posts by published date descending (newest first)
  const sorted = [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const index = sorted.findIndex((p) => p.slug === slug);

  const prev = index < sorted.length - 1 ? sorted[index + 1] : null; // older
  const next = index > 0 ? sorted[index - 1] : null; // newer

  return (
    <nav className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group block rounded-lg border border-accent-100/10 p-4 hover:bg-bg-100 transition-colors">
          <div className="text-xs text-paragraph/70">Previous</div>
          <div className="mt-1 font-medium text-link group-hover:text-headline">{prev.title}</div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group block text-right rounded-lg border border-accent-100/10 p-4 hover:bg-bg-100 transition-colors">
          <div className="text-xs text-paragraph/70">Next</div>
          <div className="mt-1 font-medium text-link group-hover:text-headline">{next.title}</div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
