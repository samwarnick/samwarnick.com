---
title: Migrating samwarnick.com to Be Self-Hosted
date: '2025-10-28T10:34'
published: true
summary: I moved my blog from Netlify to my self-hosted Coolify instance. Am I stupid?
tags:
  - Self-hosting
  - Blog
---
As an experiment, I wanted to explore what it would take to move samwarnick.com from Netlify to my self-hosted Coolify instance. I knew I could have it build and serve an Eleventy site. That was the easy part. But I actually use quite a few different features of Netlify for this blog.

There were five challenges I needed to find solutions for:

1. Caching og-images between builds.
2. Scheduled redeploys.
3. Adding around 150 redirects.
4. An alternative for my /random function.
5. A replacement for Netlify Image CDN.

Let's get started!

## Bonus first step

To take advantage of Cloudflare Tunnels pointed at my Coolify instance, I needed to move my domain management from Netlify to Cloudflare. This took like five minutes, but set me up for success.

## Caching og-images between builds

My Eleventy build generates an og-image for each post and page. Starting fresh, this takes like eight minutes. As an optimization, it uses a hash of the post title for image names. If an image with the hash already exists, it skips it. This cuts the build down to usually less than a minute. However, this only works because I've set up Netlify to cache the images between builds using [`netlify-plugin-cache`](https://github.com/jakejarvis/netlify-plugin-cache):

```toml
[[plugins]]
package = "netlify-plugin-cache"
[plugins.inputs]
paths = [".cache", "_site/og-images"]
```

