---
title: Handling Web Components in RSS and Eleventy
date: 2025-06-26T20:41
summary: Turns out web components don't work in RSS. Whoops.
tags:
  - Blog
  - Eleventy
  - Web Component
published: true
---
To make things easier for myself, I made a couple shortcodes with Eleventy. I made one for YouTube links and one for my `tcg-card` web component. They are nice so it can handle the boilerplate for me. Like the following:

```md
<!-- Shortcode in my markdown -->
{%- raw %}
{% youtube "https://youtu.be/bewKPi9gdT4" %}
{% endraw %}
```

```html
<!-- Will be replaced with this web component -->
<lite-youtube videoId="bewKPi9gdT4" videoStartAt="0" posterquality="maxresdefault"></lite-youtube>
```

Pretty handy!

I wanted to replace YouTube links with a [web component](https://github.com/justinribeiro/lite-youtube) because they load faster and stuff. But then I realized, they will no longer show in RSS readers. Web components need JS.

A couple options:
1. Do the easy thing and update shortcode to use the `iframe` instead
2. Do more work to replace the `lite-youtube` component in the generated RSS feed with an `iframe`

I went with option 2. I wanted to keep the performance wins on web if possible.

To accomplish this with Eleventy, I created a new filter.

```js
eleventyConfig.addFilter("replaceWebComponents", function(content) {
return content
    // Replace lite-youtube with iframe
    .replace(
        /<lite-youtube\s+videoId="([^"]+)"(?:\s+videoStartAt="([^"]+)")?[^>]*><\/lite-youtube>/gs,
        (match, videoId, startTime) => {
            const startParam = startTime ? `&start=${startTime}` : '';
            return `<iframe src="https://www.youtube.com/embed/${videoId}?feature=oembed${startParam}" frameborder="0" <iframe src="https://www.youtube.com/embed/${videoId}?${startParam}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>></iframe>`;
        }
    );
});
```

I throw this filter into my feed templates where I am using `page.templateContent`.

For my `tcg-card` web component, I thought I'd take a different approach. My shortcode for this will generate the web component with a fallback image in it. This will provide some progressive enhancement in addition to working in RSS. Win. I hope.

I hope this will make a better experience for anyone who reads this, and I think it will make it easier for me to include cool stuff in my posts. I just need to remember RSS when adding stuff in the future.

Just to test it out (fingers crossed):

{% youtube "https://youtu.be/bewKPi9gdT4" %}

{% tcg-card "https://samwarnick.com/media/bullpen-tcg/Sam.png" "A custom trading card featuring a LEGO minifigure with glasses and dark hair wearing a jacket with a Pokéball logo. The card is titled 'Sam - @hugemanatee', and shows two abilities: 'Devil's Avocado' (place one message in another conversation, you're fun) and 'Burnout' (get 2 projects 80% done, lose next turn)." %}
