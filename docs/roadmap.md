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
- `/dev` project index and editorial project detail experience
- legacy `/portfolio` routes
- language-services page and experience timeline
- Resend-backed contact endpoint
- theme selector with 20 palettes
- metadata, Open Graph, Twitter, RSS, sitemap, robots, and JSON-LD foundations
- Docker/GHCR/Cloudflare Tunnel homelab deployment
- content validation, Jest/Testing Library tests, and production build

The following are not complete:

- Phase 1 (route/publication consolidation) is implemented and verified; see below
- the complete professional MDX/article component system does not exist yet (Phase 2)
- project and service conversion content needs review (Phase 3)
- the blog redesign is not implemented (Phase 4)
- deployment publishing is not currently gated on the separate validation workflow
- lint and standalone typecheck are not clean

## Phase 1 — Route and publication consolidation

**Status: implemented and verified (pending review/merge).**

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

**Status: planned.**

### Goal

Turn the current partial Markdown/MDX rendering into a reliable, tested Blogfolio article system.

### Scope

- preserve Markdown/MDX as the authoring format
- define the supported Markdown/GFM elements
- define a controlled MDX component vocabulary
- render headings, anchors, paragraphs, lists, links, code, quotes, dividers, images, and other deliberately supported elements
- establish article typography, spacing, and responsive behavior
- test actual Contentlayer-compiled output

The current working tree contains an MDX rendering experiment. It must not be treated as the finished Phase 2 system.

### Done means

Representative real posts render all documented supported structures correctly, and the article component system is easy to reuse without one-off styling in every post.

## Phase 3 — Development and language-service conversion surfaces

**Status: planned.**

### Goal

Make the site more effective at attracting both development and language-service work.

### Scope

- replace placeholder project copy and links
- present project capabilities and outcomes accurately
- review the language-services page for clarity and credibility
- make contact paths consistent and reliable
- improve relevant calls to action and cross-links
- review homepage hierarchy for both target audiences

### Done means

A new visitor can quickly understand the development services, language services, supporting evidence, and next contact action.

## Phase 4 — Professional blog post redesign

**Status: planned.**

### Goal

Make the blog a polished credibility and personality surface without turning it into the site's primary product.

### Possible scope

- article hero and metadata treatment
- reading width and typography
- enlarged paragraph first letters
- dividers and thematic-break styling
- font variation for editorial roles
- polished quotes, figures, and captions
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
