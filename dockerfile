FROM node:slim

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

EXPOSE 3000

CMD yarn start
