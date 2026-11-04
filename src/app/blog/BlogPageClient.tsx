"use client";

import Link from "next/link";
import type { Post } from "contentlayer/generated";
import { getPostSnippet } from "@/lib/post";
import { getPublishedPosts } from "@/lib/content";
import { formatShortDate } from "@/lib/date";
import { sortBlogPosts, splitFeaturedPost, getBlogTotalPages, clampBlogPage, getPaginatedBlogPosts } from "@/lib/blogPagination";
import styles from "./WritingList.module.css";

interface BlogPageClientProps { posts: Post[]; currentPage: number; }

export default function BlogPageClient({ posts, currentPage }: BlogPageClientProps) {
  const sortedPosts = sortBlogPosts(getPublishedPosts(posts));
  const { featuredPost, remainingPosts } = splitFeaturedPost(sortedPosts);
  const totalPages = getBlogTotalPages(remainingPosts.length);
  const safeCurrentPage = clampBlogPage(currentPage, totalPages);
  const visiblePosts = [...(safeCurrentPage === 1 && featuredPost ? [featuredPost] : []), ...getPaginatedBlogPosts(remainingPosts, safeCurrentPage)];
  const years = Array.from(new Set(sortedPosts.map((post) => new Date(post.publishedAt).getUTCFullYear()))).sort((a, b) => b - a);
  const pageHref = (page: number) => `/blog${page === 1 ? "" : `?page=${page}`}`;

  return (
    <div className={styles.writing}>
      <header className={styles.header}>
        <h1>Writing</h1>
        <p>{sortedPosts.length ? "Notes on software, life and work in Korea." : "No posts yet — check back soon."}</p>
      </header>
      {sortedPosts.length > 0 && <>
        <aside className={styles.archive} aria-label="Writing archive">
          <h2>Archive</h2>
          <nav>
            {years.map((year) => <details key={year}>
              <summary>{year}</summary>
              {sortedPosts.filter((post) => new Date(post.publishedAt).getUTCFullYear() === year).map((post) => <Link key={post.id} href={`/blog/${post.slug}`}>{post.title}</Link>)}
            </details>)}
          </nav>
        </aside>
        <section aria-label="Articles" className={styles.posts}>
          {visiblePosts.map((post) => <article key={post.id} className={styles.post}>
            <div className={styles.meta}>
              <time dateTime={post.publishedAt}>{formatShortDate(post.publishedAt)}</time>
              <span>{post.readingTime} min read</span>
            </div>
            <div className={styles.content}>
              <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p>{getPostSnippet(post, 200)}</p>
              <div className={styles.actions}>
                <Link className={styles.read} href={`/blog/${post.slug}`}>Read Article</Link>
                <span className={styles.postTags}>{(post.tags ?? []).slice(0, 2).join(" · ")}</span>
              </div>
            </div>
          </article>)}
          {visiblePosts.length === 0 && <p>No posts found for this filter.</p>}
        </section>
        {totalPages > 1 && <nav aria-label="Pagination" className={styles.pagination}>
          {safeCurrentPage > 1 && <Link aria-label="Previous page" href={pageHref(safeCurrentPage - 1)}>Previous</Link>}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => <Link key={page} href={pageHref(page)} aria-current={page === safeCurrentPage ? "page" : undefined}>{page}</Link>)}
          {safeCurrentPage < totalPages && <Link aria-label="Next page" href={pageHref(safeCurrentPage + 1)}>Next</Link>}
        </nav>}
      </>}
    </div>
  );
}
