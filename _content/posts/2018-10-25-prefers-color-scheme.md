---
title: prefers-color-scheme Media Query
date: 2018-10-25
description: '"Automatic" theme switching coming to Safari.'
categories: [programming]
tags: [css, tailwind, macos]
extraSpecial: true
---

With [Safari Technology Preview 68](https://developer.apple.com/safari/technology-preview/), there is a new media query, `prefers-color-scheme`. I've used it on this site like the following:

```css
@media (prefers-color-scheme: dark) {
  background-color: #000000;
}
```

Digging around in the [WebKit release notes](https://webkit.org/blog/8475/release-notes-for-safari-technology-preview-68/), it looks like it supports `dark` and `light` at the moment. I tested both, and the do appear to work.

Anyways, kind of cool! I'm sure my dark mode looks bad, so I'll work on it. But I hope other browsers implement this media query soon as well.

## Update 24 Jan 2019

Here is a Tailwind CSS plugin to add a dark and light variants. Just add this to the `plugins` array in your Tailwind config file.

```js
// You need to make sure you have postcss imported in your config file:
// const postcss = require("postcss");

({ addVariant }) => {
  addVariant("dark", ({ container, separator }) => {
    const mediaRule = postcss.atRule({
      name: "media",
      params: "(prefers-color-scheme: dark)"
    });
    mediaRule.nodes = container.nodes;
    container.nodes = [mediaRule];
    mediaRule.walkRules(rule => {
      rule.selector = `.dark${separator}${rule.selector.slice(1)}`;
    });
  });
  addVariant("light", ({ container, separator }) => {
    const mediaRule = postcss.atRule({
      name: "media",
      params: "(prefers-color-scheme: light)"
    });
    mediaRule.nodes = container.nodes;
    container.nodes = [mediaRule];
    mediaRule.walkRules(rule => {
      rule.selector = `.light${separator}${rule.selector.slice(1)}`;
    });
  });
};
```

More information on adding Tailwind variants can be found [here](https://tailwindcss.com/docs/plugins/#adding-variants).
