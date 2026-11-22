# ==============================================================================
# Ultra-Lightweight Multi-Stage Production Dockerfile for Stuckhere (prblms)
# Stage 1: Build (~200MB build container, discarded)
# Stage 2: Runtime (nginx:alpine-slim ~25MB final production image)
# ==============================================================================

# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Cache package manifests for deterministic, fast layer caching
COPY package.json package-lock.json ./

# Install clean production dependencies with npm ci
RUN npm ci

# Copy application source
COPY . .

# Build production bundle with optimized code-splitting and asset inlining
RUN npm run build

# ==============================================================================
# Stage 2: Minimalist Production Web Server
# ==============================================================================
FROM nginx:alpine-slim AS runner

# Remove default boilerplate site
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy custom high-performance NGINX config (gzip, security headers, SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check to ensure zero-downtime rolling updates
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

# Run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
