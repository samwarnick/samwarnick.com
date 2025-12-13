#!/bin/sh
set -e

# Start nginx in background
nginx -g 'daemon off;' &

# Generate OG images (logs will show in container logs)
cd /app
node scripts/generate-og-images.js

# Wait for nginx to keep container running
wait