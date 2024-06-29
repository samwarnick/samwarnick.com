---
title: What I use to blog in 2024
date: '2024-03-26T16:00'
summary: A quick overview of what I use to blog in 2024
tags:
  - Blog
oldUrl: 'https://samwarnick.com/2024/3/what-i-use-to-blog-in-2024'
---

I have 2 blogs/sites. samwarnick.com runs on [Blot.im](https://blot.im) and lemonpointbricks.com runs on [Ghost](https://ghost.org).

## Blot.im

The thing that attracted me to Blot was that it unifies the writing, editing, and publishing experience. Mine is setup to watch a Dropbox folder. So whenever a file in that changes, the site updates. I use iA Writer for writing, so I just add and edit markdown files in that Dropbox folder and they automatically publish. Really simple.

Automatic publishing is also the downside. Unless I put an underscore in the filename or in a special drafts folder, it will get published—including images. I don't love managing and adding images, so that has a bit more friction. I have to be careful how they get named. Since it’s all flat markdown files, you have to manage the frontmatter and metadata yourself. I have a couple scripts to scaffold out new markdown files they way I like and where I want them, but still, more friction.

Theming is also quite difficult and not well documented. I’ve tried multiple times and never been able to get a local instance of Blot running to make theme development easier. There might be a better way, but basically, I make changes, wait for the site to rebuild, and see if they are the changes I want. Not ideal.

But, one of the fastest ways to go from idea to published post.

## Ghost

I started lemonpointbricks.com thinking I'd go with [Astro](https://astro.build) and [Pages CMS](https://pagescms.org). After dealing with markdown files for years, Pages CMS looks like a great way to hide that ugliness. But I really didn't like the idea of bringing every piece and configuring and all that—making sure I have all the right SEO tags, the RSS feed generating correctly, etc. I wanted something a little more battle tested and stable. So thought I'd try Ghost. I got it running yesterday, so not a ton of experience, but that certainly doesn’t disqualify me from talking like I know things right?

Setup was quite simple (once DNS is fully propagated.) They have a one-click droplet on Digital Ocean that made it simple, plus the Ghost CLI manages updates too. Seems to be one of the easier blogs to self-host. Their host is like $300/yr for a plan that includes custom themes, so not an option IMO. I had one small hiccup with images not uploading. Turns out I needed to manually install the `sharp` package with `npm` for some reason.

Seems to have room to grow—membership and newsletter support.

I created a custom theme mostly from scratch without too much trouble. They have a lot of helpers that manages a lot of the `head` content for SEO which is great.

It still seems easy to post, but a little more friction IMO. You need to go through their editor to publish, but iA Writer is able to upload drafts. So I can write in iA Writer, upload, then go to the site to clean up and publish. But that complicates my workflow a bit. Now iA Writer is full of "draft" files that don't match what is published since it doesn't sync—just one-way. Not sure how to deal with that yet.

But Ghost is definitely robust and full-featured, and pretty simple.

## iA Writer

I use [iA Writer](https://ia.net/writer) and like it quite a bit. But it’s not perfect. I wish it could sync with Ghost instead of just publishing drafts. I have no clue how to manage my files after I publish them. Do I delete them since they are no longer the source of truth? IDK, something I need to work through. I sometimes get lost in the file browser. But actually writing in it is fantastic. I love their [Quattro font](https://github.com/iaolo/iA-Fonts). I currently have no plans to switch to anything else.

So there you have it. My blogging infrastructure in 2024. Thanks for stopping by.
