"use client";

import React, { useRef, useImperativeHandle } from "react";
import Carousel, { type CarouselHandle } from "@/components/Carousel/Carousel";
import CarouselControls from "@/components/Carousel/CarouselControls";
import BlogPostCard from "../BlogPostCard/BlogPostCard";
import { mockPosts } from "@/app/data/posts";
import Link from "next/link";

const BlogCarousel = React.forwardRef<CarouselHandle>(function BlogCarousel(_, ref) {
  const innerRef = useRef<CarouselHandle | null>(null);

  useImperativeHandle(ref, () => ({
    scrollLeft: () => innerRef.current?.scrollLeft(),
    scrollRight: () => innerRef.current?.scrollRight()
  }));

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-headline">Featured Blogs</h2>
          <CarouselControls
            onPrev={() => innerRef.current?.scrollLeft()}
            onNext={() => innerRef.current?.scrollRight()}
            className="ml-4"
          />
        </div>
        <div>
          <Link
            href="/blog"
            className="flex items-baseline gap-2 relative pb-1 text-sm lg:text-lg transition-colors text-link hover:after:absolute hover:after:bottom-px hover:after:-left-1.5 hover:after:right-0 hover:after:h-3 hover:after:bg-accent-200/70 hover:after:-z-10">
            <span>See all blogs</span>
          </Link>
        </div>
      </div>

      <Carousel ref={innerRef} hideControls>
        {mockPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </Carousel>
    </section>
  );
});

// explicit displayName for tooling and lints
BlogCarousel.displayName = "BlogCarousel";

export default BlogCarousel;
