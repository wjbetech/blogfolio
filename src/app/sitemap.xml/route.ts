import { allPosts, allProjects } from "contentlayer/generated";
import { SITE_URL } from "@/lib/metadata";
import { getPublishedPosts, getPublishedProjects } from "@/lib/content";

const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>`;
const urlsetOpen = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const urlsetClose = `</urlset>`;

const formatDate = (value?: string) => (value ? new Date(value).toISOString() : new Date().toISOString());

const createUrlEntry = (path: string, lastmod?: string, priority = "0.7") => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${formatDate(lastmod)}</lastmod>
    <priority>${priority}</priority>
  </url>`;

export async function GET() {
  const postEntries = getPublishedPosts(allPosts).map((post) =>
    createUrlEntry(`/blog/${post.slug}`, post.updatedAt ?? post.publishedAt)
  );
  const projectEntries = getPublishedProjects(allProjects).map((project) =>
    createUrlEntry(`/dev/${project.slug}`, project.updatedAt ?? project.publishedAt, "0.6")
  );

  const urls = [
    createUrlEntry("/", undefined, "1.0"),
    createUrlEntry("/blog", undefined, "0.8"),
    createUrlEntry("/dev", undefined, "0.8"),
    ...postEntries,
    ...projectEntries
  ].join("\n");

  const body = `${xmlHeader}\n${urlsetOpen}\n${urls}\n${urlsetClose}`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
