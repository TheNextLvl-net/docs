FROM oven/bun:1.3.12-slim AS builder
WORKDIR /app
COPY . .
ARG PAT_GITHUB
ARG FASTSTATS_UPLOAD_TOKEN
ARG VITE_FASTSTATS_SITEKEY
ARG VITE_FASTSTATS_SCRIPT_URL
ARG VITE_PUBLIC_BASE_URL
ARG GITHUB_REF_NAME
ARG GITHUB_SHA

ENV VITE_FASTSTATS_SITEKEY=$VITE_FASTSTATS_SITEKEY
ENV VITE_FASTSTATS_SCRIPT_URL=$VITE_FASTSTATS_SCRIPT_URL
ENV VITE_PUBLIC_BASE_URL=$VITE_PUBLIC_BASE_URL

RUN bun install --frozen-lockfile
RUN bun run build

FROM oven/bun:1.3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/.output /app/.output
EXPOSE 3000
CMD ["bun", "run", ".output/server/index.mjs"]
