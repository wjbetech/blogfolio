# Architecture

A description of the blogfolio tech stack, app routes, content pipeline, and how data flows from Markdown files through to rendered pages.

---

## Stack

| Layer         | Choice                             | Notes                                                    |
| ------------- | ---------------------------------- | -------------------------------------------------------- |
| Framework     | Next.js 16 (App Router)            | Server components by default; client components opt-in   |
| Language      | TypeScript 5                       | Strict mode                                              |
| Content       | Contentlayer 0.3 + Markdown/MDX    | Build-time type generation from `.md`/`.mdx` files       |
| Styling       | Tailwind CSS v4                    | Utility-first; theme delivered via CSS custom properties |
| UI primitives | Radix UI, Base UI, shadcn          | Component primitives only; no shadcn visual presets      |
| Icons         | Tabler Icons React                 | `@tabler/icons-react`                                    |
| Animations    | Framer Motion                      | Used selectively in carousels/transitions                |
| Fonts         | Google Fonts (Next.js font loader) | Bricolage Grotesque, Inter, Geist Mono                   |
| Analytics     | Custom (`src/lib/analytics.ts`)    | Event tracking via `TrackedLink` component               |
| Testing       | Jest + Testing Library             | Unit and integration tests under `__tests__/`            |

---

## App routes

| Route | File | Type | Purpose |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | Server | Home -- Hero + BlogCarousel + ProjectCarousel |
| `/blog` | `src/app/blog/page.tsx` | Server + Client | Blog list with pagination; delegates to `BlogPageClient.tsx` |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Server | Blog post detail -- content, metadata, JSON-LD, prev/next nav |
| `/dev` | `src/app/dev/page.tsx` | Server | Project overview/index -- all projects + sticky sidebar + Changelog |
| `/portfolio` | `src/app/portfolio/page.tsx` | Server | Project carousel (to be redirected to `/dev` in Phase B) |
| `/portfolio/[slug]` | -- | -- | **Does not exist yet** -- Phase B work item |
| `/language-services` | `src/app/language-services/page.tsx` | Server | Translation/proofreading resume -- services + client history |
| `/contact` | `src/app/contact/page.tsx` | Server | Contact form UI (no submission handler wired yet) |
| `/rss.xml` | `src/app/rss.xml/route.ts` | Route handler | RSS 2.0 feed of published posts |
| `/sitemap.xml` | `src/app/sitemap.xml/route.ts` | Route handler | XML sitemap for all pages, posts, and projects |
| `/robots.txt` | `src/app/robots.ts` | Next.js metadata | robots.txt pointing to sitemap |

> **Note:** The sitemap and `/dev` page JSON-LD currently emit `/portfolio/{slug}` URLs that return 404 until the `/portfolio/[slug]` route is built (Phase B).

---

## Content pipeline

```
content/
  posts/        *.md / *.mdx   -- blog posts
  projects/     *.md           -- portfolio projects
        |
        | contentlayer:generate / contentlayer:dev
        v
.contentlayer/generated/
  allPosts[]     -- typed Post objects
  allProjects[]  -- typed Project objects
        |
        | imported in server components
        v
  src/app/blog/page.tsx          -- allPosts (sorted, paginated)
  src/app/blog/[slug]/page.tsx   -- allPosts.find(slug)
  src/app/dev/page.tsx           -- allProjects
  src/app/portfolio/page.tsx     -- allProjects (filtered to published)
  src/app/rss.xml/route.ts       -- allPosts (published, sorted)
  src/app/sitemap.xml/route.ts   -- allPosts + allProjects
  src/components/HomePageBlogs/  -- allPosts (featured slice)
  src/components/Projects/       -- allProjects (featured slice)
```

Contentlayer reads frontmatter and body, validates required fields against the schema in `contentlayer.config.ts`, and outputs fully-typed arrays at build time. No database, no runtime fetching.

---

## Computed fields (contentlayer.config.ts)

Both `Post` and `Project` have these computed at build time:

| Field         | How it's derived                                                  |
| ------------- | ----------------------------------------------------------------- |
| `slug`        | Stripped from the filename -- date prefix (`YYYY-MM-DD-`) removed |
| `url`         | `/blog/{slug}` for posts; `/portfolio/{slug}` for projects        |
| `readingTime` | Word count of body divided by 200 (posts only)                    |

---

## Theme system

Themes are delivered as CSS custom property sets applied to the `data-theme` attribute on `<html>`. The full token map lives in `src/lib/themes.ts`; the CSS variable declarations live in `src/app/globals.css`. Switching a theme writes `data-theme` to the DOM -- no CSS class toggling, no re-render.

Token groups: `bg-100`, `bg-200`, `bg-300`, `headline`, `paragraph`, `button`, `buttonText`, `link`, `accent-100`, `accent-200`, `accent-300`, `palette-border`.

See [design-system.md](./design-system.md) for the full token reference.

---

## Build and dev commands

| Command                         | What it does                                                         |
| ------------------------------- | -------------------------------------------------------------------- |
| `npm run dev`                   | Runs `contentlayer:dev` + `next dev --turbopack` concurrently        |
| `npm run build`                 | Runs `contentlayer:generate` then `next build`                       |
| `npm run start`                 | Starts the production Next.js server                                 |
| `npm run contentlayer:generate` | One-off Contentlayer type generation (run after frontmatter changes) |
| `npm run validate:content`      | Validates all content frontmatter, slugs, links, and local assets    |
| `npm run ci`                    | Full CI pipeline: validate:content + tests + build                   |
| `npm test`                      | Jest unit/integration tests                                          |

---

## Key source directories

```
src/
  app/          Next.js App Router routes and layouts
  components/   All React components (co-located with their styles where applicable)
  lib/          Pure utility modules (analytics, metadata, themes, post helpers, etc.)
  hooks/        Custom React hooks
content/
  posts/        Markdown source for blog posts
  projects/     Markdown source for portfolio projects
public/
  images/       Static image assets (posts/ and projects/ subdirectories)
  fonts/        Local font files (if any)
scripts/        Build and validation scripts (Node.js / MJS)
__tests__/      Jest test suites
```
