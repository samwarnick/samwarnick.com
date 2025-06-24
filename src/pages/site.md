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