FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN --mount=type=cache,target=/cache/og-images \
    mkdir -p _site/og-images && \
    cp -r /cache/og-images/* _site/og-images/ 2>/dev/null || true && \
    node_modules/.bin/eleventy && \
    cp -r _site/og-images/* /cache/og-images/ 2>/dev/null || true

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/_site /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
