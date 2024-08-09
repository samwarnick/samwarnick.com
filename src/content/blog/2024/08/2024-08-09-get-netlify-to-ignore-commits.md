---
title: Get Netlify to Ignore Commits
date: '2024-08-09T15:33'
summary: >-
  I discovered a neat trick to prevent Netlify from building drafts in my
  Micropub server setup.
tags: []
published: false
---
While building my Micropub server, I wanted Netlify to ignore the initial add of the post because I know it is just a draft. Don't need to waste a build on something that won't show.

Turns out you can add `[skip-ci]` to a commit message and Netlify will ignore it! Now my blog will only build when I hit publish in Pages CMS.
