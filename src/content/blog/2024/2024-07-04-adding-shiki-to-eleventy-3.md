---
title: Adding Shiki to Eleventy 3
date: 2024-07-04T10:30
summary: Shiki seemed like a cool syntax highlighter and I added it to my Eleventy site.
tags:
  - Eleventy
published: true
---
[Shiki](https://shiki.style) is one of the syntax highlighters Astro uses. It seems cool because it's new. It does everything at build time and applies the styles inline. No client side JS or whatever. They have a nicer website than [PrismJS](https://prismjs.com/), so I guess that's why I decided to use it in my Eleventy project.

Eleventy uses [markdown-it](https://markdown-it.github.io) and Shiki has a [markdown-it plugin](https://shiki.style/packages/markdown-it). I had trouble including it in Eleventy 2. I don't totally get `require` vs `import` and whatnot. I'm sure there's a way, but I didn't want to figure it out. Maybe I should've taken the time to learn, but I didn't. It was easier for me to jump on the Eleventy 3 alpha, which lets me have an `async` config and lets me use `import`. After updating to Eleventy 3, added the following to my `.eleventy.js`:

```js
let markdownLib = MarkdownIt(options)
	.use(
		await Shiki({
			theme: "rose-pine-moon",
		}),
	);
		
eleventyConfig.setLibrary("md", markdownLib);
```

Simple.
