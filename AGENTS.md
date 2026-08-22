# AGENTS.md

Configuration for coding agents working in this repository.

## Project

Blogfolio is William East's personal website (Next.js 16 App Router, TypeScript, Tailwind v4, Contentlayer 0.3). Its purpose is attracting development work and language-service work; the blog supports those goals. It is not a high-volume publishing platform.

## Ground rules

- Read `docs/README.md` first; it indexes the human-facing documentation.
- `draft` is a real publication state: drafts must never be publicly generated, listed, or included in RSS/sitemap/JSON-LD. The boundary lives in `src/lib/content.ts`.
- `/dev/[slug]` is the only canonical project-detail route; never reintroduce `/portfolio/[slug]` as a page.
- Secrets stay out of Git. `.env` and `.env.local` are gitignored; only `.env.example` is tracked.
- Run `pnpm run validate:content`, `pnpm test`, `pnpm run build`, `pnpm exec tsc --noEmit`, and `pnpm run lint` before handing work on.
- PRs targeting `master` must modify `changelog/entries.json` unless the `no-changelog` label is applied.

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`wjbetech/blogfolio`) via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root, created lazily as decisions land. See `docs/agents/domain.md`.
