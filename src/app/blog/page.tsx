"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowUpRight, IconCalendar, IconTag } from "@tabler/icons-react";
import { mockPosts } from "@/app/data/posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";

export default function BlogPage() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  // Archives are always expanded; we no longer track expandedYears/expandedMonths

  // Group posts by year and month
  const groupedPosts = mockPosts.reduce(
    (acc, post) => {
      const date = new Date(post.publishedAt);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];
      acc[year][month].push(post);

      return acc;
    },
    {} as Record<number, Record<string, typeof mockPosts>>
  );

  const sortedPosts = [...mockPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const displayPosts = selectedMonth
    ? sortedPosts.filter((post) => {
        const date = new Date(post.publishedAt);
        const key = `${date.getFullYear()}-${date.toLocaleString("default", { month: "long" })}`;
        return key === selectedMonth;
      })
    : sortedPosts;

  const toggleYear = (year: number) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) newExpanded.delete(year);
    else newExpanded.add(year);
    setExpandedYears(newExpanded);
  };

  const toggleMonth = (key: string) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(key)) newExpanded.delete(key);
    else newExpanded.add(key);
    setExpandedMonths(newExpanded);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-12">
        {/* Main content */}
        <section className="flex-1 mt-4 pr-12 border-r border-accent-100/30">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent-200/80">Journal</p>
              <h1 className="text-3xl md:text-4xl font-semibold font-serif text-headline">Blog</h1>
              <p className="text-sm md:text-base text-paragraph max-w-2xl">
                Minimal notes on design, engineering, and the ideas behind the work.
              </p>
            </div>

            <Separator className="bg-accent-100/40" />

            {selectedMonth && (
              <div className="flex items-center gap-2 text-xs text-paragraph">
                <span className="inline-flex h-2 w-2 rounded-full bg-accent-200" />
                Filtered to <span className="text-headline font-medium">{selectedMonth.replace("-", " ")}</span>
                <Button variant="ghost" size="xs" className="ml-2" onClick={() => setSelectedMonth(null)}>
                  Clear
                </Button>
              </div>
            )}

            <div className="space-y-6">
              {displayPosts.map((post) => {
                const dateLabel = new Date(post.publishedAt).toLocaleDateString("default", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric"
                });

                return (
                  <Card key={post.id} className="border border-accent-100/30 bg-bg-200/30 shadow-none">
                    <CardHeader className="px-6 pt-6">
                      <div className="flex items-center gap-2 text-xs text-paragraph">
                        <IconCalendar className="h-4 w-4" />
                        <time dateTime={post.publishedAt}>{dateLabel}</time>
                      </div>
                      <CardTitle className="text-xl md:text-2xl text-headline mt-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 hover:text-accent-200 transition-colors">
                          {post.title}
                          <IconArrowUpRight className="h-4 w-4" />
                        </Link>
                      </CardTitle>
                      <CardAction className="mt-2">
                        <Button asChild variant="ghost" size="sm" className="text-headline">
                          <Link href={`/blog/${post.slug}`}>Read</Link>
                        </Button>
                      </CardAction>
                    </CardHeader>
                    <CardContent className="px-6 text-sm text-paragraph">{post.excerpt}</CardContent>
                    <CardFooter className="px-6 bg-transparent">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs text-paragraph">
                          <IconTag className="h-3.5 w-3.5" />
                          Tags
                        </span>
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-accent-100/40 text-paragraph">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="w-64 transition-all duration-300 relative mt-4">
          <div className="sticky top-24 space-y-4">
            <h3 className="text-lg font-semibold font-serif text-accent-100 mb-4">Archives</h3>
            <div className="space-y-2">
              <Button
                variant={selectedMonth === null ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedMonth(null)}>
                All Posts
              </Button>
              {Object.entries(groupedPosts)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, months]) => {
                  return (
                    <div key={year} className="space-y-1">
                      <div
                        className="text-sm font-semibold text-headline mt-3 mb-2 flex items-center gap-2 cursor-pointer hover:text-main transition-colors"
                        onClick={() => toggleYear(Number(year))}>
                        <ChevronRightIcon
                          className={`w-3 h-3 transition-transform ${expandedYears.has(Number(year)) ? "rotate-90" : ""}`}
                        />
                        {year}
                      </div>
                      {expandedYears.has(Number(year)) &&
                        Object.entries(months).map(([month, posts]) => {
                          const key = `${year}-${month}`;
                          const isMonthExpanded = expandedMonths.has(key);
                          return (
                            <div key={key} className="ml-4 space-y-1">
                              <div
                                className="flex items-center gap-2 text-sm text-paragraph hover:text-headline transition-colors cursor-pointer py-1"
                                onClick={() => toggleMonth(key)}>
                                <span className="flex-1">{month}</span>
                                <span className="text-xs">({posts.length})</span>
                                <ChevronRightIcon
                                  className={`w-3 h-3 transition-transform ${isMonthExpanded ? "rotate-90" : ""}`}
                                />
                              </div>
                              {isMonthExpanded && (
                                <div className="ml-5 space-y-1">
                                  {posts.map((post) => (
                                    <Link
                                      key={post.id}
                                      href={`/blog/${post.slug}`}
                                      className="block text-sm text-paragraph hover:text-main transition-colors py-1 truncate">
                                      {post.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
