import Hero from "@/components/Hero/Hero";
import BlogCarousel from "@/components/HomePageBlogs/BlogCarousel/BlogCarousel";
import ProjectCarousel from "@/components/Projects/ProjectCarousel/ProjectCarousel";
import { createPersonJsonLd, createWebSiteJsonLd, serializeJsonLd } from "@/lib/metadataHelper";

export default function Page() {
  const personJsonLd = createPersonJsonLd();
  const webSiteJsonLd = createWebSiteJsonLd();

  return (
    <main className="min-h-screen max-w-7xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(webSiteJsonLd) }} />

      <Hero />

      <div className="max-w-7xl mx-auto space-y-10 md:space-y-14">
        <BlogCarousel />
        <ProjectCarousel />
      </div>
    </main>
  );
}
