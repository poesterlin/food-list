FROM oven/bun
WORKDIR /app

COPY bun.lock package.json .

RUN bun i

COPY . .
RUN bun run build

EXPOSE 3000

# set the body size limit to 15MB
ENV BODY_SIZE_LIMIT=15000000
ENV NODE_ENV=production

CMD ["bun", "build/index.js"]