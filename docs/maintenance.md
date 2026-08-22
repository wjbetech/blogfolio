# Maintenance

Maintenance keeps the content, public URLs, production automation, and documentation aligned. The repository has an automated monthly reminder and a manually maintained changelog.

## Monthly reminder

`.github/workflows/maintenance-reminder.yml` runs on the first Monday of each month and opens a GitHub issue. It can also be triggered manually.

The issue currently prompts review of:

- content and stale posts
- dependencies
- Docker base images
- GitHub Actions versions
- SEO and search visibility
- Cloudflare Tunnel health
- secrets and tokens
- homelab disk and memory usage

The workflow name is `maintenance-reminder.yml`; do not refer to the obsolete `monthly-maintenance.yml` filename.

## Content sweep

Review:

- posts or projects still marked `draft` (currently none)
- project descriptions and links
- `publishedAt` and `updatedAt`
- referenced local images
- public route changes
- whether the blog is supporting development and language-service goals

Run:

```bash
pnpm run validate:content
pnpm test
pnpm run build
```

Standalone typecheck is part of the standard gate:

```bash
pnpm exec tsc --noEmit
```

## Changelog

`changelog/entries.json` powers the changelog displayed on `/dev` and is validated with Zod by `src/lib/changelog/entryParser.ts`.

Normal pull requests should add a changelog entry. `check-changelog.yml` enforces this for pull requests targeting `master`, unless the `no-changelog` label is present.

Entries use:

- a `YYYY-MM-DD` date
- a semver version
- one or more allowed categories
- a non-empty single-line description of 280 characters or fewer

## Dependency updates

Dependency updates should be isolated from feature work and verified with content validation, tests, build, and typecheck. Contentlayer is currently pinned to the 0.3 line; do not replace it merely because it is old. Reconsider that dependency only if it becomes a concrete compatibility or maintenance problem.

## Production review

The homelab is operational. Review the actual systems, not only repository files:

- self-hosted runner availability
- Docker Compose service health
- deployed GHCR image tag
- Cloudflare Tunnel status
- public `https://wjbeast.com` response
- Resend contact delivery

Image publication is gated on the content-validation workflow succeeding, and deploys pin the exact built commit. Manual workflow dispatch (which falls back to `:latest`) remains an accepted residual risk, not a reason to assume a failed CI run stopped deployment. Dependabot opens Actions-update PRs weekly; they skip the changelog check automatically.

## Documentation audit

After a meaningful architectural or route change, check:

1. `docs/architecture.md`
2. `docs/content.md`
3. `docs/seo.md`
4. `docs/media.md`
5. `docs/deployment.md`
6. `docs/hosting.md`
7. `docs/design-system.md`
8. `docs/roadmap.md` and `docs/todo.md`

Search for stale route and publication references, especially:

```text
/portfolio/[slug]
accessible drafts
williameast.com
Framer Motion
14 themes
planned deployment infrastructure
```

Do not rewrite documentation for stylistic reasons. Correct it when code, product decisions, or operational behavior changes.
