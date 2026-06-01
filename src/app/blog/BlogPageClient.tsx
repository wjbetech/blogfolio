"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowRight, IconCalendar, IconClock } from "@tabler/icons-react";
import type { Post } from "contentlayer/generated";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
import { getPostReadingTime, getPostSnippet } from "@/lib/post";
import {
  sortBlogPosts,
  splitFeaturedPost,
  getBlogTotalPages,
  clampBlogPage,
  getPaginatedBlogPosts
} from "@/lib/blogPagination";

interface BlogPageClientProps {
  posts: Post[];
  currentPage: number;
}

export default function BlogPageClient({ posts, currentPage }: BlogPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());

  // sort posts by published date & extract their tags
  const sortedPosts = sortBlogPosts(posts);
  const allTags = Array.from(new Set(sortedPosts.flatMap((post) => post.tags ?? [])));

  const { featuredPost, remainingPosts } = splitFeaturedPost(sortedPosts);

  const filteredPosts = selectedTag
    ? remainingPosts.filter((post) => (post.tags ?? []).includes(selectedTag))
    : remainingPosts;

  const totalPages = getBlogTotalPages(remainingPosts.length);
  const safeCurrentPage = clampBlogPage(currentPage, totalPages);
  const paginatedPosts = getPaginatedBlogPosts(filteredPosts, safeCurrentPage);
  const visiblePosts = selectedTag ? filteredPosts : paginatedPosts;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const createPageHref = (page: number) => `/blog${page === 1 ? "" : `?page=${page}`}`;

  if (sortedPosts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <header className="pb-10 space-y-3">
          <h1 className="text-4xl font-bold font-serif text-headline tracking-tight">Blog</h1>
          <p className="text-base text-paragraph max-w-lg leading-relaxed">No posts yet — check back soon.</p>
        </header>
      </div>
    );
  }

  const groupedByYear = sortedPosts.reduce(
    (acc, post) => {
      const year = new Date(post.publishedAt).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, Post[]>
  );

  const toggleYear = (year: number) => {
    const next = new Set(expandedYears);
    if (next.has(year)) next.delete(year);
    else next.add(year);
    setExpandedYears(next);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

  return (
    <div className="max-w-7xl mx-auto pb-8">
      <header className="pb-10 space-y-3">
        <h1 className="text-4xl font-bold font-serif text-headline tracking-tight">Blog</h1>
        <p className="text-base text-paragraph max-w-lg leading-relaxed">Notes on software, life and work in Korea.</p>
      </header>

      <div className="flex gap-14 lg:gap-16">
        <section className="flex-1 min-w-0">
          {safeCurrentPage === 1 && !selectedTag && featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="group block mb-8">
              <article className="bg-bg-200/60 border border-accent-100/10 transition-shadow duration-300 hover:shadow-lg p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-sm text-paragraph/70">
                    <time className="tabular-nums">{formatDate(featuredPost.publishedAt)}</time>
                    <span className="text-[13px] flex items-center gap-2 text-paragraph/60">
                      <IconClock className="h-4 w-4" /> {getPostReadingTime(featuredPost)} min read
                    </span>
                  </div>

                  <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-semibold font-serif text-headline leading-tight group-hover:text-accent-200 transition-colors duration-200">
                      {featuredPost.title}
                    </h2>
                    <div className="hidden sm:flex items-center pt-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200">
                      <IconArrowRight className="h-4 w-4 text-accent-200" />
                    </div>
                  </div>

                  <p className="text-lg text-paragraph/85 leading-relaxed max-w-3xl">
                    {getPostSnippet(featuredPost, 400)}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap mt-2">
                    {(featuredPost.tags ?? []).slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] px-3 py-1 rounded-full border border-accent-100/20 text-paragraph/70 bg-bg-100/50">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-link font-medium">Read full article</span>
                      <IconArrowRight className="h-4 w-4 text-accent-200" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {selectedTag && (
            <div className="flex items-center gap-2 mb-6 text-xs text-paragraph">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-200" />
              Showing posts tagged&nbsp;
              <span className="text-headline font-medium">{selectedTag}</span>
              <button
                onClick={() => setSelectedTag(null)}
                className="ml-1 underline underline-offset-2 text-link hover:text-headline transition-colors">
                clear
              </button>
            </div>
          )}

          <div className="space-y-4">
            {visiblePosts.map((post, i) => {
              const dateLabel = formatDate(post.publishedAt);
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block bg-bg-200 px-2">
                  <article
                    className={`flex items-start gap-5 py-6 transition-colors duration-200 ${
                      i < visiblePosts.length - 1 ? "border-b border-accent-100/15" : ""
                    }`}>
                    <div className="hidden sm:block w-24 shrink-0 pl-4">
                      <time className="text-xs text-paragraph/60 tabular-nums" dateTime={post.publishedAt}>
                        {dateLabel}
                      </time>
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className="text-xl font-semibold text-headline leading-snug group-hover:text-accent-200 transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-sm text-paragraph/80 leading-relaxed line-clamp-2">
                        {getPostSnippet(post, 160)}
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="sm:hidden text-[11px] text-paragraph/50 flex items-center gap-1">
                          <IconCalendar className="h-3 w-3" />
                          {dateLabel}
                        </span>
                        <span className="text-[11px] text-paragraph/50 flex items-center gap-1">
                          <IconClock className="h-3 w-3" /> {getPostReadingTime(post)} min
                        </span>
                        {(post.tags ?? []).slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] px-2 py-0.5 rounded-full border border-accent-100/20 text-paragraph/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center pt-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200 pr-4">
                      <IconArrowRight className="h-4 w-4 text-accent-200" />
                    </div>
                  </article>
                </Link>
              );
            })}

            {visiblePosts.length === 0 && (
              <p className="py-12 text-center text-sm text-paragraph/60">No posts found for this filter.</p>
            )}
          </div>
        </section>

        <div className="hidden lg:block w-0.5 bg-accent-200/50 self-stretch" />

        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h4 className="text-base font-semibold font-serif uppercase tracking-widest text-paragraph/50 mb-4">
                Archive
              </h4>
              <nav className="space-y-1">
                {Object.entries(groupedByYear)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .map(([year, posts]) => {
                    const isOpen = expandedYears.has(Number(year));
                    return (
                      <div key={year}>
                        <button
                          onClick={() => toggleYear(Number(year))}
                          className="w-full flex items-center justify-between py-2 text-sm text-headline hover:text-accent-200 transition-colors group/year cursor-pointer">
                          <span className="font-medium font-serif">{year}</span>
                          <span className="flex items-center gap-1.5">
                            <span className="text-[11px] text-paragraph/40 tabular-nums">{posts.length}</span>
                            <ChevronRightIcon
                              className={`w-3 h-3 text-paragraph/30 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                            />
                          </span>
                        </button>
                        {isOpen && (
                          <ul className="ml-1 border-l border-accent-100/15 pl-3 pb-2 space-y-0.5">
                            {posts.map((post) => (
                              <li key={post.id}>
                                <Link
                                  href={`/blog/${post.slug}`}
                                  className="block py-1.5 text-[13px] text-paragraph/70 hover:text-headline transition-colors truncate">
                                  {post.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
              </nav>
            </div>

            <div>
              <h4 className="text-base font-semibold font-serif uppercase tracking-widest text-paragraph/50 mb-4">
                Topics
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-[border-color] cursor-pointer duration-200 text-paragraph ${
                      selectedTag === tag
                        ? "border-button"
                        : "border-accent-100/25 hover:border-accent-100/50 hover:text-headline"
                    }`}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {totalPages > 1 && !selectedTag && (
        <nav aria-label="Pagination" className="flex justify-center mt-12 gap-3 items-center">
          {safeCurrentPage > 1 ? (
            <Link
              aria-label="Previous page"
              href={createPageHref(safeCurrentPage - 1)}
              className="flex items-center gap-1 text-sm text-link hover:text-headline transition-colors">
              ←
            </Link>
          ) : (
            <span
              aria-disabled="true"
              aria-label="Previous page"
              className="flex items-center gap-1 text-sm text-link/30 cursor-not-allowed">
              ←
            </span>
          )}

          <div>
            {pageNumbers.map((pageNumber) => (
              <Link
                key={pageNumber}
                href={createPageHref(pageNumber)}
                className={`mx-1 px-3 border gap-2 border-button py-2 text-sm ${pageNumber === safeCurrentPage ? "bg-button/50 text-white" : "text-link hover:text-headline transition-colors"}`}>
                {pageNumber}
              </Link>
            ))}
          </div>

          {safeCurrentPage < totalPages ? (
            <Link
              aria-label="Next page"
              href={createPageHref(safeCurrentPage + 1)}
              className="flex items-center gap-1 text-sm text-link hover:text-headline transition-colors">
              →
            </Link>
          ) : (
            <span
              aria-disabled="true"
              aria-label="Next page"
              className="flex items-center gap-1 text-sm text-link/30 cursor-not-allowed">
              →
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
