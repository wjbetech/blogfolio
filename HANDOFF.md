# Blogfolio transition handoff

This file is temporary transition context for the next coding agent. The repository code and `docs/` are the authorities for current behavior. Do not treat this file as a substitute for reading `docs/architecture.md`, `docs/content.md`, `docs/roadmap.md`, and `docs/todo.md`.

## Product

Blogfolio is William East's personal website with three connected purposes:

1. attract development work through `/dev`
2. attract translation, proofreading, editing, and language-service work through `/language-services`
3. use the blog as supporting evidence of expertise and personality

The blog is not the primary product or a high-volume publishing platform.

## Settled decisions

- Canonical project detail route: `/dev/[slug]`.
- Legacy `/portfolio` route: redirect to `/dev`.
- Legacy `/portfolio/[slug]` route: redirect to `/dev/[slug]`.
- `draft` is a real publication state.
- Drafts must not be publicly generated, listed, navigable, included in RSS, included in the sitemap, or included in JSON-LD collections.
- `content/posts/2026-08-22-state-of-models-agentic-coding.md` is `published`; there are currently no drafts.
- The eventual blog system should use Markdown/MDX through Contentlayer and a controlled Blogfolio article component system.
- The homelab deployment is operational.
- Canonical domain: `https://wjbeast.com`.

## Verified architecture summary

- Next.js 16 App Router, TypeScript, React 19.
- Contentlayer 0.3 compiles `content/posts` and `content/projects` to typed build-time collections.
- No Blogfolio database, ORM, CMS, authentication, authorization, or shared state library.
- Tailwind CSS v4 with CSS-variable theme tokens and 20 themes.
- Resend contact API, opt-in Plausible integration, RSS, sitemap, robots, metadata, JSON-LD, Docker, GHCR, Docker Compose, and Cloudflare Tunnel.
- Project screenshots are local assets under `public/images/assets/projects` and are numerically ordered.

## Implementation status

All five phases of the Blogfolio roadmap are complete (merged via PRs #94–#98), followed by ad-hoc improvements through PR #104:

- `/dev/[slug]` is the canonical project-detail route; drafts are excluded from all public surfaces.
- Blog bodies render through a controlled `PostContent` component map (headings/anchors, lists, links, code, blockquotes, dividers, images) with editorial polish (drop cap, reading time, responsive title).
- Placeholder project copy and links have been replaced with accurate content; contact paths are consistent; both audiences are reachable from the home hero.
- Lint is repaired, all typecheck errors are fixed, dead dependencies removed, and CI validation gates image publication.

No further roadmap phases are planned. Ongoing work is ad-hoc: content updates, feature additions, and maintenance as needed.

## Verification snapshot

As of 2026-08-21, the repository has:

- 6 posts and 6 projects
- 5 published posts and 1 draft post
- 20 themes
- passing content validation
- 117 passing Jest tests
- passing production build
- clean standalone typecheck (`pnpm exec tsc --noEmit`)
- `pnpm run lint` running `eslint src` with 0 errors

## Next engineering task

All roadmap phases are complete. Future work is ad-hoc: content updates, new features, and maintenance as needed.
