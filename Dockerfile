FROM oven/bun:1.3.10-slim AS builder
WORKDIR /app
COPY . .
RUN bun install --production
RUN bun run build

FROM oven/bun:1.3.10-slim
WORKDIR /app
COPY --from=builder /app/.output /app/.output
EXPOSE 3000
CMD ["bun", "run", "start"]