# Roadmap

This roadmap records the agreed direction for the next engineering phases. It is intentionally small. It is not a generic feature backlog, and none of the future phases should be described as complete until implemented and verified.

## Product priority

Blogfolio's near-term product goals are:

1. attract development work
2. attract language-service work
3. use the blog as supporting evidence of expertise and personality

The blog is important, but Blogfolio is not primarily a publishing platform.

## Current state

Implemented foundations include:

- Next.js App Router with TypeScript
- Contentlayer-backed Markdown/MDX source content
- a controlled, tested Markdown/MDX article renderer for blog posts (Phase 2)
- `/dev` project index and editorial project detail experience
- legacy `/portfolio` routes
- language-services page and experience timeline
- Resend-backed contact endpoint
- theme selector with 20 palettes
- metadata, Open Graph, Twitter, RSS, sitemap, robots, and JSON-LD foundations
- Docker/GHCR/Cloudflare Tunnel homelab deployment
- content validation, Jest/Testing Library tests, and production build

All five roadmap phases are complete (Phases 1–5, PRs #94–#98), followed by ad-hoc improvements: hydration fix (#99), blog layout with scroll-spy TOC (#101), syntax highlighting and TOC scroll-spy rework (#102), content refresh (#104). Ongoing work is maintenance and content as needed.

## Phase 1 — Route and publication consolidation

**Status: complete (merged via PR #94).**

### Goal

Make the public content boundary and project URL model unambiguous.

### Scope

- make `/dev/[slug]` canonical
- keep `/portfolio` → `/dev`
- keep `/portfolio/[slug]` → `/dev/[slug]`
- ensure `draft` content is never publicly generated or listed
- apply the same published predicate to pages, carousels, archives, navigation, RSS, sitemap, and JSON-LD
- align Contentlayer URLs, metadata, validation, tests, and documentation

### Done

- `/dev/[slug]` is canonical in navigation, cards, metadata, JSON-LD, sitemap, Contentlayer computed URLs, validation, and tests.
- `/portfolio` redirects to `/dev` and `/portfolio/[slug]` redirects to `/dev/[slug]` (verified at runtime).
- Draft posts and projects are excluded from every public surface and are not statically generated; draft slugs return 404.
- The publication boundary is centralized in `src/lib/content.ts`.
- Content validation validates project links against `/dev/[slug]`.
- Tests cover the publication boundary, sitemap/RSS draft exclusion, and legacy redirects.

## Phase 2 — Controlled Markdown/MDX article system

**Status: complete (merged via PR #95).**

### Goal

Turn the partial Markdown/MDX rendering into a reliable, controlled Blogfolio article system.

### Delivered

- `PostContent` renders compiled output through a full, styled component map (headings with anchors, paragraphs, ordered/unordered lists, links, `strong`/emphasis, inline and fenced code, blockquotes, thematic-break dividers, and images).
- A body `#` is treated as a level-2 section (the page `<h1>` is the article title); `HeadingAnchor` supports levels 2–6 and preserves inline formatting inside headings.
- Article body uses a `max-w-3xl` reading measure.
- Verified against real Contentlayer-compiled output (inline vs fenced code distinguished via the `language-` class).
- Tests cover the supported component map (`tests/components/PostContent.test.tsx`).

### Deliberately not supported

Phase 4 embellishments that remained deferred at the time (pull quotes). GFM tables, task lists, and strikethrough were originally listed here but are now supported via `remark-gfm` (PR #125; see `docs/content.md`), and drop caps, enlarged first letters, figures with captions, table of contents, and related posts have since shipped (PRs #97, #101, #102). Callouts were dropped as not needed.

## Phase 3 — Development and language-service conversion surfaces

**Status: complete (merged via PR #96).**

### Goal

Make the site more effective at attracting both development and language-service work.

### Delivered

- Replaced placeholder project copy and links:
  - `wowcomps`: removed the placeholder `myportfolio.com` live link (now points to the GitHub repo, matching the Cabin Chat pattern so no broken "Live Demo" shows); fixed the `"Vite+"` tech typo; rewrote the placeholder body with accurate copy.
  - `atomology`: replaced the e-commerce boilerplate body with accurate copy about the Wordle-inspired periodic-table game.
  - Updated `updatedAt` on both for the meaningful edits.
- Made contact paths consistent: the displayed contact email is now the real recipient `wjbetech@gmail.com` instead of the stale `hello@williameast.com` address.
- Added a `/language-services` call-to-action link from the home hero (mirroring the existing `/dev` link) so both target audiences are reachable from the home screen.
- Fixed a grammar typo in the language-services experience copy.

### Note

A larger homepage-hierarchy redesign (section ordering, dedicated service CTAs) was intentionally not done here to avoid inventing product decisions; it can be revisited as a follow-up. The Resend recipient/sender setup itself was left untouched.

## Phase 4 — Professional blog post redesign

**Status: complete (merged via PR #97, extended via PRs #101 and #102).**

### Goal

Make the blog a polished credibility and personality surface without turning it into the site's primary product.

### Delivered

- editorial drop cap on the first paragraph (serif accent letter)
- refined article header: responsive title sizing (text-4xl → text-5xl → text-6xl), added reading time badge using Contentlayer's computed `readingTime` field
- richer blockquote styling (accent background, rounded right corner)
- `article-body` class on PostContent root for the drop-cap CSS selector
- enlarged first letters — typographic scale refinement (lede `1.08em` + serif `::first-letter 3.4em` on `≥640px`; `src/app/globals.css`)
- scroll-spy table of contents (`BlogToc` on `xl`+ viewports, reading `h2`/`h3` from `.article-body`, active-section highlighting, `key={post.slug}` remount; PRs #101/#102)
- related posts (`Continue reading` — up to 3 most recent posts excluding current; `src/components/Blog/BlogPostView.tsx`)
- figures with captions (`PostContent` wraps `img` in `<figure>` + `<figcaption>` from `alt` text)
- build-time syntax highlighting for fenced code via `rehype-pretty-code` (`github-light` theme; PR #102) and GFM tables/task lists/strikethrough via `remark-gfm` (PR #125)
- mobile reading experience pass — responsive header/hero/body spacing (`px-4 sm:px-6`, `mt-6 sm:mt-10`, `text-[1.9rem] sm:text-4xl`), heading scale + margins (`text-xl sm:text-2xl`, `mt-8 sm:mt-12`), article rhythm (`my-5 sm:my-6`, `leading-7 sm:leading-8`, `text-[15px] sm:text-base`), code/table overflow (`-mx-4 sm:mx-0`, `overscroll-x-contain`, `w-[calc(100%+2rem)]`), inline-code wrapping (`[overflow-wrap:anywhere]`), and collapsible mobile TOC (`BlogTocMobile` details below `xl`; `src/components/Blog/BlogTocMobile.tsx`)

### Not done (product decisions, left for a follow-up)

- pull quotes / richer blockquote treatments beyond the current accent-background style (note: `.article-body blockquote.pull` CSS exists in `src/app/globals.css` but is not yet an authoring primitive)

Enlarged first letters, table of contents, related posts, figures with captions, and the mobile reading experience pass have shipped (see Delivered above); callouts were dropped as not needed. This remaining item is a refinement scoped against Phase 2's component system and can be revisited later if a use case emerges.

## Phase 5 — Targeted cleanup and performance decisions

**Status: complete.**

### Delivered

- repaired `npm run lint` (now runs `eslint src`; `next lint` was removed in Next.js 16)
- fixed all 7 standalone typecheck errors (test-file typing in projects, metadata, and blogPageClient tests)
- zero lint errors and zero tsc errors achieved
- removed dead dependencies (`@types/pg`, `ts-node`, `tsx`) from `package.json` and lockfile
- removed stale Prisma references from `.gitignore` and dead `src/app/types/headers.ts`
- chained `build-and-push.yml` to depend on `ci-content-validation.yml` succeeding (was previously independent)
- fixed lint errors in `ThemeAside.tsx` (removed unnecessary state+effect sync) and `entryParser.ts` (eliminated `any`)
- pruned unused shadcn/ui primitives — only `Button` and `Card` remain (PR #113)
- consolidated test organization — removed `__tests__/`, unified under `tests/` with coverage floors (PR #115)

### Not done (intentionally deferred)

- revisiting `force-dynamic` and server-side theme initialization

Note: image publication *is* gated on validation success (see Delivered above); deploys pin the exact built commit since 2026-08. The remaining accepted risk is manual `workflow_dispatch` bypassing CI and falling back to `latest`.

This was intentionally left for future consideration rather than broadening Phase 5 into a large refactor.
