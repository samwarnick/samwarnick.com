#!/bin/sh
set -e

echo "=== Starting Eleventy build with cache ==="

# Ensure folders exist
mkdir -p /cache/og-images
mkdir -p /app/_site/og-images

cp -r /cache/og-images/* /app/_site/og-images/ 2>/dev/null || true

node_modules/.bin/eleventy

cp -r /app/_site/og-images/* /cache/og-images/ 2>/dev/null || true

echo "=== Eleventy build complete ==="

nginx -g 'daemon off;'
