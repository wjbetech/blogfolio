import ProjectCarousel from "@/components/Projects/ProjectCarousel/ProjectCarousel";
import { createPortfolioMetadata } from "@/lib/metadata";

import { allProjects } from "contentlayer/generated";
import { serializeJsonLd, toAbsoluteStructuredDataUrl, toAbsoluteStructuredDataUrls } from "@/lib/metadataHelper";

export const metadata = createPortfolioMetadata();

export default function PortfolioPage() {
  const portfolioUrl = toAbsoluteStructuredDataUrl("/portfolio");

  const publishedProjects = allProjects.filter((project) => project.status.trim() === "published");

  const itemListElements = publishedProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: toAbsoluteStructuredDataUrl(`/portfolio/${project.slug}`),
    item: {
      "@type": "CreativeWork",
      name: project.title,
      url: toAbsoluteStructuredDataUrl(`/portfolio/${project.slug}`),
      description: project.description,
      image: toAbsoluteStructuredDataUrls(project.images ?? [])[0] || undefined
    }
  }));

  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dev Portfolio | BlogFolio",
    description: "A showcase of my projects, including web applications, open-source contributions, and more.",
    url: portfolioUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: itemListElements.length,
      itemListElement: itemListElements
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="relative pb-1 text-3xl font-semibold text-headline transition-colors duration-200 after:absolute after:bottom-px after:left-0 after:right-0 after:h-1 after:bg-accent-100/60 after:origin-left after:transform after:scale-x-0 after:transition-transform after:duration-200 after:-z-10 hover:text-accent-100 hover:after:scale-x-100">
          Projects
        </h2>
      </div>

      <ProjectCarousel />
    </div>
  );
}
