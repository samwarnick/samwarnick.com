---
title: No Build Cache? No Problem
date: '2025-12-13'
published: false
---

Open Graph images have been the bane of my existence. I love them. Seeing a beautiful one in a link preview on Mastodon or iMessage is just chef's kiss. But for whatever reason, [generating them](https://samwarnick.com/blog/i-just-want-to-generate-an-og-image/), [caching them](https://samwarnick.com/blog/coolify-vs-dokploy/), etc. has nearly destroyed me. But I think I may have got an almost solid solution.

On this blog, I have used [eleventy-plugin-og-image](https://github.com/KiwiKilian/eleventy-plugin-og-image) for a long time. Pretty simple to use, but build times take a long time if you have a lot of pages with OG images. With the Netlify cache plugin and a custom hash function, I was able to get my builds down [from a few minutes to like 1](https://samwarnick.com/blog/making-my-builds-300-faster/). No need to regenerate these images every time. But caching these images with Coolify seemed to be impossible.

So I decided to flip the script a little bit. I removed eleventy-plugin-og-image and no longer generate OG images at build time 😱. Instead, I wrote a node script that generates them. But, it generates them _after_ the site is built, deployed, and started. Why? Volume mounts. That's why.

This blog now has a Dockerfile that builds the site and starts an nginx server. I'm very much still a Doker n00b and was surprised to find out that volume mounts are mounted when the container starts, not when the image is built. Slowly but surely, that started to make sense to me. The issue is that when eleventy built the site, it would not see any existing OG images, so it would regenerate them every time. I believe Docker has BuildKit as a way to cache things between builds with `--mount=type=cache`, but Coolify does not seem to support that at this time. Or, at least, I'm not capable enough to figure out how to get it to work.

Now, my Docker entry point will start up nginx to serve the built site, and then immediately run `node scripts/generate-og-images.js`. This script takes a JSON file my eleventy build now generates with all the page titles, a hash[^1], and any overrides for the OG image. Then uses my former nemesis, [resvg-js](https://github.com/thx/resvg-js), to generate the images. Then, it saves them to the mounted media directory. This is mounted from my host machine, so it is persisted. If the image is already there, it doesn't generate it again. What's also cool, since the media is mounted, I can grab them with `readFile` and generate a data URI for the SVG instead of using a URL and needing to fetch it with the _Internet_. It's pretty fast. It can generate and save over 270 images in about 20 seconds. But, it is usually only generating 1 new one. So by the time anyone would visit a new blog post, the OG image will be generated, saved, and available to be served up.

I think it's a somewhat simple solution that took me a lot of learning and time to get to. Yeah, ideally I would do it as part of the build. But I think this is about as good as I'm going to get[^2].

[^1]: I create the hash from the page title and which image to use for the background. If either of those change, the hash will change, and a new image will be generated.
[^2]: Until Coolify has a good option for caching between builds reliably.