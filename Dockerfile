# syntax=docker/dockerfile:1.7
# =============================================================================
# Elite Algos Labs — production image
# -----------------------------------------------------------------------------
# Three stages so the runtime image contains only what is needed to serve:
#
#   deps    installs node_modules from the lockfile alone (best layer cache —
#           this layer is only rebuilt when package*.json changes)
#   builder compiles the app and emits .next/standalone
#   runner  copies the standalone output; NO node_modules, NO source, NO npm
#
# Result: ~180 MB rather than ~1.2 GB, running as an unprivileged user.
# =============================================================================

ARG NODE_VERSION=24.19.0

# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

# `npm ci` requires the lockfile and installs exactly what it pins.
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Baked into the client bundle at build time, so it must be present HERE and not
# only at runtime. Everything secret (AUTH_SECRET, ADMIN_ACCOUNTS) is read at
# runtime instead and must never be passed as a build arg — build args are
# recoverable from image history.
ARG NEXT_PUBLIC_SITE_URL=https://elitealgoslabs.com
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run unprivileged. A container escape from root is a host compromise.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --ingroup nodejs nextjs

# `public` and the static chunks are not included in the standalone trace and
# must be copied explicitly — a documented Next.js quirk, and the usual cause of
# a working build that serves unstyled pages.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# Hits a real route rather than a synthetic endpoint, so the check fails if
# rendering is broken and not merely if the process is alive.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/en').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
