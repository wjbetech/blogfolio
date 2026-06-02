# SEO

A plain-English explanation of what SEO is, what blogfolio already does, what gaps remain, and what each piece actually does for you.

---

## What is SEO and why does it matter?

SEO (Search Engine Optimisation) is the practice of making your site readable by machines — Google, Bing, and social media platforms like LinkedIn and X/Twitter — as well as humans.

When Google crawls your site, it reads special tags and files to understand:

- What each page is about
- What image to show when the page is shared on social media
- What order to index your pages in
- Whether it's allowed to index the page at all

When you share a blog post link on LinkedIn and it shows a title, description, and preview image automatically — that's your OG (Open Graph) tags working.

When your post shows up on Google with the right title and summary — that's your `<title>` tag and `description` meta tag working.

When a podcast app or RSS reader like Feedly picks up your new posts automatically — that's your RSS feed working.

---

## What blogfolio already has

Everything below ships today. No action needed.

### ✅ `robots.txt`

**What it is:** A plain text file that tells search engine crawlers whether they're allowed to index your site, and where to find the sitemap.

**What it does here:** Allows all crawlers on all pages, and points to the sitemap.

**File:** `src/app/robots.ts`

---

### ✅ XML Sitemap

**What it is:** A file that lists every public URL on your site with a priority score and last-modified date. Google uses this to discover and re-index your pages.

**What it does here:** Lists the home page (priority 1.0), blog list (0.8), all blog post URLs, and all project URLs. Updated automatically at build time from Contentlayer data.

**File:** `src/app/sitemap.xml/route.ts`

---

### ✅ RSS Feed

**What it is:** A machine-readable feed of your latest posts. RSS readers (Feedly, NetNewsWire, etc.) and some podcast/newsletter tools poll this to show your new content to subscribers automatically.

**What it does here:** Returns an RSS 2.0 XML feed of all published posts, sorted newest first. Only posts with `status: published` are included.

**URL:** `/rss.xml`

**File:** `src/app/rss.xml/route.ts`

---

### ✅ Open Graph tags (OG)

**What they are:** HTML `<meta>` tags in the `<head>` of every page that tell social media platforms what title, description, and image to show when someone shares your URL. Without these, LinkedIn and Twitter will just pick random text and images from the page, and it will look unprofessional.

**What they do here:** Every page gets `og:title`, `og:description`, `og:image`, and `og:url`. Blog posts also get `og:type: article`.

**File:** `src/lib/metadata.ts` → `buildMetadata()`

---

### ✅ Twitter/X card tags

**What they are:** A Twitter-specific set of meta tags. When you paste a link into a tweet, Twitter reads these to show a large image preview card (`summary_large_image`).

**What they do here:** Every page gets a large image card attributed to `@wjbetech`.

**File:** `src/lib/metadata.ts`

---

### ✅ Canonical URLs

**What they are:** A `<link rel="canonical">` tag that tells Google "this is the definitive URL for this content". Prevents duplicate-content penalties if your site is ever accessible via multiple URLs (e.g., `www.` vs non-`www.`).

**What they do here:** Every page sets its canonical to `SITE_URL + path`.

**File:** `src/lib/metadata.ts` → `buildMetadata()`

---

### ✅ RSS autodiscovery link

**What it is:** A `<link>` tag in every page's `<head>` pointing to the RSS feed. RSS readers use this to discover your feed automatically when someone pastes your homepage URL into them.

**What it does here:** Added to every page via `alternates.types` in `buildMetadata()`.

---

### ✅ Article JSON-LD (structured data)

**What it is:** A block of JSON embedded in the page that describes the content in a format Google understands at a deeper level than just reading text. It can unlock "rich results" — things like article dates, author names, and breadcrumbs appearing directly in Google search results.

**What it does here:** Blog post pages emit a `BlogPosting` schema object containing title, description, publish date, updated date, image URLs, and tags.

**File:** `src/lib/metadataHelper.ts` → `createBlogPostingJsonLd()`

---

### ✅ Projects collection JSON-LD

**What it does:** The `/dev` and `/portfolio` pages emit a `CollectionPage` + `ItemList` schema describing all projects with names, descriptions, images, and links.

**File:** `src/lib/metadataHelper.ts` → `createProjectsCollectionJsonLd()`

---

### ✅ Heading anchors

**What they are:** Stable `#id` links on every heading in a blog post, so readers can link directly to a specific section. Google also uses heading structure to understand what a page covers.

**Status:** Already implemented and merged (`feat/blog-heading-anchors`).

---

## Previously fixed gaps

| Gap | PR | Status |
|-----|-----|--------|
| `SITE_URL` hardcoded to wrong domain | `fix/site-url-env` | ✅ Fixed — now reads `NEXT_PUBLIC_SITE_URL` from env |
| Default OG image was an external Unsplash URL | `fix/image-fallback` | ✅ Fixed — now uses local `/images/assets/placeholder.png` |
| `/portfolio/[slug]` pages returned 404 | `feature/portfolio-slug` | ✅ Fixed — static project detail pages exist |
| No `Person` or `WebSite` JSON-LD | `feature/person-jsonld` | ✅ Fixed — both schemas injected on home page |
