"use client";

import BlogCarousel from "@/components/Blogs/BlogCarousel/BlogCarousel";

export default function BlogPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-headline">Blog</h2>
      </div>

      <div>
        <BlogCarousel />
      </div>
    </>
  );
}
