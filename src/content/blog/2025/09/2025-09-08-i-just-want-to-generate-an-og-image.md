---
title: I Just Want to Generate an OG Image
date: '2025-09-08T20:55'
published: true
summary: I'm trying to generate OG images for ScreenCred on Cloudflare Workers.
tags:
  - ScreenCred
  - Web Development
---

I'm migrating ScreenCred to be a web app. In a shocking move of abandoning the Perfect Stack, I'm giving SvelteKit a try. Aside from the mediocre WebStorm support, I'm liking it. But that is probably a story for another day.

One feature of ScreenCred that only I care about is that when you share a link to a comparison, an OG Image is generated for it. Because of the vast number of possibilities, it's unfeasible to generate these beforehand, so it needs to be done dynamically. 

ScreenCred is currently built with Astro and running on fly.io. OG Images are generated with puppeteer. This lets me style it with HTML and CSS, but is slow and memory intensive. Since I built that, I've learned about [`satori`](https://github.com/vercel/satori) and [`resvg-js`](https://github.com/thx/resvg-js). `satori` helps create SVGs using familiar HTML and CSS, and `resvg-js` converts the SVG to PNG. A much more straightforward pipeline than spinning up headless Chrome, rendering a webpage, and taking a screenshot.

So I strung satori and resvg-js together and started generating OG Images! Easy! In fact, satori didn't support a blur effect I wanted to accomplish, so I cut it out and wrote my own SVG. Even simpler! It all worked…locally.

## Cloudflare

As part of trying SvelteKit, I wanted to try deploying it to Cloudflare Workers. I thought that would be a fast, cheap way of running the app. Up to now, it worked fantastically. I was able to easily use other great Cloudflare tools like analytics in my app. _But_, `resvg-js` depends on some Node.js APIs that are not supported by the Cloudflare Worker runtime.

I started to look into other options.

## WASM

I'll keep this brief. TL;DR after hours of trying, I have no clue how to include the WASM build of `resvg-js` in a SvelteKit app running on Cloudflare Workers. Either Vite was complaining or the Worker was complaining. I gave up.

## Rust

`resvg-js` is based on the Rust project `resvg`. Cloudflare has some docs about [how to write workers in Rust](https://developers.cloudflare.com/workers/languages/rust/). Workers can call other Workers. You might see where I'm going here. Dave found [a project](https://github.com/GewoonJaap/svg-to-png-cf-worker) that almost did what I wanted. It takes a URL of an SVG and uses `resvg` to convert it to a PNG. Using this as a starting point, I made a Worker that accepts the contents of an SVG and converts it.

Using Wrangler, I got my svg-2-png worker and my app worker running locally. Everything works…locally.

It breaks when deployed to production because I'm on the free plan. The svg-2-png Worker takes longer than the [10ms of CPU time](https://developers.cloudflare.com/workers/platform/limits/#worker-limits) you get on the free plan. 😭

_Sigh._

So close, yet so far away. I could pay $5/mo for the paid Workers plan and it would probably work great. But, I would love to reduce costs, not increase them. Now I'm spinning in my chair trying to figure out what to do. I just want to generate an OG Image for super cheap and fast. Is that too much to ask for?
