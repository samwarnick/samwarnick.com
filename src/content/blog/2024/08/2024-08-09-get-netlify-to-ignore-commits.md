---
title: Get Netlify to Ignore Commits
date: 2024-08-09T15:33
summary: Quick tip to prevent Netlify from building certain commits.
tags:
  - Blog
published: true
---
While building my Micropub server, I wanted Netlify to ignore the initial addition of the post file. It is saved as a draft and I don't need to waste a build on something that won't show.

Turns out you can add `[skip-ci]` to a commit message and Netlify will ignore it! Now my blog will only build when I hit publish in Pages CMS.