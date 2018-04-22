---
title: Moving My Blog To GitHub Pages
date: 2017-10-28 00:00:00 Z
layout: post
---

## TL;DR
I moved my blog to GitHub Pages!

----

My blog has moved around a lot. Most recently (and only for a couple months), I was using a self-hosted [Ghost](https://ghost.org/developers/) instance on DigitalOcean. As much as I liked Ghost, I was looking for something a little more hands off—I didn't love being greeted with a new update notification nearly every time I logged in, requiring me to SSH in and upgrade. I also wanted something I could manage a little more easily from my iPad. Not for any good reason; just for fun. A friend of mine has always suggested I try out GitHub Pages and Jekyll, so I decided to try it out. Now, I haven't been on GitHub pages for very long, so these are just my initial thoughts.

## GitHub Pages and Jekyll
GitHub pages is a simple way to host a personal site. It just uses a repo on GitHub and [Jekyll](https://jekyllrb.com/) to build a static site. Basically, all you have to do is provide the files for Jekyll to build. At it's simplest, all you need is an `index.html`. Like they say on the [GitHub Pages](https://pages.github.com) site:

> Just edit, push, and your changes are live.

Here are a few pros and cons for me:
### Pros
* Free
* Easy to setup
* Dead simple and doesn't come with a ton of bloat
* Built in version control, because, you know...GitHub

### Cons
* Can't preview drafts
* Doesn't support SSL and HTTPS with custom domains (you can use [Cloudflare](https://www.cloudflare.com) as a workaround)

I enjoy being able to just push changes to my repo and not having to deal with SSH or Mosh or FTP or whatever. For me, it's by far the simplest solution I've come across. GitHub even emails you if there's a problem build the files you've just pushed.

Since Jekyll is a static site generator, it's obviously not going to be the right solution for every project, but for a simple blog, it's pretty perfect. I'm able to make page templates in HTML and the [Liquid](https://shopify.github.io/liquid/) templating language, all my styling in SCSS, and write my posts in Markdown. Mostly, I followed the [Jekyll docs](https://jekyllrb.com/docs/) to build my own theme. Since Jekyll sites don't come with a ton of bloat, it was quite easy to make a theme. Not a whole lot to worry about. I made a `default` layout and a `post` layout which extends the `default`. The `default` has all the `<head>` stuff, the header and footer, and a place to put the body content, so the other layouts I make don't have to worry about that stuff because they just extend it.

Jekyll can also have plugins. GitHub has several useful plugins whitelisted. They have some by default plugins like `jekyll-optional-front-matter` and `jekyll-paginate` in addition to some optional ones like `jekyll-seo-tag` and `jekyll-sitemap`. You just configure them in your `_config.yml`. Pretty cool. If you are developing locally, you need to make sure that you install them using `gem install` in addition to adding them to your `_config.yml`.

Long story short, I have found GitHub pages and Jekyll to be a simple way to make and manage my site. Win!

## iPadability
I recently got an iPad Pro. Since I got it, it's been a mission of mine to figure out how to do more dev work. I'll write more about what I've found in another post, but let's just say, the iPad won't be replacing my laptop anytime soon. Despite this, GitHub Pages fits really well into an iPad workflow. iPads obviously can't run any fancy command line tools, but luckily GitHub Pages builds the Jekyll page for you! So, using the fantastic [Working Copy](https://itunes.apple.com/us/app/working-copy/id896694807?mt=8), I can keep a local version of my repo on my iPad. For code changes, I can make small changes (usually in [Textastic](https://itunes.apple.com/us/app/textastic-code-editor-6/id1049254261?mt=8), push them, and boom—GitHub builds it for me and my changes are there. Yes, it's not as good as a feedback loop as running a local Jekyll server and making changes, but hey, its an iPad.

Writing posts on the iPad is even better. Jekyll has some rules for a post to be valid: the file needs to be in the format `YYYY-MM-DD-post-title.md` and the post needs valid frontmatter. I thought to myself, hey, that's something a computer should be able to do for me. Luckily [Workflow](https://itunes.apple.com/us/app/workflow/id915249334?mt=8) on iOS has some pretty great automation tools. I was able to make a workflow that will take a markdown file, format it correctly for Jekyll, save it in Working Copy, commit it, and finally push it to GitHub. With a single tap, I can now do what would normally take several minutes and who knows how many taps. I don't know about you, but I think that's pretty cool. You can find it [here](https://workflow.is/workflows/6094b228a4ae499b884634152cd3ab48).

So it's much easier to manage on my iPad than having to SSH into my DigitalOcean droplet to update things. Still not perfect, but with the current state of iOS, it's not too shabby.

----

There you have it—more than you'd ever want to know about me moving my blog to GitHub Pages! I recommend giving it a try sometime.