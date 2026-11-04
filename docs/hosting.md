# Hosting

Blogfolio is hosted on an operational self-hosted homelab. The repository contains the application image and Compose configuration; the host supplies secrets and runs the deployment workflow.

## Production topology

```text
Internet
   |
   v
Cloudflare Edge: wjbeast.com
   |
   | outbound Cloudflare Tunnel
   v
Ubuntu LXC on Proxmox homelab
   |
   v
Docker Compose
   |-- blogfolio app, localhost:3000
   `-- cloudflared sidecar
```

The app is bound to `127.0.0.1:3000` in Compose. Cloudflare Tunnel is the public entry point, so the router does not need an inbound port-forward for Blogfolio.

## Components

### Proxmox/LXC

The production host is an Ubuntu LXC running inside the homelab's Proxmox environment. Docker and Docker Compose run inside that environment.

The exact host networking, storage, backup, and runner-service configuration are operational details of the homelab and are not defined by this repository. Do not invent them in application documentation.

### Docker Compose

`docker-compose.yml` runs:

- `ghcr.io/wjbetech/blogfolio` as the app, pinned by deploy automation to the exact built commit (`BLOGFOLIO_IMAGE_TAG`; falls back to `latest` on manual deploys)
- `cloudflare/cloudflared:latest` as the tunnel sidecar

The app has a healthcheck. The tunnel depends on the app becoming healthy.

### Cloudflare Tunnel

The tunnel token is supplied through `CLOUDFLARE_TUNNEL_TOKEN`. Cloudflare routes the public hostname to the app service on the internal Compose network.

The public domain is:

```text
https://wjbeast.com
```

### Container runtime

The Dockerfile builds a Next.js standalone application and runs it as a non-root user on Node 22. The production image includes the public assets, standalone server, static build output, and changelog data.

## Environment and secrets

Secrets are not committed. The host-side deployment environment must provide:

- `CLOUDFLARE_TUNNEL_TOKEN`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`

`NEXT_PUBLIC_SITE_URL` should be set to `https://wjbeast.com` unless an intentional deployment-specific override is being tested.

The repository's `.env.example` documents the variable names. Host-side secret storage and runner-service injection are operational concerns; this document does not prescribe an unverified mechanism for them.

## Production ownership boundary

The homelab is already operational. This is not a future hosting tutorial or a checklist for creating the infrastructure from scratch.

The repository can document the intended topology and automation, but only the homelab and Cloudflare systems can confirm:

- whether the runner is online
- whether the app container is healthy
- whether the tunnel is connected
- which image is currently deployed
- whether the public domain resolves correctly

See [deployment.md](./deployment.md) for the repository's workflow behavior.

## Host security verification still required

Repository changes cannot establish LAN isolation. Before treating the host as hardened, verify an unprivileged LXC or dedicated VM, no unnecessary host mounts, firewall denial from the app/runner to LAN and Proxmox management, no router port forwards or UPnP exposure (including IPv6), and a dedicated runner identity with only deployment permissions. Docker access is powerful and must not be granted to untrusted jobs. Patch the host kernel, Docker, and Proxmox independently of the application image.

From the Proxmox web UI, select the Ubuntu container/VM that runs Blogfolio and open its console. Read-only checks can then collect `hostname`, `id`, `docker ps --format '{{.Names}} {{.Image}} {{.Ports}}'`, `ss -lnt`, and firewall status. Do not paste `.env`, tunnel tokens, or full `docker inspect` output: those can contain credentials. An administrator must determine firewall rules from the actual network topology before changing them.
