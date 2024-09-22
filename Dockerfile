FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb /

RUN bun install

COPY . .

RUN bun prisma generate
RUN bun prisma migrate deploy

RUN bun run tsc

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "start"]
