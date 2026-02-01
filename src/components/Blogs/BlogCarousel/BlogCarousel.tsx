import React from "react";
import Carousel, { CarouselHandle } from "@/components/Carousel/Carousel";
import BlogPostCard from "../BlogPostCard/BlogPostCard";
import { mockPosts } from "@/app/data/posts";

const BlogCarousel = React.forwardRef<CarouselHandle>(function BlogCarousel(_, ref) {
  return (
    <section className="">
      <h2 className="text-2xl font-bold mt-4">Blog Posts</h2>
      <Carousel ref={ref}>
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
