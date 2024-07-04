---
title: Just testing my scheduled posts
date: 2024-07-05T09:00
summary: Just doing some testing. Don't mind me.
tags:
  - Blog
  - Eleventy
published: true
---
If you're seeing this on July 5th and not July 4th, it means that my scheduled post implementation works!

I found a [great post](https://localghost.dev/blog/how-to-schedule-posts-in-eleventy/) on how to implement it with Eleventy and GitHub Actions.

Step on was to set the permalink of any post with a date in the future to `false` . Same with `eleventyExcludeFromCollections` . I am already doing this with posts that have `published: false` , so was simple to add.

```js
const now = new Date();

function isScheduled(data) {
	return data.page.date > now;
}

export default {
	layout: "layouts/post.njk",
	permalink: function (data) {
		if (data.published === false || isScheduled(data)) {
			return false;
		}
	},
	eleventyComputed: {
		eleventyExcludeFromCollections: function (data) {
			return data.published === false || isScheduled(data);
		},
	},
};
```

Then, I added a GitHub action. I'm a GitHub Actions noob, so I did not know you could trigger it on a cron. That's pretty awesome.  

```yml
name: "Publish"
on:
  schedule:
    - cron: '30 2,14 * * *'

jobs:
  build:
    name: Request Netlify Webhook
    runs-on: ubuntu-latest
    steps:
      - name: Curl request
        run: curl -X POST -d {} NETLIFY_HOOK
```

In theory, this should call my Netlify build hook twice a day at 2:30am and 2:30pm UTC. This lines up with when I usually schedule posts for. Really, I think I could get away with one, but 2 is better than 1.