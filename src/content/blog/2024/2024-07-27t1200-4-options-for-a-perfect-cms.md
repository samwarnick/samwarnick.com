---
title: 4 Options for a Perfect CMS
date: 2024-07-27T12:00
summary: Four options, and I can't decide which is best.
tags:
  - Blog
published: true
---
For the past few months, I've been thinking about my [Fantasy/Dream/Perfect CMS](https://shoptalkshow.com/612/). I'm almost to the point that I want to start tinkering with it and see if I can make anything of my ideas. Most of my ideas are not ground breaking, but quality of life improvements for myself. A few examples:

* Automatically fix title casing of titles.
* Suggest alt text for images.
* Suggest a summary for post.
* Micropub support so I can publish from iA Writer.
* Upload images to CDN.

There are a couple ways I could approach it, and I'm not totally sure what to do.

For reference, my current setup is Eleventy and [Pages CMS](https://pagescms.org). Pages CMS ad two major advantages for me—consistent front matter and image management. Image management is my biggest pain point when blogging. I'm constantly changing how I manage and serve them. Now, I'm not even using Pages CMS, but a Netlify redirect to take advantage of [Netlify Image CDN](https://docs.netlify.com/image-cdn/overview/).

This is all to say, I've got a menagerie of tools making my blog work.

Back to my Dream CMS. Four options:

1. A Pages CMS-like client.
2. A headless CMS.
3. Everything.
4. Nothing.

## A Pages CMS-like Client

Basically, I could create my own Pages CMS with the quality-of-life features I want sprinkled in, including better image management. Keep using my git repo on GitHub as the source of truth. Could even be a macOS client. Create, update, and delete files to update the blog.

## A Headless CMS

Keep using Eleventy, but instead of saving all my content as markdown or JSON files in my repo, have a server with a database that stores it all. Eleventy and Netlify would manage building, caching, and CDN for me.

## Everything

What I mean by this is cut Eleventy and Netlify out. Host the site myself and SSR with [The Perfect Stack](https://samwarnick.com/blog/the-perfect-stack/) or something. This would put me in total control, but would obviously the most work.

## Nothing

Things are mostly working. Pages CMS gives me consistency of frontmatter, which I really appreciate. But development as slowed, and there are still rough edges. Overall, it's great though. I'm getting closer to an image management solution I don't completely hate with a few Shortcuts I've made. Just need to make some changes so images appear in Pages CMS.

Four options, and I can't decide. Analysis paralysis. Something inside of me wants to do the Everything option, knowing it is probably nothing but pain. A headless CMS would probably be the most flexible. A client would be tied directly to GitHub—but could maybe be adapted to work on a local folder instead? Doing nothing sounds easy. But I kinda want a project to waste time on.

What would you do? What have I not considered?