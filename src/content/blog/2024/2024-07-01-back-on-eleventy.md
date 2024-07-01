---
title: Back on Eleventy
date: 2024-07-01T19:00
summary: I'm once again upending my blogging infrastructure.
tags:
  - Blog
published: true
---
Going to blog about my blog—my favorite topic.

A few months ago I wrote about [The State of Blogs](/blog/state-of-the-blogs-2024/). I had been using [Blot.im](https://blot.im) and [Ghost](https://ghost.org).

After finding [Pages CMS](https://pagescms.org/), I felt the need for tinkering and consolidation.

I wanted something more flexible than either Blot or Ghost so I could do pretty much whatever I want. I think static site generators are good for that. Get whatever data you want, however you want, and use it.

I started 2 concurrent prototypes using Eleventy and Astro.

Ultimately, I picked Eleventy.

## Why not Astro?

In theory, I prefer Astro because I am a fan of TypeScript. It's structure makes sense to me too. But had a couple blockers for me:

1.  I'm lazy and Astro requires a `slug` property if you want something different. Eleventy lets be dynamically create the slug/permalink.
    
2.  The RSS plugin was not flexible enough for me and I did not feel like figuring out a different option.
    

## Why 11ty

1.  I was able to shamelessly borrow extensively from [Robb Knight's blog](https://rknight.me).
    
2.  Ecosystem seems slightly more mature with plugins like [eleventy-plugin-og-image](https://github.com/KiwiKilian/eleventy-plugin-og-image).
    
3.  It's what my site used to be on.
    

IMO, Eleventy has kinda a steep learning curve, but is quite flexible. I'm slow and am just getting a hang of the [data cascade](https://www.11ty.dev/docs/data-cascade/) and [collections](https://www.11ty.dev/docs/collections/).

## Changing URLs

As part of this migration, I changed URLs for my posts from `/YYYY/MM/title` to `/blog/title`. I was nervous to make this change because I wanted to keep things consistent, but I like the look of `/blog/title` better.

Needed to do it the right way. Step 1 was adding the old URL to the frontmatter of each markdown file. Maybe there was a smart way to do this, but I did it manually.

Using this data, I was able to set the GUID for each post to the old URL, but update the link to be the current URL. This way, all 2 people who subscribe to my RSS feed will not be bombarded with "new" posts.

Lastly, I also used the old URL data to generate a redirects file for Netlify. Eleventy made this quite simple.

## What now?

I guess keep going until I feel like rebuilding from scratch again. I do have some ideas. Take a look at [/todo](/todo) for my current list and feel free to add a suggestion.

Check out the [blog's code](https://github.com/samwarnick/samwarnick.com) if you want.