---
title: Micropub Again
date: 2024-08-02T19:45
summary: I've set up a new Micropub server on my Synology to "streamline" my
  blogging workflow.
tags:
  - Blog
published: true
---
About 2 and a half years ago, I found [a repo](https://github.com/benjifs/micropub) to add [Micropub](https://indieweb.org/Micropub) support to my blog with Netlify functions. Since then, my blogging setup has changed maybe a dozen times or so.

Today, I'm back at it. I've deployed a _new_ Micropub server so that I can publish drafts from iA Writer—my favorite editor. 

Here's the process now:

1. Write post in iA Writer.
2. iA Writer sends images and post content to my Micropub server.
3. The server processes the images and generates consistent frontmatter.
4. Using the GitHub API, a new file is created in my blog repo.
5. Using the `Location` header, iA Writer then opens Pages CMS to the edit view for the new file.
6. Once I'm happy, publish the post and Netlify builds it with Eleventy.

It's pretty slick if I do say so myself. But is it complicated enough? Not enough points of failure? Well, I decided to make it more complicated by running the Micropub server on my Synology. I've stitched together a Docker container and access it with Cloudflare Tunnels. Seems to mostly work?

I decided to go down this route so I could automate a bit more about my post generation. Things like date, filename, etc. And, don't hate me, I'm experimenting with using AI. I'm using the Claude API to generate a suggested summary and suggested alt text for images I upload. I say suggested, because I have a chance to look over it before I publish. Having a server like this will give me more flexibility to automate parts of my workflow.

I already know I'm going to forget to update my GitHub API key and it will break. Excited to find what else I missed!
