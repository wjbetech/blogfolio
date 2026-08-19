"use client";

import React, { useRef, useImperativeHandle } from "react";
import Carousel, { type CarouselHandle } from "@/components/Carousel/Carousel";
import CarouselControls from "@/components/Carousel/CarouselControls";
import BlogPostCard from "../BlogPostCard/BlogPostCard";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/content";

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
          <h2 className="text-2xl font-semibold font-serif text-headline">Featured Blogs</h2>
          <CarouselControls
            onPrev={() => innerRef.current?.scrollLeft()}
            onNext={() => innerRef.current?.scrollRight()}
            className="ml-4"
          />
        </div>
        <div>
          <Link
            href="/blog"
            className="flex items-baseline gap-2 relative pb-1 text-sm lg:text-lg transition-colors text-link after:absolute after:bottom-px after:-left-1.5 after:right-0 after:h-3 after:bg-accent-100/50 after:origin-left after:transform after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 after:-z-10">
            <span>See all blogs</span>
          </Link>
        </div>
      </div>

      <Carousel ref={innerRef} hideControls>
        {getPublishedPosts(allPosts).map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </Carousel>
    </section>
  );
});

// explicit displayName for tooling and lints
BlogCarousel.displayName = "BlogCarousel";

export default BlogCarousel;
