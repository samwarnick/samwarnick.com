---
title: Adding Random to My Blog
date: '2025-05-07T19:47'
summary: >-
  I created a simple Netlify function to redirect visitors to a random post on
  my blog.
tags: []
published: false
---
Dave mentioned in the Discord™️ that he wanted a link to take you to a random post on his blog. I thought, I'll [steal](https://austinkleon.com/steal/) that idea.

I use Netlify and Eleventy. My first thought was parse the sitemap in a Netlify function, pick a random post, and redirect. Then I remembered that I don't have a sitemap. (Take that SEO!) But, I do have a feed.json for some reason. The feed.json already has just my published posts. No additional filtering for published posts, pages, etc. Also, it's JSON, so I can just use `JSON.parse` on the file. Pretty simple.

Here's the Netlify function:

```ts
import type { Context } from '@netlify/functions';
import { readFileSync } from 'fs';

export default async (req: Request, context: Context) => {
    const feedData = JSON.parse(readFileSync('./_site/feed.json', 'utf8'));
    const randomIndex = Math.floor(Math.random() * feedData.items.length);
    const randomPost = feedData.items[randomIndex];
    const redirectUrl = randomPost.url;

    return new Response("Redirecting to a random post...", {
        status: 302,
        headers: {
            Location: redirectUrl,
            'Cache-Control': 'no-cache'
        }})
};
```

Like 10 lines of code? Not bad.

Two small changes to my Netlify config. First, redirect /random to the function. Second, include `/_site/feed.json` in the functions. I'm no expert, but I think this bundles all the included files with the function so they have access to them. Otherwise, it can't read it.

```yml
[[redirects]]
from = "/random"
to = "/.netlify/functions/random-post"
status = 200

[functions]
directory = "functions"
included_files = ["./_site/feed.json"]
```

With that, it works. I'm sure it'll break at some point.

Try it out.
