# Todo and engineering handoff

This file is the short handoff for the next coding agent. It records decisions and the first engineering task; it is not permission to implement the entire roadmap.

## Settled product decisions

- Blogfolio serves development, language-service, and supporting blog goals.
- `/dev/[slug]` is the canonical project-detail route.
- `/portfolio` redirects to `/dev`.
- `/portfolio/[slug]` redirects to `/dev/[slug]`.
- `draft` is a real publication state.
- Drafts must not be publicly generated, listed, navigable, included in RSS, included in the sitemap, or included in JSON-LD collections.
- `content/posts/2026-05-01-future-goals.md` remains draft while its body is `WIP.`.
- The blog should eventually support a professional controlled Markdown/MDX article system.
- The near-term product priority is attracting development and language-service work, not maximizing post volume.
- The homelab deployment is operational.
- The canonical domain is `https://wjbeast.com`.

## Current implementation cautions

- Phase 1 (route/publication consolidation) is merged and the working tree is clean.
- The committed baseline's blog renderer was paragraph/heading-oriented; Phase 2 delivers the controlled Markdown/MDX article system.
- Do not reintroduce `/portfolio/[slug]` as a project page.
- Do not make drafts accessible simply because a slug is known.
- Do not document planned editorial features as already implemented.

## Phase 1 — Route and publication consolidation ✅ (complete, merged via PR #94)

The canonical route and publication contract is now in place:

- `/dev/[slug]` is the canonical project-detail route everywhere.
- `/portfolio` → `/dev` and `/portfolio/[slug]` → `/dev/[slug]` redirects are preserved and verified.
- Draft posts and projects are not publicly generated or listed; draft slugs return 404.
- The publication boundary is centralized in `src/lib/content.ts` and applied to pages, carousels, archives, navigation, RSS, sitemap, and JSON-LD.
- `scripts/validate-content.mjs` validates project routes against `/dev/[slug]`.
- Tests added in `tests/routes/` cover sitemap/RSS draft exclusion and legacy redirects; the JSON-LD collection fixtures use `/dev`.

## Phase 2 — Controlled Markdown/MDX article system ✅ (implemented and verified, pending review/merge)

The blog body now renders through a controlled component map in `PostContent`:

- headings with anchors (levels 2–6; a body `#` is treated as a level-2 section)
- paragraphs, ordered/unordered lists, links, strong/emphasis
- inline and fenced code (distinguished via the `language-` class)
- blockquotes, thematic-break dividers, and images
- `max-w-3xl` article reading measure

Not supported / not claimed: GFM tables/task lists/strikethrough (no `remark-gfm` in the pipeline) and Phase 4 embellishments (drop caps, pull quotes, figures/captions, callouts, table of contents, related posts).

Tests: `tests/components/PostContent.test.tsx`. Verified against real compiled Contentlayer output and the production build.

## Next task — Phase 3: Development and language-service conversion surfaces

Start by reading `docs/roadmap.md` Phase 3. Goal: make the site more effective at attracting both development and language-service work.

Relevant starting points:

- replace placeholder project copy and links in `content/projects/`
- review the `/language-services` page for clarity and credibility
- make contact paths consistent and reliable
- improve relevant calls to action and cross-links
- review homepage hierarchy for both target audiences

## After Phase 2

Phases 1 and 2 are done. Phase 3 (conversion surfaces) is the current task. Phase 4 is the visual blog redesign. Phase 5 is targeted cleanup.

Read [roadmap.md](./roadmap.md) for scope and done criteria. Do not implement all phases in one change.
