FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS deps
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
COPY package.json bun.lock source.config.ts tsconfig.json ./
COPY src ./src
RUN bun install --frozen-lockfile

FROM base AS build
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM base AS runtime
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/.output ./.output
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3000
CMD ["bun", "run", ".output/server/index.mjs"]

