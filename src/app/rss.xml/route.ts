import { allPosts } from "contentlayer/generated";
import { SITE_URL } from "@/lib/metadata";

export const dynamic = "force-static";

const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>`;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRssDate(value?: string) {
  return value ? new Date(value).toUTCString() : new Date().toUTCString();
}

function createItemXml(post: (typeof allPosts)[number]) {
  const link = `${SITE_URL}/blog/${post.slug}`;
  const description = post.excerpt?.trim() || "";

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${formatRssDate(post.publishedAt)}</pubDate>
    </item>`;
}

export async function GET() {
  const publishedPosts = allPosts.filter((post) => post.status.trim() === "published");

  const itemsXml = publishedPosts.map(createItemXml).join("\n");

  const body = `${xmlHeader}
<rss version="2.0">
  <channel>
    <title>Blogfolio RSS Feed</title>
    <link>${SITE_URL}/blog</link>
    <description>Latest posts from Blogfolio</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
