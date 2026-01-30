import Header from "@/components/Header/Header";
import BlogCarousel from "@/components/Blogs/BlogCarousel/BlogCarousel";
import ProjectCarousel from "@/components/Projects/ProjectCarousel/ProjectCarousel";

export default function Page() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_32px_repeat(3,1fr)] items-start gap-y-6 py-12">
      {/* Profile column (fixed width) */}
      <aside className="md:col-span-1">
        <Header />
      </aside>

      {/* Content area spans the remaining 3 columns */}
      <section className="md:col-start-3 md:col-span-3 space-y-6">
        <BlogCarousel />
        <ProjectCarousel />
      </section>
    </main>
  );
}
