# Architecture

Blogfolio is a personal website for William East. Its near-term purpose is to attract development work and language-service work; the blog supports those goals by demonstrating expertise, communication, and personality.

## Stack

| Layer | Choice | Current role |
| --- | --- | --- |
| Framework | Next.js 16 App Router | Routing, server components, route handlers, metadata |
| Language | TypeScript 5 | Strict application typing |
| Content | Contentlayer 0.3 + Markdown/MDX | Build-time typed content from `content/` |
| Styling | Tailwind CSS v4 + CSS variables | Utility classes backed by the custom theme tokens |
| UI primitives | Small set of shadcn-style components using Radix UI | Only `Button` and `Card` remain after pruning unused primitives (PR #113) |
| Icons | `@tabler/icons-react` plus small local SVG wrappers | UI and navigation icons |
| Fonts | Next.js Google font loader | Inter, Bricolage Grotesque, Geist Mono |
| Animation | `tw-animate-css` and CSS transitions | UI transitions and editorial entrance effects |
| Email | Resend | Public contact form submission |
| Analytics | Plausible, loaded manually when configured | Opt-in page views and selected events |
| Testing | Jest + Testing Library | Unit and component/integration tests |
| Production | Docker standalone image, GHCR, Docker Compose, Cloudflare Tunnel | Homelab deployment |

There is no Blogfolio database, ORM, CMS, authentication system, authorization layer, or runtime content store.

## Repository structure

```text
content/
  posts/             Markdown/MDX blog sources
  projects/          Markdown project sources

src/app/             App Router pages, layouts, route handlers, metadata routes
src/components/      Feature-oriented React components
src/components/ui/   shadcn-style primitives; only Button and Card remain after pruning (PR #113)
src/hooks/           Client hooks for themes and carousel interaction
src/lib/             Content, metadata, themes, analytics, changelog, and pure helpers
public/              Static assets, including images/assets/
scripts/             Content generation and validation wrappers
changelog/           entries.json used by the /dev changelog
tests/               All Jest suites (lib, components, hooks, pages, routes, content) plus mocks and helpers
.github/workflows/   CI, image publishing, deployment, and maintenance workflows
```

## Routes

| Route | Implementation | Role |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Hero, featured blog carousel, featured project carousel |
| `/blog` | `src/app/blog/page.tsx` and `BlogPageClient.tsx` | Published posts, pagination, tags, yearly archive |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Published post detail, metadata, JSON-LD, post navigation |
| `/dev` | `src/app/dev/page.tsx` | Published project index, galleries, sidebar, changelog |
| `/dev/[slug]` | `src/app/dev/[slug]/page.tsx` | **Canonical** project detail route |
| `/portfolio` | `src/app/portfolio/page.tsx` | Legacy redirect to `/dev` |
| `/portfolio/[slug]` | `src/app/portfolio/[slug]/page.tsx` | Legacy redirect to `/dev/[slug]` |
| `/language-services` | `src/app/language-services/page.tsx` | Translation/editing services and experience |
| `/contact` | `src/app/contact/page.tsx` + `ContactForm.tsx` | Server page with metadata; client-side contact form |
| `/rss.xml` | `src/app/rss.xml/route.ts` | Published-post RSS feed |
| `/sitemap.xml` | `src/app/sitemap.xml/route.ts` | Published public URL sitemap |
| `/robots.txt` | `src/app/robots.ts` | Crawler rules and sitemap location |
| `/api/contact` | `src/app/api/contact/route.ts` | Resend-backed POST endpoint |
| `/api/changelog/entries` | `src/app/api/changelog/entries/route.ts` | Changelog pagination endpoint |

`/dev/[slug]` is the only canonical project-detail URL. Do not reintroduce `/portfolio/[slug]` as a project page. Preserve the legacy route only as a redirect.

## Content pipeline

```text
content/posts and content/projects
        |
        | pnpm run contentlayer:generate
        v
.contentlayer/generated
        |
        | typed allPosts and allProjects imports
        v
Next.js routes, components, RSS, sitemap, metadata, and JSON-LD
```

`contentlayer.config.ts` defines the Post and Project document types. `scripts/validate-content.mjs` performs additional repository checks for fields, IDs, slugs, local assets, routes, and selected external links.

Content is build-time data. The root layout currently declares `force-dynamic`, so the application is not configured as a purely static Next.js deployment even though its content is generated at build time. Do not describe the site as fully static without revisiting that layout decision.

## Publication boundary

`draft` and `published` are real content states.

The publication contract is:

- only `published` content is public
- drafts do not appear in indexes, carousels, archives, navigation, RSS, sitemap, or JSON-LD collections
- drafts must not receive generated public detail pages
- changing a draft to published is an explicit publishing action

The publication boundary is enforced centrally through `src/lib/content.ts` (`getPublishedPosts`/`getPublishedProjects`) and applied across pages, carousels, archives, navigation, RSS, sitemap, and JSON-LD. Draft slugs are not statically generated and return 404 on detail routes. Phase 1 (route and publication consolidation) is implemented; see `docs/roadmap.md`.

## Blog rendering boundary

The intended content architecture is:

```text
Markdown/MDX source
        |
        v
Contentlayer compilation
        |
        v
Controlled Blogfolio article components
        |
        v
Rendered article
```

Blog bodies render through `src/components/Blog/PostContent.tsx`, the controlled component map delivered in Phase 2 (PR #95) and extended since: editorial drop cap, reading-time badge, and blockquote styling (Phase 4, PR #97), hybrid layout with scroll-spy TOC and related posts (PR #101), figures with captions (`alt` → `figcaption`), and build-time syntax highlighting via `rehype-pretty-code` with the `github-light` theme (PR #102) plus GFM tables/task lists/strikethrough via `remark-gfm` (PR #125). It evaluates Contentlayer's compiled `body.code`, maps headings to `HeadingAnchor`, and styles links, lists, inline code, and fenced code.

The supported Markdown/MDX component vocabulary is defined and tested (`tests/components/PostContent.test.tsx`). GFM tables, task lists, and strikethrough are enabled via `remark-gfm`; do not assume other Markdown extensions are styled unless listed in `docs/content.md`.

## State and client boundaries

Most pages are server components. Client components are used where browser state or interaction is required:

- theme drawer and theme selection
- mobile navigation
- carousels and drag interaction
- project image gallery/lightbox
- blog filtering and pagination controls
- contact form state
- changelog incremental loading
- Plausible script and page-view tracking

There is no shared client state store. Theme selection is persisted in `localStorage` (`site:theme`); a pre-paint script restores the `data-theme` attribute on `<html>` before first paint and all palette CSS is generated server-side from `src/lib/themes.ts` (see `docs/design-system.md`). The initial SSR theme is the welcome palette.

## Architectural conventions

- Import content from `contentlayer/generated`; do not fetch content at runtime.
- Use the shared published-content predicate when exposing posts or projects publicly.
- Use `/dev/[slug]` for all new project links and metadata.
- Use `TrackedLink` for links that should emit analytics events.
- Use theme tokens rather than adding arbitrary site colors where a token exists.
- Use local project assets from `public/images/assets/projects/` and preserve numeric image ordering.
- Keep route handlers small and validate external input at the boundary.
- Update `changelog/entries.json` for normal pull requests unless the `no-changelog` exception is intentionally used.
- Run content validation, tests, build, and typecheck before handing work to the next agent.

## Build commands

```bash
pnpm run dev                 # Contentlayer watch plus Next dev server
pnpm run contentlayer:generate
pnpm run validate:content
pnpm test
pnpm run build
pnpm run ci                  # validation, tests, and build
```

`pnpm run lint` runs `eslint src` (the removed `next lint` command was replaced in Phase 5) and standalone `pnpm exec tsc --noEmit` is clean. Both are part of the standard pre-handoff gate alongside content validation, tests, and build.
