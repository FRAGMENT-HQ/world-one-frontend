FROM node:18-alpine

LABEL maintainer="Shree Ram"

WORKDIR /usr/world-one-frontend

COPY ./package.json ./package.json

COPY . .

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]
