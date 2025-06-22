---
title: Making My Builds 1000% Faster
date: '2025-06-21T22:01'
summary: >-
  I made two simple changes to speed up my Netlify builds, cutting the time from
  2-3 minutes to under 1 minute.
tags: []
published: false
---
The builds for this site on Netlify took about 2 to 3 minutes. Now it takes less than 1 minute. Magic. 

2 changes:

1. I overrode the [`eleventy-plugin-og-image`](https://github.com/KiwiKilian/eleventy-plugin-og-image?tab=readme-ov-file#extending-ogimage-class) hash function to only care about the page title.
2. Added my OG image directory to Netlify cache.

```js
export class CustomOgImage extends OgImage {
	async hash() {
		const hash = crypto.createHash('sha256');
		hash.update(this.data.title);
		return hash.digest('hex').substring(0, this.options.hashLength);
	}
}
```

The plugin uses the hash to check if a file exists before doing more work. The slow part is that it uses the HTML as part of the hash. So it needs to do quite a bit of work to determine the hash. I assume this is to catch any changes to the OG Image template. But I'm not doing that often, so hashing just the title is _much_ faster. However, if I _do_ ever change my OG image template, I will need to remember to undo this to make sure they get regenerated. I added a comment to remind me of that. Time will tell if I just ignore it.

Next, I updated my config for [`netlify-plugin-cache`](https://github.com/jakejarvis/netlify-plugin-cache) to include `_site/og-image`—the directory the generated images are stored. This will persist the images across builds so that the plugin actually has files to compare hashes with.

```toml
[[plugins]]
package = "netlify-plugin-cache"
[plugins.inputs]
paths = [".cache", "_site/og-images"]
```

An alternative would be to generate this images with something like a Netlify or Cloudflare function. Similar to my approach, I believe both could cache the result to some extent so the work only really needs to be done once. But with my method of picking a random photo for the background and needing the page title, it's simpler to do it at build time.

But a couple simple changes and now my builds are much faster. Win-win-win?
