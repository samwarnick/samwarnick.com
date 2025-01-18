---
title: Perfect CMS
summary: Perfect CMS is a lightweight Micropub server used to publish posts to
  samwarnick.com
---
I wanted a little more control and ability to automate portions of my blogging workflow. So I implemented a lightweight [Micropub](https://indieweb.org/Micropub) server. iA Writer is my preferred text editor and has Micropub support. So it allows me to publish drafts and upload images directly from iA Writer. The server then returns the URL to edit the post in Pages CMS, which iA Writer opens automatically.

Publishing from iA Writer is a huge plus for me, but the server also does some things like standardizing titles, filenames, dates, etc. I'm also experimenting with AI to generate suggested alt text for images and suggested post summaries. It then adds the file to my blog repo on GitHub. Honestly, it's pretty niffty.

It's built with [Bun](https://bun.sh) and [Hono](https://hono.dev) and self-hosted on a Synology in my closet.

You can look at the code on [GitHub](https://github.com/samwarnick/perfect-cms).

For more information, I wrote [a bit about it](/blog/making-a-micropub-server-that-works-with-ia-writer/).