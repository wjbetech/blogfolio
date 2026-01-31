import Carousel from "@/components/Carousel/Carousel";
import BlogPostCard from "../BlogPostCard/BlogPostCard";
import { mockPosts } from "@/app/data/posts";

export default function BlogCarousel() {
  return (
    <section className="">
      <h2 className="text-2xl font-bold mt-4">Blog Posts</h2>
      <Carousel>
        {mockPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </Carousel>
    </section>
  );
}
