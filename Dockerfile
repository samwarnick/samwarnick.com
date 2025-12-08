FROM node:24-alpine AS runtime

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN apk add --no-cache nginx

RUN mkdir -p /run/nginx
RUN mkdir -p /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
