FROM oven/bun:1.3.10-slim AS builder

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "start"]