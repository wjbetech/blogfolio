# ──────────────────────────────────────────────
# Stage 1: Install dependencies
# ──────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

# ──────────────────────────────────────────────
# Stage 2: Build the application
# ──────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args are baked in at image-build time.
# Override NEXT_PUBLIC_SITE_URL when building for production.
ARG NEXT_PUBLIC_SITE_URL=https://wjbeast.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# next.config.ts must have output: "standalone" for this to work.
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

# ──────────────────────────────────────────────
# Stage 3: Minimal production image
# ──────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy only what Next.js standalone needs
COPY --from=builder /app/public           ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/changelog        ./changelog

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
