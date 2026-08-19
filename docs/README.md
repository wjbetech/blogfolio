# Blogfolio documentation

This directory contains the human-facing documentation for Blogfolio: its architecture, content workflow, design conventions, production infrastructure, maintenance practices, and planned engineering work.

## Source of truth

- **Current behavior:** the application code, configuration, content files, scripts, workflows, and tests.
- **Content schema and validation:** `contentlayer.config.ts` and `scripts/validate-content.mjs`, read together. Where they disagree, the difference should be treated as technical debt rather than silently ignored.
- **Product direction:** the decisions recorded in `docs/roadmap.md` and `docs/todo.md`.
- **Release history:** `changelog/entries.json`.
- **Transition context:** `HANDOFF.md` is a temporary handoff document, not a substitute for the repository or these docs.

Planned work is explicitly labelled as planned. These documents do not imply that the future roadmap has been implemented.

## Index

| File | What it covers |
| --- | --- |
| [architecture.md](./architecture.md) | Stack, repository structure, routes, data flow, and architectural conventions |
| [hosting.md](./hosting.md) | The operational homelab, Docker, Cloudflare Tunnel, and production topology |
| [deployment.md](./deployment.md) | The actual GitHub Actions, GHCR, and homelab deployment workflow |
| [media.md](./media.md) | Image storage, naming, ordering, and rendering conventions |
| [seo.md](./seo.md) | Metadata, canonical URLs, RSS, sitemap, robots, and structured data |
| [design-system.md](./design-system.md) | Theme tokens, typography, current styling conventions, and planned article styling |
| [content.md](./content.md) | Markdown/MDX authoring, frontmatter, publication states, and validation |
| [maintenance.md](./maintenance.md) | Changelog, maintenance workflow, dependency updates, and documentation checks |
| [roadmap.md](./roadmap.md) | The small number of agreed product and engineering phases |
| [todo.md](./todo.md) | The current engineering handoff and first task for the next agent |
| [posts_audit.md](./posts_audit.md) | Current blog image audit |

## Quick orientation

- **Understand the system:** start with [architecture.md](./architecture.md).
- **Add or update content:** read [content.md](./content.md) and [media.md](./media.md).
- **Work on styling:** read [design-system.md](./design-system.md).
- **Operate production:** read [hosting.md](./hosting.md) and [deployment.md](./deployment.md).
- **Pick up future engineering:** read [todo.md](./todo.md), then [roadmap.md](./roadmap.md).
