FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN node_modules/.bin/eleventy

CMD node scripts/generate-og-images.js && cp -r _site/* /output/