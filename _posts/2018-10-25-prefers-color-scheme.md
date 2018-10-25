---
title: prefers-color-scheme Media Query
date: 2018-10-25 00:00:00 Z
layout: post
---

## TL;DR
"Automatic" theme switching coming to Safari.

----

With [Safari Technology Preview 68](https://developer.apple.com/safari/technology-preview/), there is a new media query, `prefers-color-scheme`. I've used it on this site like the following:

```css
@media (prefers-color-scheme: dark) {
  background-color: #000000;
}
```

Digging around in the [WebKit release notes](https://webkit.org/blog/8475/release-notes-for-safari-technology-preview-68/), it looks like it supports `dark` and `light` at the moment. I tested both, and the do appear to work.

Anyways, kind of cool! I'm sure my dark mode looks bad, so I'll work on it. But I hope other browsers implement this media query soon as well.