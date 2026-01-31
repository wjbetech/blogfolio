import Hero from "@/components/Hero/Hero";
import BlogCarousel from "@/components/Blogs/BlogCarousel/BlogCarousel";
import ProjectCarousel from "@/components/Projects/ProjectCarousel/ProjectCarousel";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />

      <div className="max-w-7xl mx-auto space-y-10 px-4">
        <BlogCarousel />
        <ProjectCarousel />
      </div>
    </main>
  );
}
