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
      {/* JSON-LD is type="application/ld+json" (not executable JS) so it does not
          require a CSP nonce and omitting it avoids a false hydration mismatch
          where the browser hides nonce attribute values after parsing. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(webSiteJsonLd) }} />

      <Hero />
      <BlogCarousel posts={blogCards} />
      <ProjectCarousel projects={projectCards} />
    </div>
  );
}
