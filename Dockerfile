# Multi-stage Dockerfile for the Soul Genia landing app
# Stage 1: deps - install production + dev deps
# Stage 2: build - compile Next.js
# Stage 3: runner - minimal Alpine runtime image

# Stage 1: Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app

# Install libc compatibility for native modules.
RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci

# Stage 2: Build
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time public env vars. These are safe to bake into the frontend bundle.
ARG NEXT_PUBLIC_APP_URL=https://soulgenia.com.br
ARG NEXT_PUBLIC_WHATSAPP_URL=""
ARG NEXT_PUBLIC_POSTHOG_KEY=""
ARG NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
ARG NEXT_PUBLIC_META_PIXEL_ID=""

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_WHATSAPP_URL=$NEXT_PUBLIC_WHATSAPP_URL
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY
ENV NEXT_PUBLIC_POSTHOG_HOST=$NEXT_PUBLIC_POSTHOG_HOST
ENV NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Runtime
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/healthcheck || exit 1

CMD ["node", "server.js"]
