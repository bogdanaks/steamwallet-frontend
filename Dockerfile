FROM node:18.13.0-alpine as builder

RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci
COPY . /app
RUN npm run build

FROM nginx:latest

RUN mkdir -p /steamwallet/front-static
COPY --from=builder /app/build /steamwallet/front-static