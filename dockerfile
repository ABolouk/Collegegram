FROM node:slim as build

WORKDIR /src

COPY package*.json .

RUN npm install

COPY . .

FROM node:slim

WORKDIR /src 

COPY --from=build /src .

EXPOSE 8080

CMD ["npm", "start"]