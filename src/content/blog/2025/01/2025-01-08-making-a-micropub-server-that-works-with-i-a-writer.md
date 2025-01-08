---
title: Making a Micropub Server That Works With iA Writer
date: 2025-01-08T14:51
summary: I built a simple Micropub server to create blog post drafts from iA Writer.
tags:
  - Micropub
published: true
---
I enjoy using iA Writer to draft blog posts. It's simple and beautiful. Another cool thing is that it can integrate with [Micropub](https://indieweb.org/Micropub) to create drafts! In the past, I used Netlify functions act as my Micropub server. There is a [great project](https://github.com/benjifs/micropub) for this.

For various reasons, I wanted to make my own server and self-host it. My server is made with Bun, Hono, and TypeScript. Images are stored locally and I use the GitHub API to create new Markdown files.

Some of what I will talk about is specific to iA Writer and my blog, but the concepts could easily be adapted to fit whatever your workflow requires.

iA Writer is a pretty good client to start with because it's quite limited in its Micropub implementation. The spec includes quite a few features that iA Writer does not implement. iA Writer is basically add a draft and upload media. So I'll talk about what is needed to get a server working with iA Writer. From there, the sky is the limit.

Code examples will be from my server. The [repo](https://github.com/samwarnick/perfect-cms) is public.

## Endpoints

There are really only 3 endpoints that need to be implemented.

### `GET /`

This is simple—return JSON your media endpoint:

```ts
app.get('/', auth, async (c) => {
    return c.json({
        'media-endpoint': `${Bun.env.MICROPUB_URL}/media`,
    });
});
```

Pretty simple. I think technically it requests `/?q=config`, but I ignore the query param.

### `POST /`

This is the endpoint used to create a new draft. iA Writer will send JSON:

```json
{
    "type": ["h-entry"],
    "properties": {
        "name": "Blog post title",
        "content": "Markdown of post",
        "post-status": "draft"
    }
}
```

You can read more about the spec and what could be sent on [w3](https://www.w3.org/TR/micropub/#json-syntax).

My server handles that request, creates the contents of a Markdown file with the frontmatter I want, and creates a new file in my GitHub repo using the GitHub API.

```ts
app.post('/', auth, zValidator('json', micropubSchema), async (c) => {
    const { properties } = c.req.valid('json');
    const fileContent = await generateMarkdown(properties, altTextCache);
    const filename = generateFilename(properties);
    const response = await addFile(filename, fileContent);
    if (response.status === 201) {
        altTextCache = {};
        c.res.headers.set('Location', generateEditUrl(filename));
        return c.json({}, 202);
    }
    throw new HTTPException(500);
});
```

I do save my posts as drafts, but you can immediately publish if you want.

#### Location Header

You might notice that I am setting the `Location` header on the response. One neat thing is that iA Writer will open the link that is returned in the `Location` header of requests. If your site is SSR or builds really quickly, this could be the link to your new post. My site takes a minute or so to build, so I have it return the link to edit the new post in [Pages CMS](https://pagescms.org). This lets me give it one more look over before publishing.

### `POST /media`

Media is added with a form request, not JSON. You get the `file` and a `purpose` of `"image"`.

```ts
app.post('/media', auth, zValidator('form', mediaSchema), async (c) => {
    const { file } = c.req.valid('form');
    await Bun.write(`./media/${file.name}`, file);
    // Other less important stuff
    // ...
    c.res.headers.set('Location', `https://samwarnick.com/media/${file.name}`);
    return c.json({}, 202);
});
```

My server writes the media to disk. And that's all that's really necessary. You could save images directly to GitHub, or in S3, or whatever.

An experiment I've been doing—and mostly liking—if the media is an image (it could be a video) I make a small version and use the Anthropic API to generate some suggested alt text for me. I make adjustments before I publish.

In my experience, iA Writer will upload media before the post.

## Authentication

To make things simple, I only accept an authorization token through the Authorization header of requests. The spec also allows for it to be sent in the body, but iA Writer doesn't do that, so I didn't need to account for it.

## [Micropub.rocks](https://Micropub.rocks)

[Micropub.rocks](https://micropub.rocks) is a way to test Micropub servers and clients. It's great because it tells you the expected input and responses without having to dig through the spec.

While developing locally, I used [ngrok](https://ngrok.com/docs/agent/cli/) to expose my dev serve to [Micropub.rocks](https://Micropub.rocks).

Again, since my server is only meant to work with iA Writer, I only ran pertinent tests like "Create an h-entry post (JSON)", "Accept access token in HTTP header", media tests, etc.

## Connecting with your website

On the blog, in the `head` we need to add `<link rel="micropub" href="https://micropub.example.com">`, where the `href` is the domain of your server. During development, I used an ngrok URL again.

![Screenshot of iA Writer add account dialog on macOS](https://samwarnick.com/media/iA%20Writer%20Micropub.png)

In iA Writer, when you go to add a new Micropub account, select "Enter Token Manually", enter the domain, like [example.com](https://example.com) and the access token. And then iA Writer will use that `link` to know where the Micropub server is.

After that, you can right click a file, Publish -> New draft on Micropub. Hopefully everything works 🤞🏻.

Hopefully this is helpful to someone. If you have any questions or suggestions, best place to get a hold of me is on [Mastodon](https://mastodon.social/@samwarnick).