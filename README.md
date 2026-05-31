# blogfolio

Personal blog, developer portfolio, and translation/proofreading resume -- all in one place. Built with Next.js, Tailwind CSS, and Contentlayer.

## About

**blogfolio** is a statically-generated personal site for me, William East. It serves three purposes:

- **Blog** -- writing on software, life, and working in Korea
- **Dev** -- a portfolio of personal and professional software projects
- **Language Services** -- translation, localization, and proofreading resume (Korean/English)

## Tech stack

| Layer         | Choice                                                |
| ------------- | ----------------------------------------------------- |
| Framework     | Next.js 16 (App Router, SSG)                          |
| Content       | Contentlayer + Markdown/MDX                           |
| Styling       | Tailwind CSS v4 + custom CSS-variable theme system    |
| UI primitives | Radix UI / Base UI                                    |
| Analytics     | Custom (`src/lib/analytics.ts`)                       |
| Fonts         | Bricolage Grotesque, Inter, Geist Mono (Google Fonts) |
| Hosting       | Self-hosted                                           |

## Building for production

```bash
npm run build      # runs contentlayer:generate then next build
npm run start      # starts the production server
```

## Project docs

All architecture, workflow, and operational docs live in [`docs/`](./docs/README.md):

- [Architecture](./docs/architecture.md) -- stack, routes, data flow
- [Hosting](./docs/hosting.md) -- homelab setup (Proxmox + Docker + Cloudflare Tunnel)
- [Deployment](./docs/deployment.md) -- GitHub Actions auto-deploy
- [Media](./docs/media.md) -- image conventions
- [SEO](./docs/seo.md) -- current state and checklist
- [Design System](./docs/design-system.md) -- theme, typography, spacing
- [Content](./docs/content.md) -- how to write and publish posts/projects
- [Maintenance](./docs/maintenance.md) -- changelog, monthly sweep, docs audit
- [Roadmap](./docs/roadmap.md) -- current status and planned phases
