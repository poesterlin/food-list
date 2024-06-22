FROM node:20
WORKDIR /app

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm fetch

ADD . ./
RUN pnpm install -r --offline && pnpm run build

EXPOSE 3000

# set the body size limit to 15MB
ENV BODY_SIZE_LIMIT=15000000
ENV NODE_ENV=production

CMD ["node", "build/index.js"]