With Coolify, I'm using the magical Nixpacks to build and serve the blog. I went down a few rabbit holes of trying to write the og-images to the host server and copying them back and stuff. Wasn't looking pretty. Turns out, [Nixpacks has an option for this](https://nixpacks.com/docs/configuration/file#cache-directories)! I added a `nixpacks.toml` and added some stuff. 

```toml
[phases.build]
cacheDirectories = ["/cache/og-images"]
cmds = [
    "mkdir -p /cache/og-images _site/og-images",
    "cp -r /cache/og-images/* _site/og-images/ 2>/dev/null || true",
    "npx @11ty/eleventy",
    "cp -r _site/og-images/* /cache/og-images/"
]
```

My friend Claude was skeptical that this would work, but so far, it's been working great. I'm not sure how long that cache sticks around, or where it actually caches it, but I won't question the magic. I was running into issues where Nixpacks was unmounting the cache directory, which removed it from `_sites`, so it wasn't being copied to the final Docker image. My workaround was to make a different directory for the cache and copy it to `_site`.

## Scheduled redeploys

I rebuild my blog daily to publish any scheduled posts. Admittedly, not a feature I use often, so this one is an optional side quest. To accomplish this with Netlify, I have a GitHub action that calls a webhook. Coolify also has an API and I could do the exact same thing. But I wanted to see what else Coolify has to offer. Unfortunately, this is not something that is built into Coolify. What they do have is Scheduled Tasks. You add a cron pattern and a command to be run in the container. AFAIK, the way Nixpacks works is build the blog with eleventy, and then copy the files into the server container. My source files are not in the container, so I can't simply run the eleventy build in the container again. Needs a whole redeploy. So similar to the GitHub Action, my scheduled task uses `curl` to hit the Coolify API and redeploy. The container automatically gets `COOLIFY_RESOURCE_UUID`, but I do need to pass in an API key.

```bash
curl "https://coolify.mydomain.com/api/v1/deploy?uuid=$COOLIFY_RESOURCE_UUID" --header "Authorization: Bearer $COOLIFY_API_KEY"
```

Not very elegant. But it works, and removes a dependency on GitHub, but essentially exactly the same. Again, I really wish this was built-in to Coolify[^1].

## Redirects

When I switched from [Blot.im to Eleventy](https://samwarnick.com/blog/back-on-eleventy/), someone[^2] convinced me to change my URLs from `/YYYY/MM/title` to `/blog/title`. Wanting to be a good citizen of the Internet, I generate redirects from the old URLs to the new. Netlify makes this easy—have a `_redirects` file in the root when your site gets deployed.

With Coolify, nginx is the web server. nginx is pretty capable right? Turns out, yeah, it is. Instead of generating a `_redirects` file, I generate a `redirects-map.conf`:

```
/2016/7/hello-world /blog/hello-world/;
/2016/7/css-variables /blog/css-variables/;
...
```

Coolify exposes the nginx config through the UI so it is easily editable. nginx has something called [maps](https://nginx.org/en/docs/http/ngx_http_map_module.html). Basically, if the request URI is in the map, use the redirect URI instead. I'm like in the bottom 10% of nginx users, so don't ask me how it works. 

```
map_hash_bucket_size 128;
map $request_uri $redirect_uri {
    include /usr/share/nginx/html/redirects-map.conf;
}

server {
    # Block direct access to redirects map
    location = /redirects-map.conf {
        deny all;
        return 404;
    }

    location / {
        if ($redirect_uri) {
            return 301 $redirect_uri;
        }
        try_files $uri $uri.html $uri/index.html $uri/index.htm $uri/ =404;
    }
}
```

I needed to increase the bucket size to 128 because I had so many redirects, and for good luck I block access to the conf file.

## /random

Like the scheduled redeploy, I also kinda cheated on this one. My blog has `/random` which redirects you to a random post. Pretty simple as a Netlify function:

```js
import type { Context } from "@netlify/functions";
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

The cool thing about the Netlify function is that I could configure it to include the feed file so the function has easy access to it:
```toml
[functions]
directory = "functions"
included_files = ["./_site/feed.json"]
```

My cheat solution is to use a Cloudflare worker instead:

```js
export default {
	async fetch(request, env, ctx) {
		const response = await fetch(`https://samwarnick.com/feed.json`);
		const data = await response.json();
		const randomIndex = Math.floor(Math.random() * data.items.length);
		const randomUrl = data.items[randomIndex].url;
		return new Response(`Redirecting to ${randomUrl}...`, {
			status: 302,
			headers: {
				Location: randomUrl,
			}
		});
	},
};
```

It's less performant by fetching the feed JSON every time, but it's still fast and I don't care that much. Cloudflare caches it anyway. Plus, I've configured the worker through Cloudflare to be on `/random`, so it doesn't even hit Coolify.

Problem solved.

_However_, I did investigate other solutions. Best I can tell, there is not a great way to self-host "serverless" functions[^3]. Best alternative I could come up with is a small nodejs server. This could be run easily with Nixpacks. I could even colocate the code in my blog repo like I do with the Netlify function and Cloudflare worker. But it's more code. The worker is 14 lines, and a small server would be like 50—with a `/health` endpoint. Ugly. I could write less code with bun, but I was having _a lot_ of trouble getting bun and Nixpacks to play nicely on Coolify. I might try again on future versions of Coolify.

## Images

Netlify has an [Image CDN](https://docs.netlify.com/build/image-cdn/overview/). It's like a combination of image optimization and transforms and a CDN. I like it because this sits in front of my images, which are actually on my Synology. So makes me feel better about that. Switching to Cloudflare gives me their caching and CDN, and I could stop there. But I like to be to dump big dumb images on my Synology and not worry about optimizing them. Netlify helped with that too. With a redirect of `/media`, images were changed to WebP.

A quick search led me to [imgproxy.net](https://imgproxy.net). But it handles the image optimization step. While this is a service that does have a pro plan, it can also be self-hosted with a Docker image. There are probably lots of alternatives. My needs are pretty simple and I could probably write my own server to handle this in the future.

I installed imgproxy with Coolify's Docker image support. I did not give it a public domain, so it should only be accessible to other containers of mine. To make this work with Coolify, I added a "Network Alias" of `imgproxy`. By default, Coolify generates a random container name on every deploy. This lets it do rolling restarts. So by giving the container a network alias, this gives other containers a stable reference to the imgproxy container. I use this in my nginx config:

```
location ^~ /media/ {
    rewrite ^/media/(.*)$ /unsafe/plain//$1@avif break;
    proxy_pass http://imgproxy:8080;
    proxy_set_header Accept $http_accept;
}
```

Everything[^4] to `/media` gets proxied to `http://imgproxy:8080/unsafe/plain//...@avif`. The `/unsafe/` is just a random string. Imgproxy wants you to sign requests to ensure they are coming from a valid source, but since this is internal, I can ignore it. `@avif` tells imgproxy to convert images to AVIF. In theory, imgproxy should take the accept headers and return convert the format based on that. I was able to get that working using `curl`, but seems like somewhere between Cloudflare, the Coolify proxy, and nginx, it's getting lost. I think it is probably the Coolify proxy server. But for now, everything is AVIF. I'll work on that later.

But, now images are being optimized on my server!

## Is this worth it?

As of October 27, 2024, samwarnick.com is self-hosted. Is this worth it? That's the big question. Probably not. But it's fun! Dave said, "instead of asking 'is it worth it?' ask yourself 'what did I learn?'" So what did I learn? A lot. Like, it's possible! That is a really cool feeling. We don't need these huge corporations to host our stuff. Are they the right solution a lot of the time? Yeah. Are there alternatives? Definitely. I still have the Beelink Mini PC I ordered sitting on my desk, unopened. It was neat figuring out how to do this on the hardware I already have. I will probably return it unless Carter convinces me otherwise. It may not be exactly simple or easy, but it's possible, even for a n00b like me.

It just feels cool to have _my_ blog on _my_ server in _my_ closet (with a little help from Cloudflare.) 

My blog does not get much traffic, so I'm not too worried about it bringing my house down[^5]. I am a little worried about if my internet or power goes out. For now, I will keep Netlify going, and I can switch over some DNS records to point back at Netlify if I need to. Builds are slower too. Netlify builds take like one minute. On Coolify, they take anywhere between two and three minutes. More if Nixpacks decides it no longer has the cache. Probably something better hardware can fix.

I don't know if I will do this permanently or not. But it's been an exciting adventure.

[^1]: [So do others.](https://github.com/coollabsio/coolify/discussions/2772)
[^2]: Carter.
[^3]: If there is, please tell me. I'm interested.
[^4]: Not literally everything. I have some other stuff in the nginx config to handle videos, audio, etc.
[^5]: Should I be?
