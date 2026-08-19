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

- The working tree still contains uncommitted changes from before Phase 1; review the final diff before merging. Phase 1 itself is implemented and verified; the MDX rendering work remains Phase 2 and is not considered complete.
- The committed baseline's blog renderer was paragraph/heading-oriented and did not provide the complete Markdown presentation system desired for the future blog.
- Do not reintroduce `/portfolio/[slug]` as a project page.
- Do not make drafts accessible simply because a slug is known.
- Do not document planned editorial features as already implemented.

## Phase 1 — Route and publication consolidation ✅ (implemented and verified, pending review/merge)

The canonical route and publication contract is now in place:

- `/dev/[slug]` is the canonical project-detail route everywhere.
- `/portfolio` → `/dev` and `/portfolio/[slug]` → `/dev/[slug]` redirects are preserved and verified.
- Draft posts and projects are not publicly generated or listed; draft slugs return 404.
- The publication boundary is centralized in `src/lib/content.ts` and applied to pages, carousels, archives, navigation, RSS, sitemap, and JSON-LD.
- `scripts/validate-content.mjs` validates project routes against `/dev/[slug]`.
- Tests added in `tests/routes/` cover sitemap/RSS draft exclusion and legacy redirects; the JSON-LD collection fixtures use `/dev`.

## Next task — Phase 2: Controlled Markdown/MDX article system

Start by reading `docs/roadmap.md` Phase 2. Scope the supported Markdown/GFM element vocabulary and a controlled MDX component list before building. The current `PostContent`/`mdx` working-tree experiment is the starting point but is not a completed Phase 2.

## After Phase 1

Proceed to Phase 2 (the controlled Markdown/MDX article system) only after this branch is reviewed and merged. Phase 3 addresses development and language-service conversion surfaces. Phase 4 is the visual blog redesign. Phase 5 is targeted cleanup.

Read [roadmap.md](./roadmap.md) for scope and done criteria. Do not implement all phases in one change.
