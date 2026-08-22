# blogfolio

Personal website, developer portfolio, and translation/proofreading résumé — all in one place. Built with Next.js, Tailwind CSS, and Contentlayer.

## About

**blogfolio** is a build-time content-driven personal site for William East. Its near-term purpose is to attract:

- development work through the `/dev` project portfolio
- translation, localization, proofreading, editing, and consulting work through `/language-services`
- supporting credibility through the blog

The blog covers software, life, and working in Korea, but Blogfolio is not primarily a high-volume publishing platform.

## Important routes

- `/dev` — project index
- `/dev/[slug]` — canonical project detail route
- `/portfolio` — legacy redirect to `/dev`
- `/portfolio/[slug]` — legacy redirect to `/dev/[slug]`
- `/blog` — published blog posts
- `/language-services` — language-service résumé and experience
- `/contact` — contact form

Draft content is not publicly generated or listed.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 App Router |
| Language | TypeScript 5 |
| Content | Contentlayer + Markdown/MDX |
| Styling | Tailwind CSS v4 + custom CSS-variable themes |
| UI primitives | Radix UI / small shadcn-style component set |
| Analytics | Opt-in Plausible integration (`src/lib/analytics.ts`) |
| Fonts | Bricolage Grotesque, Inter, Geist Mono |
| Email | Resend contact endpoint |
| Hosting | Operational self-hosted homelab with Docker and Cloudflare Tunnel |

## Building for development and production

Requires pnpm (a `packageManager` field pins the version; Corepack handles it).

```bash
pnpm run dev
pnpm run validate:content
pnpm test
pnpm run build
pnpm run start
```

`pnpm run ci` runs content validation, tests, and the production build. `pnpm run lint` runs `eslint src`.

## Project docs

All architecture, workflow, content, operational, and roadmap docs live in [`docs/`](./docs/README.md):

- [Architecture](./docs/architecture.md)
- [Content](./docs/content.md)
- [Design system](./docs/design-system.md)
- [Media](./docs/media.md)
- [SEO](./docs/seo.md)
- [Hosting](./docs/hosting.md)
- [Deployment](./docs/deployment.md)
- [Maintenance](./docs/maintenance.md)
- [Roadmap](./docs/roadmap.md)
- [Engineering handoff](./docs/todo.md)
