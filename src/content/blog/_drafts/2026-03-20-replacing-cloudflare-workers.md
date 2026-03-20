---
title: Replacing Cloudflare Workers
date: '2026-03-20'
published: false
---

> Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they _should_.
> — Dr. Ian Malcom

I stayed up way too late last night. I had this idea I just had to do. I wanted to replicate [Netlify Functions](https://docs.netlify.com/build/functions/overview/) inside Deploybot 3000[^1].

If you are not familiar—and there is no reason you should be—Deploybot 3000 is my attempt at a code-first version of [Coolify](https://coolify.io). With a single config file update, it adds itself as a webhook to my repos and automatically pulls changes, builds Docker images, manages a Caddy reverse proxy, orchestrates rollouts and rollbacks, and backs up apps. It works just how I want. You probably wouldn't like it. But, it was missing "serverless" functions. This blog has a `/random` endpoint. It parses my RSS feed and returns the URL of a random post.

When I migrated my blog away from Netlify and to be self-hosted on Coolify, moving the Netlify functions to Cloudflare Workers was the most straightforward option. It works, but just kinda felt weird. The function had its own build and deploy process. I like how seamless the Netlify workflow felt—if there were functions, they got deployed.

With Deploybot 3000, I realized I could make my dreams come true.

The idea is somewhat straightforward. If one of my static sites—like this blog—has a functions directory, it starts a server that dynamically imports those functions. My Caddyfile is updated to automatically proxy requests to this new server. In an advantage over Netlify, it uses the function name for the route, so you don't have to add a custom redirect. I might change this in the future, but works exactly how I want now. I am using Bun to spawn these subprocesses for some isolation. They are not truly isolated from the main Deploybot, but if they crash or have issues, they won't bring down Deploybot. But nothing is stopping them from accessing the main server. If I wanted true isolation, I could spin up a Docker container for each function runner. I thought about this, but it felt a little heavy for literally a single function.

Here's a slimed down version of the function runner server:

```ts
Bun.serve({
    port: 3000,
    async fetch(req) {
        const path = new URL(req.url).pathname;
        const module = await import(`./functions${path}.js`).catch(() => null);
        if (!module) return new Response("Not found", { status: 404 });
        return module.default(req);
    },
});
```

One gotcha I had. I'm using Bun to start a new Bun process. That new Bun process was automatically picking up Deploybot's .env. So I needed to add `--no-env-file`. This also allows me to use `--env-file` if the functions do have their own .env, like with a Discord webhook or something.

I now have two sites using my functions runners. They seem to work? I'm still waiting for all this to come crumbling down and I need to go back to Netlify or something else.