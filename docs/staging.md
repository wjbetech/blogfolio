# Staging environment

Staging runs at `https://staging.wjbeast.com` from the long-lived `staging` branch. It uses a separate GHCR image tag, Docker Compose project, application container, and Cloudflare Tunnel from production. The production site remains `https://wjbeast.com` and continues to deploy from `master`.

## One-time setup

1. In the Cloudflare account that manages `wjbeast.com`, create a remotely managed tunnel named `blogfolio-staging`. Add a **Published application** route for `staging.wjbeast.com` with service URL `http://app:3000`. The `app` hostname is available inside the staging Compose network. Cloudflare creates the DNS record when the route is added.
2. Save that tunnel's token as the GitHub Actions repository secret `CLOUDFLARE_STAGING_TUNNEL_TOKEN`. Do not put it in Git or in a workflow input.
3. Confirm the `[self-hosted, homelab]` runner can run Docker Compose and bind `127.0.0.1:3001`. Port 3000 remains allocated to production.
4. Create the `staging` branch from `master` with the staging configuration. Every push to `staging` validates content, runs tests, builds the site, typechecks, lints, publishes an immutable `staging-<full SHA>` image, and updates only the `blogfolio-staging` Compose project.
5. Check the staging workflow, then load `https://staging.wjbeast.com/`, `/robots.txt`, and the contact page. The workflow also checks the app on the runner at `127.0.0.1:3001`.

The first deployment needs the Cloudflare tunnel token before the deploy job starts. The tunnel can exist before the app is running; its public hostname may show an origin error until the first deployment completes.

## Routine use

Merge or push the commits to preview into `staging`. When they are ready for release, merge them into `master` through the normal review and changelog process. `master` still runs the existing production workflow. A manual staging workflow run must be started with the `staging` branch selected.

Staging builds with `NEXT_PUBLIC_SITE_URL=https://staging.wjbeast.com` and `DEPLOYMENT_ENV=staging`. Its pages send `X-Robots-Tag: noindex, nofollow`, metadata marks pages noindex, and `robots.txt` disallows crawling. The contact form is disabled, and the API refuses mail submissions. Staging does not receive production Resend credentials or Plausible configuration.

The staging stack is defined in `docker-compose.staging.yml`; `docker-compose.yml` remains the production stack. If the staging workflow fails, inspect its validate, build, and deploy jobs in that order. On the homelab, inspect `docker compose -p blogfolio-staging -f docker-compose.staging.yml ps` from the runner checkout and the `blogfolio-staging-tunnel` container logs. Do not use the production Compose project name when troubleshooting staging.
