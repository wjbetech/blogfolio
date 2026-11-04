# Deployment

Blogfolio is deployed to an operational homelab. The production path is Docker image publication to GitHub Container Registry followed by a self-hosted GitHub Actions runner pulling the image and restarting Docker Compose. Cloudflare Tunnel provides public access without inbound router ports.

The staging stack has its own workflow, image tag, Compose project, and tunnel. See [staging.md](./staging.md).

## Actual workflow files

### `ci-content-validation.yml`

Triggers on:

- pull requests targeting `master`
- pushes to `master`

Runs on a GitHub-hosted runner with Node 20 and performs:

1. `pnpm install --frozen-lockfile`
2. `pnpm run validate:content`
3. `pnpm run test:ci`
4. `pnpm run build`

This is the repository's quality gate. Since Phase 5, `build-and-push.yml` triggers on this workflow's successful completion (`workflow_run` with `conclusion == "success"`), so a failed validation run blocks image publication.

### `build-and-push.yml`

Triggers on pushes to `master`, or manual dispatch on `master`. Its own validation job must pass before image publication. Validation, checkout, and image tags use the same full commit SHA.

It:

1. checks out the repository
2. authenticates to GHCR
3. builds Docker metadata and tags
4. builds and pushes `ghcr.io/<repository>` using Docker Buildx
5. passes `NEXT_PUBLIC_SITE_URL` as a Docker build argument, defaulting to `https://wjbeast.com`

The workflow runs its own validation before image publication, but one residual risk remains: manual image builds must validate before publication; standalone manual deploy dispatch is rejected. Treat an unexpected production image as a reason to check for a manual dispatch.

### `deploy.yml`

Triggers after the `Build and Push Docker Image` workflow succeeds, or manually.

It runs on:

```text
[self-hosted, homelab]
```

The runner:

1. resolves the image tag — the full SHA of the commit the build produced (`workflow_run.head_sha`); standalone manual deploy dispatch is rejected
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

Image publication requires its own validation job, and automatic deployments pin the full validated commit SHA. Standalone manual deployments are rejected. Dependabot PRs skip the changelog check automatically.

## Security headers

The production proxy enforces a per-request nonce script CSP. next.config.ts supplies baseline headers for all routes, including API/static responses. Inline styles remain supported for the dynamic UI, but arbitrary inline scripts are blocked on pages. Existing HTTPS, frame, MIME, referrer, and permissions headers remain enabled.

## Security hardening (2026-11)

Production deploy checks out the successful build commit and runs its Compose file with `/home/will/blogfolio` as the project directory, preserving the host environment file. Containers have CPU/memory/PID and log limits, dropped capabilities, and no-new-privileges. Cloudflared is version-pinned. Image builds validate their own immutable input and audit production dependencies. Master and staging require PRs/checks; deployment environments allow only their named branches.

The contact route trusts a validated CF-Connecting-IP only because the supported public ingress is Cloudflare Tunnel. Maintain that ingress boundary: alternate direct access must not accept user-supplied proxy headers. Apply an edge rate limit for POST /api/contact in Cloudflare as additional protection.

Strict nonce-based script CSP is enforced by proxy.ts; JSON-LD, theme bootstrap, and analytics receive the nonce. Styles remain inline-compatible for existing dynamic theme/UI styles.
