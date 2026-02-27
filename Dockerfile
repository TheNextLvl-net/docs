FROM oven/bun:1.3.10-slim AS builder
WORKDIR /app
COPY . .
RUN bun install --production
RUN bun run build

FROM oven/bun:1.3.10-slim
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/.output /app/.output
EXPOSE 3000
CMD ["bun", "run", ".output/server/index.mjs"]
