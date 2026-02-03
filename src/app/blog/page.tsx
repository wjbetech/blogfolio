"use client";

import { useState } from "react";
import Link from "next/link";
import { mockPosts } from "@/app/data/posts";
import { Button } from "@/components/ui/button";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
import Blog from "@/components/BlogPageBlogs/Blog/Blog";

export default function BlogPage() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

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

  // Get first 5 posts (or filtered by month)
  const displayPosts = selectedMonth
    ? mockPosts
        .filter((post) => {
          const date = new Date(post.publishedAt);
          const key = `${date.getFullYear()}-${date.toLocaleString("default", { month: "long" })}`;
          return key === selectedMonth;
        })
        .slice(0, 5)
    : mockPosts.slice(0, 5);

  const toggleYear = (year: number) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const toggleMonth = (key: string) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedMonths(newExpanded);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-accent-200">Blog</h1>
      </div>

      <div className="flex gap-8">
        {/* Main content */}
        <div className="flex-1 space-y-8">
          {displayPosts.map((post) => (
            <Blog key={post.id} post={post} />
          ))}
        </div>

        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-64" : "w-12"} transition-all duration-300 relative`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-0 right-0 z-10">
            <ChevronRightIcon className={`w-4 h-4 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
          </Button>

          {sidebarOpen && (
            <div className="sticky top-24 space-y-4">
              <h3 className="text-lg font-semibold text-headline mb-4">Archives</h3>
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
                    const yearNum = Number(year);
                    const isYearExpanded = expandedYears.has(yearNum);
                    return (
                      <div key={year} className="space-y-1">
                        <div
                          className="text-sm font-semibold text-headline mt-3 mb-2 flex items-center gap-2 cursor-pointer hover:text-main transition-colors"
                          onClick={() => toggleYear(yearNum)}>
                          <ChevronRightIcon
                            className={`w-3 h-3 transition-transform ${isYearExpanded ? "rotate-90" : ""}`}
                          />
                          {year}
                        </div>
                        {isYearExpanded &&
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
          )}
        </aside>
      </div>
    </div>
  );
}
