# Deployment

Blogfolio is deployed to an operational homelab. The production path is Docker image publication to GitHub Container Registry followed by a self-hosted GitHub Actions runner pulling the image and restarting Docker Compose. Cloudflare Tunnel provides public access without inbound router ports.

## Actual workflow files

### `ci-content-validation.yml`

Triggers on:

- pull requests targeting `master`
- pushes to `master`

Runs on a GitHub-hosted runner with Node 20 and performs:

1. `npm ci`
2. `npm run validate:content`
3. `npm test -- --runInBand`
4. `npm run build`

This is the repository's quality gate. Since Phase 5, `build-and-push.yml` triggers on this workflow's successful completion (`workflow_run` with `conclusion == "success"`), so a failed validation run blocks image publication.

### `build-and-push.yml`

Triggers when `ci-content-validation.yml` completes successfully on `master`, or on manual workflow dispatch. The build job is skipped unless the validation workflow concluded with `success`.

It:

1. checks out the repository
2. authenticates to GHCR
3. builds Docker metadata and tags
4. builds and pushes `ghcr.io/<repository>` using Docker Buildx
5. passes `NEXT_PUBLIC_SITE_URL` as a Docker build argument, defaulting to `https://wjbeast.com`

The workflow waits for the validation workflow rather than running fully independently, but one residual risk remains: manual `workflow_dispatch` bypasses CI entirely and deploys the mutable `:latest` tag. Treat an unexpected production image as a reason to check for a manual dispatch.

### `deploy.yml`

Triggers after the `Build and Push Docker Image` workflow succeeds, or manually.

It runs on:

```text
[self-hosted, homelab]
```

The runner:

1. resolves the image tag — the short SHA of the commit the build produced (`workflow_run.head_sha`), or `latest` on manual dispatch
2. logs into GHCR
3. pulls `ghcr.io/<repository>:<tag>`
4. runs `docker compose up -d --pull always` from `/home/will/blogfolio` with `BLOGFOLIO_IMAGE_TAG=<tag>`, which pins the Compose app service to that exact image

The host's `docker-compose.yml` reads `${BLOGFOLIO_IMAGE_TAG:-latest}`, so manual deploys without the variable fall back to `latest`.

The working directory and runner labels are repository configuration, not generic placeholders. Do not invent a different deployment path in documentation or automation.

### `check-changelog.yml`

Pull requests targeting `master` must modify `changelog/entries.json`, unless the pull request has the `no-changelog` label.

### `maintenance-reminder.yml`

A scheduled GitHub Actions workflow creates a maintenance issue on the first Monday of each month. It can also be run manually.

## Container behavior

`Dockerfile` uses three stages:

1. Node 22 dependency installation
2. Contentlayer and Next.js standalone build
3. minimal Node 22 runtime image using a non-root `nextjs` user

The runtime image includes:

- `public/`
- `.next/standalone/`
- `.next/static/`
- `changelog/`

`docker-compose.yml` runs:

- `app` from the GHCR image, bound to `127.0.0.1:3000`
- `cloudflared` as a tunnel sidecar

The app healthcheck must pass before the tunnel service starts.

## Environment behavior

The repository provides `.env.example` as a template. Secrets must remain outside Git.

The Compose deployment consumes:

| Variable | Role |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical absolute URL; default `https://wjbeast.com` |
| `RESEND_API_KEY` | Resend server credential |
| `CONTACT_TO_EMAIL` | Contact-form recipient |
| `CLOUDFLARE_TUNNEL_TOKEN` | Cloudflare Tunnel credential |

`NEXT_PUBLIC_SITE_URL` is also passed at image-build time because public URL values are used in generated metadata and structured data. Runtime Compose configuration supplies the application environment as well.

## Operational boundary

The homelab and public deployment are operational according to the project owner. Repository inspection can verify the workflows and configuration, but cannot verify current runner health, tunnel health, image age, or public response behavior.

When diagnosing production issues, inspect the actual homelab runner, Docker Compose state, container health, GHCR image tag, and Cloudflare Tunnel dashboard rather than relying on this document alone.

## Deployment gating

Image publication is gated on the validation workflow succeeding (Phase 5), and deploys pin the exact built commit instead of tracking `:latest` (2026-08). Residual risks that remain by design: manual dispatch skips CI and falls back to `latest`, and Dependabot PRs skip the changelog check automatically.

## Security headers

`next.config.ts` applies `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, and a `Content-Security-Policy` to every route. The CSP allowlists `'self'` plus the Plausible origin (derived from `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC`). It currently permits `'unsafe-inline'` for scripts because Next.js App Router ships hydration data as inline scripts; migrating to nonce-based CSP with `strict-dynamic` is the known follow-up.
