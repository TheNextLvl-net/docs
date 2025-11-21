FROM oven/bun:latest AS base

WORKDIR /app

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun install
RUN bun run build

USER bun
ENTRYPOINT ["bun", "run", "start"]