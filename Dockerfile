FROM node:lts

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN yarn install

EXPOSE 1234

CMD ["yarn", "dev"]