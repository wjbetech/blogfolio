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

The following are not complete:

- project and service conversion surfacing is improved (Phase 3); remaining polish is noted below
- the blog visual redesign and editorial embellishments are not implemented (Phase 4)
- deployment publishing is not currently gated on the separate validation workflow
- lint and standalone typecheck are not clean

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
- Verified against real Contentlayer-compiled output (inline vs fenced code distinguished via the `language-` class; GFM tables/task lists/strikethrough do not compile and are not claimed).
- Tests cover the supported component map (`tests/components/PostContent.test.tsx`).

### Deliberately not supported

GFM tables, task lists, and strikethrough (would require enabling `remark-gfm` through Contentlayer's pipeline), and Phase 4 embellishments (drop caps, pull quotes, figures/captions, callouts, table of contents, related posts).

## Phase 3 — Development and language-service conversion surfaces

**Status: implemented and verified (pending review/merge).**

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

**Status: planned.**

### Goal

Make the blog a polished credibility and personality surface without turning it into the site's primary product.

### Possible scope

- article hero and metadata treatment
- enlarged paragraph first letters
- pull quotes and richer blockquote treatments
- figures with captions
- callouts
- article-specific font variation
- table of contents and related posts if justified
- mobile reading experience

The Phase 2 component system is the base these build on; they are not implemented yet.
- code-block presentation
- table of contents and related posts if justified
- mobile reading experience

These ideas are not requirements until scoped against the Phase 2 component system.

### Done means

The blog looks intentionally designed, reads professionally, supports the documented content system, and strengthens the site's development/language-service goals.

## Phase 5 — Targeted cleanup and performance decisions

**Status: planned.**

Possible work includes:

- repair `npm run lint`
- make standalone typecheck clean
- gate image publication on validation success
- remove obsolete Prisma/dependency/configuration remnants
- decide what unused UI primitives should remain
- revisit dynamic rendering and server-side theme initialization
- consolidate test organization

This phase should follow product and content work. It should not become a broad refactor without a concrete payoff.
