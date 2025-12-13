FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN node_modules/.bin/eleventy

FROM nginx:alpine
RUN apk add --no-cache nodejs

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/_site /usr/share/nginx/html

COPY scripts /app/scripts
COPY --from=builder /app/node_modules /app/node_modules

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV BASE_PATH=/usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
