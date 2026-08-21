# SEO and public discovery

Blogfolio's SEO surfaces are generated from the application and Contentlayer content. The canonical public domain is:

```text
https://wjbeast.com
```

The `NEXT_PUBLIC_SITE_URL` environment variable controls absolute URL generation. The code fallback default is the canonical domain `https://wjbeast.com`, matching the Docker build arg and Compose environment.

## Current mechanisms

### Metadata

`src/lib/metadata.ts` provides shared metadata builders for:

- the site
- the blog index
- the `/dev` project index
- blog posts
- project detail pages

Metadata includes titles, descriptions, canonical URLs, Open Graph data, Twitter card data, and RSS autodiscovery.

Project detail metadata must use:

```text
/dev/[slug]
```

`/portfolio/[slug]` is a legacy redirect and must not be emitted as a canonical URL.

### Robots

`src/app/robots.ts` allows crawling and points crawlers to:

```text
https://wjbeast.com/sitemap.xml
```

### Sitemap

`src/app/sitemap.xml/route.ts` emits the home page, blog index, `/dev`, published blog posts, and published project detail URLs.

The intended publication contract is that drafts are excluded. Draft URLs must not be added to the sitemap.

The project URL form is:

```text
https://wjbeast.com/dev/[slug]
```

### RSS

`/rss.xml` emits published blog posts sorted newest first. Draft posts must not appear in the feed.

### Structured data

`src/lib/metadataHelper.ts` creates:

- `BlogPosting` data for blog posts
- `Person` data for the site owner
- `WebSite` data for the homepage
- `CollectionPage`/`ItemList` data for the `/dev` project collection

Project structured-data URLs must use `/dev/[slug]`, and draft projects must be excluded from collections.

JSON-LD is serialized with `<` escaped before insertion into the page.

### Images

The default metadata image is the local:

```text
/images/assets/placeholder.png
```

A post uses its non-empty `coverImage` first, then its first `images` entry, then the default fallback. Project metadata uses the first project image when available.

## Publication boundary

Public discovery must be derived from published content only. A draft must not be exposed through:

- list pages
- homepage sections
- archive or tag navigation
- previous/next navigation
- RSS
- sitemap
- JSON-LD collections
- generated public detail routes

The publication boundary is enforced centrally through `src/lib/content.ts` and covered by tests (`tests/lib/content.test.ts`, `tests/routes/sitemap.test.ts`, `tests/routes/rss.test.ts`).

## Known limitations and future work

- The repository has no automated crawler or deployed-route smoke test.
- The production domain and homelab are operational, but runtime search-engine indexing cannot be verified from the repository.
- Blog structured data can be improved once the article renderer and author/image model are settled.
- Project content and links need a content-quality review before treating every project as polished portfolio evidence.
- `/portfolio` redirects should remain available for legacy links, but `/dev` is the only canonical project section.
