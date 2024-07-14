FROM node:22-alpine

RUN apk add --update npm
RUN npm install -g npm

COPY . /app

RUN cd /app && npm install

WORKDIR "/app"

CMD [ "node", "bot.js" ]
