# Deployment

How code gets from `master` on GitHub to production on the homelab.

---

## Overview

```
git push origin master
        |
        v
GitHub Actions (GitHub-hosted runner)
  1. ci-content-validation  -- validate + test + build
  2. build-and-push         -- build Docker image → push to ghcr.io  (to write)
        |
        | image pushed to ghcr.io/wjbetech/blogfolio:latest
        v
GitHub Actions (self-hosted runner on homelab)
  4. deploy                 -- pull new image → docker compose up -d  (to write)
```

**Why a self-hosted runner?** The homelab has no open inbound ports (traffic only flows through Cloudflare Tunnel). GitHub cannot SSH into the server from its hosted runners. A self-hosted runner installed on the homelab solves this: it polls GitHub's API over an outbound HTTPS connection, so no ports need to be forwarded. When a deploy job targets `runs-on: self-hosted`, the runner executes the job locally on the homelab.

---

## Existing workflows

### `ci-content-validation.yml`

Triggers on: push to `master` and all PRs targeting `master`.

Steps:

1. `npm ci` -- install dependencies
2. `npm run validate:content` -- frontmatter, slugs, local asset checks
3. `npm test` -- Jest test suite
4. `npm run build` -- production Next.js build (catches type errors, missing pages, etc.)

This is the quality gate. The deploy workflow should only run after this passes.

## Workflows to write (Phase B)

### `build-and-push.yml` (GitHub-hosted runner)

Triggers after `ci-content-validation` passes on `master`.

```yaml
# .github/workflows/build-and-push.yml  (target -- not yet written)
name: Build and push Docker image

on:
  workflow_run:
    workflows: ["Content Validation CI"]
    branches: [master]
    types: [completed]

jobs:
  build:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/wjbetech/blogfolio:latest
```

### `deploy.yml` (self-hosted runner on homelab)

Triggers after `build-and-push` completes.

```yaml
# .github/workflows/deploy.yml  (target -- not yet written)
name: Deploy to homelab

on:
  workflow_run:
    workflows: ["Build and push Docker image"]
    branches: [master]
    types: [completed]

jobs:
  deploy:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: self-hosted
    steps:
      - name: Pull latest image
        run: docker pull ghcr.io/wjbetech/blogfolio:latest

      - name: Restart stack
        run: docker compose -f /path/to/docker-compose.yml up -d
```

---

## Setting up the self-hosted runner (one-time)

1. On the homelab Ubuntu LXC, navigate to the blogfolio repo on GitHub: **Settings → Actions → Runners → New self-hosted runner**
2. Select **Linux** and follow the install commands GitHub provides
3. Start the runner as a service so it survives reboots:
   ```bash
   sudo ./svc.sh install
   sudo ./svc.sh start
   ```
4. The runner will appear as **Idle** in the GitHub UI when healthy
5. The `deploy.yml` workflow targets `runs-on: self-hosted` -- it will route to this runner

---

## Required GitHub secrets

Set these in **GitHub → Settings → Secrets and variables → Actions**:

| Secret         | Required? | Value                                                                  |
| -------------- | --------- | ---------------------------------------------------------------------- |
| `GITHUB_TOKEN` | No        | Auto-provided by GitHub — no manual setup needed                       |
| `DEPLOY_DIR`   | Yes       | Absolute path on the homelab where `docker-compose.yml` lives (e.g., `/opt/blogfolio` or `/home/user/blogfolio`) |

The Docker image is pushed to GitHub Container Registry (ghcr.io) using the built-in `GITHUB_TOKEN`, so no Docker Hub account or separate registry token is needed.

## Required environment variables on the homelab

The self-hosted runner executes `docker compose up -d` on the homelab. The host must have these environment variables available (e.g., via a `.env` file next to `docker-compose.yml`, or exported in the shell before the runner starts):

| Variable               | Required? | Description                                                   |
| ---------------------- | --------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No        | Public URL (default: `https://williameast.com`)               |
| `CLOUDFLARE_TUNNEL_TOKEN` | Yes    | Cloudflare Tunnel token (see `hosting.md`)                    |
| `RESEND_API_KEY`       | Yes       | Resend API key for the contact form                           |
| `CONTACT_TO_EMAIL`     | Yes       | Email address that receives contact form submissions          |

The `deploy.yml` workflow runs `docker compose up -d --pull always` from `secrets.DEPLOY_DIR`. The simplest approach is to place a `.env` file in that directory alongside `docker-compose.yml`, and ensure the runner process has access to it (e.g., `export $(cat .env | xargs)` before the runner starts, or use systemd service environment files).

---

## Files to create (Phase B checklist)

- [ ] `Dockerfile` -- multi-stage Next.js build (see `hosting.md`)
- [ ] `docker-compose.yml` -- `app` + `cloudflared` services (see `hosting.md`)
- [ ] `.env.example` -- documents required env vars, no real values
- [ ] `.github/workflows/build-and-push.yml`
- [ ] `.github/workflows/deploy.yml`
- [ ] `next.config.ts` -- add `output: "standalone"` before Docker build
