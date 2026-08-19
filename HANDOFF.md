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
- `content/posts/2026-05-01-future-goals.md` is unfinished and remains `draft` while its body is `WIP.`.
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

Phase 1 (route and publication consolidation) is merged (PR #94):

- `/dev/[slug]` is the canonical project-detail route.
- `/portfolio` and `/portfolio/[slug]` redirect to their `/dev` equivalents.
- Draft posts and projects are excluded from all public surfaces and are not statically generated.
- The publication boundary is centralized in `src/lib/content.ts`.

Current task: Phase 2, the controlled Markdown/MDX article system, is implemented and verified (pending review/merge): `PostContent` renders compiled output through a full styled component map (headings/anchor, lists, links, strong/em, inline & fenced code, blockquotes, dividers, images) with a `max-w-3xl` reading measure. GFM tables/task lists/strikethrough are not supported by the pipeline. The Phase 4 embellishments (drop caps, pull quotes, figures/captions, callouts, TOC, related posts) are not implemented.

## Verification snapshot

At the Phase 2 pass, the repository has:

- 7 posts and 5 projects
- 6 published posts and 1 draft post
- 20 themes
- passing content validation
- 116 passing Jest tests
- passing production build
- failing standalone typecheck due pre-existing test typing errors
- a failing `npm run lint` script because it invokes `next lint`

## Next engineering task

Phase 3: development and language-service conversion surfaces (see `docs/roadmap.md`). After that, proceed to the blog visual redesign (Phase 4) and targeted cleanup (Phase 5).
