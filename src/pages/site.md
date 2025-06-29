---
title: /site
layout: layouts/page
---

- Built with [Eleventy](https://www.11ty.dev)
- Hosted on [Netlify](https://www.netlify.com)
- Fonts
	- [Atkinson Hyperlegible](https://brailleinstitute.org/freefont)
	- [Calistoga](https://fonts.google.com/specimen/Calistoga){.serif}
	- [Comic Mono](https://dtinth.github.io/comic-mono-font/){.mono}
- Colors based on [Dawnfox and Terafox Neovim themes](https://github.com/EdenEast/nightfox.nvim)
- Icons from [Hericons](https://heroicons.com)

## Styleguide{id=styleguide}
Last updated: Jun 26, 2025
*subject to change without notice. I probably will not go back to old posts to update.

- Oxford comma must be used.
  - TIL it's also called the [serial comma](https://en.wikipedia.org/wiki/Serial_comma).
- samwarnick.com is referred to as a blog.
  - Not a website, not a site, and definitely not a web-blog.
- Mash things together:
  - frontend (not front end or front-end)
  - email (not e-mail)
- Do not use hyphens for em dashes or en dashes.
- Spell out numbers under 10.
- When using multiple exclamation points or question marks, use at least 12.
  - Adds emphasis!!!!!!!!!!!!
  - Just kidding. I like using two to show I'm a fun, casual dude!!
- Made-up words are okay. All words are just made up to trick children anyway.
- I know it's "right" to put the punctuation inside the quotation marks, but I'm not sold. So for now, only do that for dialog, not scare quote "stuff".
- Ignore all these if it feels right.
  - Except for the Oxford comma you monster.

## //TODO:
<ul>
	{%- for issue in githubIssues -%}
	<li><a href="{{issue.html_url}}">{{issue.title}}</a></li>
	{%- endfor -%}
</ul>

<p>
	Got an idea or suggestion to nerd snipe me? Create a
	<a href="https://github.com/samwarnick/samwarnick.com/issues/new"
		>new issue on GitHub</a
	>.
</p>