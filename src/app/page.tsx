import Hero from "@/components/Hero/Hero";
import BlogCarousel from "@/components/HomePageBlogs/BlogCarousel/BlogCarousel";
import ProjectCarousel from "@/components/Projects/ProjectCarousel/ProjectCarousel";
import { createPersonJsonLd, createWebSiteJsonLd, serializeJsonLd } from "@/lib/metadataHelper";
import { getPublishedBlogCards, getPublishedProjectCards } from "@/lib/homeCards";

export default function Page() {
  const personJsonLd = createPersonJsonLd();
  const webSiteJsonLd = createWebSiteJsonLd();
  const blogCards = getPublishedBlogCards();
  const projectCards = getPublishedProjectCards();

  return (
    <div className="min-h-screen space-y-10 md:space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(webSiteJsonLd) }} />

      <Hero />
      <BlogCarousel posts={blogCards} />
      <ProjectCarousel projects={projectCards} />
    </div>
  );
}
