---
title: Weekend Project
date: '2025-07-13'
published: false
---

If you’re not familiar with the rube Goldberg machine that powers this blog, here’s the high level. I start a post in iA Writer. When that is done, I publish through iA Writer to a MicroPub server I run on my Synology. That will upload images to my Synology, and use Claude to suggest descriptions and alt text for images. It then saves a new file with the GitHub API to my blog repo. Then it opens up PagesCMS for me to do some final checks and hit publish. That fires off a build on Netlify.

Clear as mud?

I’ve been mostly happy with this system. But lately, it’s been feeling complicated and—shock to no one but myself—a bit error prone. I started noticing iA Writer stripping out additional HTML I put in for things like videos or other embeds. Double checking alt text is sometimes difficult in PagesCMS with the rich text editor. Most posts, I was having to edit things in WebStorm anyway. So I started thinking about ways to simplify things.

So, my weekend project: `perfect-cms-cli`.

My hope was to move to a more local first workflow. Using Bun, I made a little CLI to handle a lot of the most annoying things about blogging for me. When using a SSG like Eleventy, I find managing frontmatter and images to be the most annoying.

It’s built with Bun and then compiled as an executable CLI. 

```sh
bun build ./index.ts --compile --outfile cms
mv cms /usr/local/bin/cms
```

Some key packages I used are:

- [@inquirer/prompts](https://github.com/SBoudrias/Inquirer.js) for nice command line prompts
- [@sindresorhus/slugify](https://github.com/sindresorhus/slugify) for turning strings into nice file slugs 
- [commander](https://github.com/tj/commander.js) for easily adding commands to the CLI
- [date-fns](https://github.com/date-fns/date-fns) for formatting dates
- [gray-matter](https://github.com/jonschlinkert/gray-matter) for parsing and updating the frontmatter of markdown files
- [sharp](https://github.com/lovell/sharp) generating thumbnails to send to Claude

The CLI has 3 actions—`new`, `prepare`, and `publish`. I’ll walk through a bit of what each does.

```sh
cms new
```

`new` is the most straightforward.

1. Creates a new markdown file with the current date in my blog’s draft folder.
2. Stages and commits the new file.
3. Opens the new file in my editor.

It will do some things like handle multiple drafts created on the same day by appending a number to the filename.

```sh
cms prepare
```

This one is a bit more involved.

1. Stage and commit the current draft. This is so I can easily see changes made by this command.
2. Run through all existing posts and pull out the summaries and tags.
3. If there are multiple drafts, present a list and let me choose which to prepare.
4. Looks at the content for images. It will move images from the drafts folder to my Synology where they are hosted—normalizes the image names for me too. It will send a thumbnail to Claude for some suggested alt text. Updates the content with new URLs and alt text.
5. Sends the content of the draft, the existing summaries, and existing tags to Claude for suggestions for a summary and tags. Also asks for some basic edits.
6. Updates the draft with suggestions, but does not commit. Again, I can now easily see the changes made in my editor.

```sh
cms publish
```

`publish` is also mostly straightforward.

1. If there are more than one drafts, asks which one I want to publish.
2. Moves the file from the drafts folder to its final published location. Updates the date in the filename and frontmatter.
3. Stages and commits the file.
4. Optionally will push to prod and trigger a build on Netlify.

## Eleventy Changes

To make images work with Eleventy, I needed to make a small change:

```js
if (process.env.ELEVENTY_RUN_MODE !== "build") {
    eleventyConfig.addPassthroughCopy({
        "src/content/blog/_drafts/media": "media"
    });
}
```

Bascially, need to copy my draft media to `/media` so the URLs will work. But I only do that on non-production builds.

## Simpler?

At face value, maybe this does not seem simpler. But I think it is. It’s closer to the bare metal of my blog and cuts out a couple other services and steps. If I want to make changes, I don’t need to redeploy my MicroPub server, but instead make changes to a local script.

I’m sure I will keep playing with this and tweaking it, but I’m excited to put it through its paces. We’ll see!

Here's a pictture to test out that functionality.

![](/media/IMG_1661.jpeg)