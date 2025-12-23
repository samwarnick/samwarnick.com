---
title: Should I Just Build Locally?
date: '2025-12-22T20:05'
published: true
summary: >-
  I'm questioning whether I should build my static site locally instead of on my
  server to save time and resources.
tags:
  - Self-hosting
  - Blog
---
As I've been diving into the world of self-hosting, I've begun to rethink a lot of how I do things. Having used Netlify for a long time, I'm so used to pushing src to GitHub and Netlify building and deploying. I've done this with Nuxt, Astro, Eleventy, and more. With Coolify, I'm doing the same. For example, my blog is built as part of building the Docker image. It takes a couple minutes on some fairly limited hardware[^1]. Not the end of the world. But, it makes me wonder, why? Why spend resources on building a static site.

My MacBook can build my site—including open graph images—in about 25 seconds. I have a publish script that already does some other media transformation and optimization and saves them to my server. So I'm thinking I should modify it to build the site and also sync it to my server. I could still save the source files to Git. I would be faster.

There are a couple downsides though. I used to have a GitHub action trigger a rebuild on a cron job to publish scheduled posts. It is more difficult to do something like that if I'm building locally. I also had it automatically add new GitHub issues. Keeping the build in some sort of async pipeline opens up a lot of possibilities.

Like everything, it's all tradeoffs. Thinking it over. Simplicity vs convenience.

[^1]: A VM on a Synology. I still need to test how fast builds are with my new server when it arrives.
