FROM mhart/alpine-node
MAINTAINER Jorge M <foo.bar@resuelve.mx>

ENV PORT=${PORT:-8080}
ENV NODE_ENV=production

RUN apk --no-cache add tini \
  && addgroup -S node \
  && adduser -S -G node node

WORKDIR /app

COPY package.json .

COPY . .

RUN chown -R node:node /app

EXPOSE $PORT

USER node
RUN npm install --silent

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
