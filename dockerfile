FROM node:slim as build

WORKDIR /src

COPY package*.json .

COPY . .

COPY . .

FROM node:slim

WORKDIR /src 

COPY --from=build /src .

EXPOSE 3000

CMD ["npm", "start"]