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

This is the repository's quality gate, although it is not currently configured as an upstream dependency of the image-publishing workflow.

### `build-and-push.yml`

Triggers independently on:

- pushes to `master`
- manual workflow dispatch

It:

1. checks out the repository
2. authenticates to GHCR
3. builds Docker metadata and tags
4. builds and pushes `ghcr.io/<repository>` using Docker Buildx
5. passes `NEXT_PUBLIC_SITE_URL` as a Docker build argument, defaulting to `https://wjbeast.com`

The workflow currently runs independently of `ci-content-validation.yml`. Do not describe it as waiting for CI unless that workflow relationship is changed.

### `deploy.yml`

Triggers after the `Build and Push Docker Image` workflow succeeds, or manually.

It runs on:

```text
[self-hosted, homelab]
```

The runner:

1. logs into GHCR
2. pulls `ghcr.io/<repository>:latest`
3. runs `docker compose up -d --pull always` from `/home/will/blogfolio`

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

## Important deployment risk

The validation workflow and image-publishing workflow are separate push-triggered workflows. A failed content validation or test run does not currently prevent `build-and-push.yml` from attempting to publish an image if the Docker build succeeds.

This is a known future engineering task. Until corrected, treat the CI workflow result and the image-publishing result as separate signals.
