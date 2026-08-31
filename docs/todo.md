# Todo and engineering handoff

This file is the short handoff for the next coding agent. It records decisions and the first engineering task; it is not permission to implement the entire roadmap.

## Settled product decisions

- Blogfolio serves development, language-service, and supporting blog goals.
- `/dev/[slug]` is the canonical project-detail route.
- `/portfolio` redirects to `/dev`.
- `/portfolio/[slug]` redirects to `/dev/[slug]`.
- `draft` is a real publication state.
- Drafts must not be publicly generated, listed, navigable, included in RSS, included in the sitemap, or included in JSON-LD collections.
- `content/posts/2026-08-22-state-of-models-agentic-coding.md` is `published` (2026-08-22); there are currently no drafts.
- The blog should eventually support a professional controlled Markdown/MDX article system.
- The near-term product priority is attracting development and language-service work, not maximizing post volume.
- The homelab deployment is operational.
- The canonical domain is `https://wjbeast.com`.

## Current implementation cautions

- Phase 1 (route/publication consolidation) is merged (PR #94).
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

Not supported / not claimed: pull quotes, callouts, and other Phase 4 embellishments beyond what has shipped. GFM tables/task lists/strikethrough are now supported via `remark-gfm` (PR #125), and drop caps, figures with captions, table of contents, related posts, and syntax-highlighted code have shipped (PRs #97, #101, #102).

## Phase 3 — Development and language-service conversion surfaces ✅ (complete, merged via PR #96)

Conversion-surface improvements delivered:

- Replaced placeholder project copy and links:
  - `wowcomps`: removed the placeholder `myportfolio.com` live link (now the GitHub repo URL, so no broken "Live Demo" shows); fixed the `"Vite+"` tech typo; rewrote the placeholder body with accurate copy.
  - `atomology`: replaced the e-commerce boilerplate body with accurate copy.
  - Updated `updatedAt` for the meaningful edits.
- Contact email is now the real recipient `wjbetech@gmail.com` (was the stale `hello@williameast.com`).
- Added a `/language-services` call-to-action link in the home hero, mirroring the existing `/dev` link.
- Fixed a grammar typo in the language-services experience copy.

## Phase 4 — Professional blog post redesign ✅ (complete, merged via PR #97, extended via PRs #101/#102)

Editorial polish delivered:

- editorial drop cap on the first paragraph (serif accent letter)
- refined article header: responsive title sizing (text-4xl → text-5xl → text-6xl), reading time badge
- richer blockquote styling (accent background, rounded corner)
- scroll-spy table of contents (`BlogToc` on `xl`+), related posts (`Continue reading`), figures with captions (`alt` → `figcaption`), and syntax-highlighted fenced code via `rehype-pretty-code`

Not done (product decisions, left for a follow-up): pull quotes / richer blockquote treatments beyond the current style, callouts, and a dedicated mobile reading experience pass. Table of contents, related posts, and figures with captions have shipped.

## Phase 5 — Targeted cleanup ✅ (complete)

Delivered:

- `npm run lint` repaired (now `eslint src`; 0 errors)
- All 7 typecheck errors fixed (0 errors)
- Dead dependencies removed (`@types/pg`, `ts-node`, `tsx`)
- Stale Prisma refs and dead `src/app/types/headers.ts` removed
- `build-and-push.yml` now depends on CI validation passing
- Lint errors in `ThemeAside.tsx` and `entryParser.ts` fixed

Intentionally deferred: `force-dynamic`/server-theme revisit. Pruned unused shadcn/ui primitives (only `Button`/`Card` remain, PR #113) and consolidated test organization under `tests/` (PR #115) have shipped.

## All phases complete

Phases 1–5 are done. No further roadmap phases are planned. Ongoing work is ad-hoc: content updates, feature additions, and maintenance as needed.
