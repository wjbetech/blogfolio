# Hosting

Planned production infrastructure for blogfolio. The app is still in active development and has not yet been deployed to the homelab. This document describes the target architecture to implement when ready.

---

## Infrastructure overview

```
Internet
    |
    | HTTPS (443) -- no open ports on your router
    v
Cloudflare Edge  (williameast.com)
    |
    | Cloudflare Tunnel (outbound-only, encrypted)
    v
Ubuntu LXC on Proxmox (ThinkCentre homelab)
    |
    | Docker network (internal)
    v
blogfolio container  :3000
```

Key point: **Cloudflare Tunnel creates an outbound connection from your server to Cloudflare**. Your router never has any ports forwarded. The homelab initiates the tunnel; Cloudflare's edge routes traffic in through it. This is secure by default.

---

## Layer by layer

### 1. Proxmox / LXC

- Proxmox VE running on the ThinkCentre homelab
- Ubuntu 24.04 LXC container dedicated to blogfolio
- Docker and Docker Compose installed inside the LXC
- Static local IP assigned (e.g., `192.168.1.x`) -- note it for `cloudflared` config

### 2. Docker Compose

Two services: the Next.js app, and the Cloudflare Tunnel daemon (`cloudflared`).

```yaml
# docker-compose.yml (target -- not yet written)
services:
  app:
    build: .
    restart: unless-stopped
    environment:
      - NEXT_PUBLIC_SITE_URL=https://williameast.com
      - RESEND_API_KEY=${RESEND_API_KEY}
      - CONTACT_TO_EMAIL=${CONTACT_TO_EMAIL}
    ports:
      - "3000:3000"

  cloudflared:
    image: cloudflare/cloudflared:latest
    restart: unless-stopped
    command: tunnel --no-autoupdate run --token ${CLOUDFLARE_TUNNEL_TOKEN}
    environment:
      - CLOUDFLARE_TUNNEL_TOKEN=${CLOUDFLARE_TUNNEL_TOKEN}
```

`cloudflared` connects to Cloudflare using the tunnel token and forwards `williameast.com` traffic to `http://app:3000` on the internal Docker network. No ports need to be exposed externally.

### 3. Dockerfile

A multi-stage Next.js Dockerfile:

```dockerfile
# Dockerfile (target -- not yet written)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

Requires `output: "standalone"` in `next.config.ts`.

### 4. Cloudflare Tunnel setup (one-time)

1. Log into [dash.cloudflare.com](https://dash.cloudflare.com) → Zero Trust → Networks → Tunnels
2. Create a tunnel → name it `blogfolio`
3. Copy the tunnel token → save to `.env` on the server as `CLOUDFLARE_TUNNEL_TOKEN`
4. Add a public hostname: `williameast.com` → `http://app:3000`
5. Start the stack: `docker compose up -d`

The tunnel will appear as "Healthy" in the dashboard when `cloudflared` is running.

### 5. Domain

- Domain: `williameast.com`
- DNS managed by Cloudflare (nameservers pointed at Cloudflare)
- The tunnel connector adds the CNAME record automatically
- SSL/TLS: Full (strict) in Cloudflare SSL settings

---

## Environment variables

| Variable                  | Where set                                      | Value                           |
| ------------------------- | ---------------------------------------------- | ------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | `.env` on server (and in `docker-compose.yml`) | `https://williameast.com`       |
| `CLOUDFLARE_TUNNEL_TOKEN` | `.env` on server (never commit this)           | Token from Cloudflare dashboard |
| `RESEND_API_KEY`          | `.env` on server (never commit this)           | API key from [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL`        | `.env` on server (and in `docker-compose.yml`) | Email that receives contact form submissions |

Never commit `.env` to the repository. See `.env.example` in the repo root for the expected variables (values omitted).

---

## Deployment flow (planned)

See [deployment.md](./deployment.md) for the GitHub Actions pipeline that builds and pushes a new Docker image whenever `master` receives a push.

---

## Checklist before going live

- [ ] `williameast.com` nameservers pointed at Cloudflare
- [ ] Cloudflare Tunnel created and token saved to server `.env`
- [ ] `Dockerfile` written and tested locally with `docker build .`
- [ ] `docker-compose.yml` written with `app` + `cloudflared` services
- [ ] `NEXT_PUBLIC_SITE_URL` set to `https://williameast.com` in server `.env`
- [ ] `RESEND_API_KEY` and `CONTACT_TO_EMAIL` set in server `.env`
- [ ] `next.config.ts` has `output: "standalone"` enabled
- [ ] GitHub Actions workflow written and tested (see `deployment.md`)
- [ ] Cloudflare SSL/TLS set to Full (strict)
- [ ] Test full round-trip: `https://williameast.com` → Cloudflare → tunnel → app
