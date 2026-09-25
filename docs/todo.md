# Todo and engineering handoff

This file is the short handoff for the next coding agent. It records decisions and current follow-up items; it is not permission to implement the entire roadmap.

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

Not supported / not claimed: pull quotes and other Phase 4 embellishments beyond what has shipped. GFM tables/task lists/strikethrough are now supported via `remark-gfm` (PR #125), and drop caps, enlarged first letters, figures with captions, table of contents, related posts, and syntax-highlighted code have shipped (PRs #97, #101, #102). Callouts were dropped.

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
- enlarged first letters — typographic scale refinement
- refined article header: responsive title sizing (text-4xl → text-5xl → text-6xl), reading time badge
- richer blockquote styling (accent background, rounded corner)
- scroll-spy table of contents (`BlogToc` on `xl`+), related posts (`Continue reading`), figures with captions (`alt` → `figcaption`), and syntax-highlighted fenced code via `rehype-pretty-code`

Not done (product decisions, left for a follow-up): pull quotes / richer blockquote treatments beyond the current style (`.pull` CSS exists but is not an authoring primitive; de-prioritized). Enlarged first letters, table of contents, related posts, figures with captions, and the mobile reading experience pass (`px-4 sm:px-6`, responsive header/heading rhythm, code/table overflow, `BlogTocMobile` collapsible TOC) have shipped; callouts were dropped.

## Phase 5 — Targeted cleanup ✅ (complete)

Delivered:

- `npm run lint` repaired (now `eslint src`; 0 errors)
- All 7 typecheck errors fixed (0 errors)
- Dead dependencies removed (`@types/pg`, `ts-node`, `tsx`)
- Stale Prisma refs and dead `src/app/types/headers.ts` removed
- `build-and-push.yml` now depends on CI validation passing
- Lint errors in `ThemeAside.tsx` and `entryParser.ts` fixed

Intentionally deferred: `force-dynamic`/server-theme revisit. Pruned unused shadcn/ui primitives (only `Button`/`Card` remain, PR #113) and consolidated test organization under `tests/` (PR #115) have shipped.

## `/dev` page review follow-ups (2026-09-24)

These items came from the owner’s review of `/dev` on staging. They were implemented on `feat/homepage-design-explorations` and promoted to `staging` on 2026-09-24; roadmap phases 1–5 remain complete.

- [x] **Remove staging details from public changelog copy.** Reworded deployment entries to avoid the staging hostname and environment name while preserving the general improvement.
- [x] **Hide the “William East” wordmark on `/dev`.** Suppressed it on this route only; the brand link remains on other pages.
- [x] **Feature the current role above the `/dev` introduction.** Added a prominent callout identifying William as a Software Engineer / AI-assisted engineer at ASTUTR. Co. in Gangnam, Seoul.
- [x] **Make the current role details expandable.** Kept the title and company visible, added an accessible disclosure arrow for the duty list, and balanced the bullet columns to avoid uneven gaps.
- [x] **Refocus project cards on the work and its stack.** Put the app preview and technologies earlier in the hierarchy and increased preview space.
- [x] **Show complete project screenshots.** Changed the card slider to contain images across aspect ratios instead of cropping important UI.
- [x] **Bring the blog-card sheen to project cards.** Reused the accent glow and moving metallic highlight on the project previews, with hover lift and reduced-motion support.
- [x] **Give “Live Demo” links a satisfying hover treatment.** Added hover and keyboard-focus feedback with reduced-motion support.
- [x] **Strengthen the project index sidebar.** Added a clearer panel and interactive active-project and hover states.

## `/blog` page review follow-ups (2026-09-24)

These items came from the owner’s review of `/blog`. They were implemented on `feat/homepage-design-explorations` and promoted to `staging` on 2026-09-24.

- [x] **Give Archive and Topics clearer panels.** Matched the stronger sidebar treatment used on `/dev` and made expanded years and selected topics easier to spot.
- [x] **Add depth and motion to post cards.** Added subtle accent glows, a passing sheen, hover lift, and clearer focus feedback while keeping the cards minimal and respecting reduced motion.

## All phases complete

Phases 1–5 are done. No further roadmap phases are planned. Ongoing work is ad-hoc: the follow-ups above, content updates, feature additions, and maintenance as needed.
