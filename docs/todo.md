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

## Phase 2 — Controlled Markdown/MDX article system ✅ (complete, merged via PR #95)

The blog body now renders through a controlled component map in `PostContent`:

- headings with anchors (levels 2–6; a body `#` is treated as a level-2 section)
- paragraphs, ordered/unordered lists, links, strong/emphasis
- inline and fenced code (distinguished via the `language-` class)
- blockquotes, thematic-break dividers, and images
- `max-w-3xl` article reading measure

Not supported / not claimed: GFM tables/task lists/strikethrough (no `remark-gfm` in the pipeline) and Phase 4 embellishments (drop caps, pull quotes, figures/captions, callouts, table of contents, related posts).

## Phase 3 — Development and language-service conversion surfaces ✅ (implemented and verified, pending review/merge)

Conversion-surface improvements delivered:

- Replaced placeholder project copy and links:
  - `wowcomps`: removed the placeholder `myportfolio.com` live link (now the GitHub repo URL, so no broken "Live Demo" shows); fixed the `"Vite+"` tech typo; rewrote the placeholder body with accurate copy.
  - `atomology`: replaced the e-commerce boilerplate body with accurate copy.
  - Updated `updatedAt` for the meaningful edits.
- Contact email is now the real recipient `wjbetech@gmail.com` (was the stale `hello@williameast.com`).
- Added a `/language-services` call-to-action link in the home hero, mirroring the existing `/dev` link.
- Fixed a grammar typo in the language-services experience copy.

Not done (product decisions, left for a follow-up): a broader homepage-hierarchy redesign; any Resend recipient/sender changes.

## Next task — Phase 4: Professional blog post redesign

Start by reading `docs/roadmap.md` Phase 4. The Phase 2 component system is the base; editorial embellishments (drop caps, pull quotes, figures/captions, callouts, table of contents, related posts) and article-hero/metadata treatment are planned there.

## After Phase 2

Phases 1, 2, and 3 are done. Phase 4 (the visual blog redesign) is the next task; Phase 5 is targeted cleanup.

Read [roadmap.md](./roadmap.md) for scope and done criteria. Do not implement all phases in one change.
