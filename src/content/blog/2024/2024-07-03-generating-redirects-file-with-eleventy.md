---
title: Generating redirects file with Eleventy
date: 2024-07-03
published: false
---
As part of my migration, I wanted to make sure all the old urls redirected to the new ones. Netlify lets you add a `_redirects` file with all your redirect rules.

After gathering all the old URLs, it was pretty straightforward. I made `_redirects.njk` and made sure it was not using my default layout and excluded it from collections. Loop through all my posts and put the old URL, new URL, and 301 . Done.

```jinja
{%- raw %}
---
permalink: /_redirects
layout: false
eleventyExcludeFromCollections: true
---

{%- for post in collections.posts -%}
	{%- if post.data.oldUrl -%}
	{%- set absolutePostUrl = post.url | absoluteUrl(metadata.url) -%}
		{{post.data.oldUrl | removeSite }} {{absolutePostUrl}} {{ '301' }}
		{%- if not loop.last -%}
		  {{ '\n' }}
		{%- endif -%}
	{%- endif -%}
{%- endfor -%}
{%- endraw %}
```

One gotcha for me was `{{ '{%' }}` vs `{{ '{%-' }}`. Adding the `-` strips whitespace which is exactly what I wanted.

`removeSite`  is a custom filter that removes `https://samwarnick.com` from the old URL string. Multiple ways I could've handle this, but this is what I did.