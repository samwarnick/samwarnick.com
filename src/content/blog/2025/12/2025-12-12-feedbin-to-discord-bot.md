---
title: Feedbin to Discord Bot
date: '2025-12-12T09:52'
published: true
summary: >-
  I built a simple app to send my RSS feeds directly to Discord because I'm cool
  and that's where I spend most of my time anyway.
tags:
  - Projects
---
I've been unsatisfied with all the RSS reader apps I've tried recently. Lately, I've just been using the Feedbin web app saved to my Home Screen. But I've often thought that I'd like my RSS feed to be where I am, and not another place. For me, that's Discord. I spend a lot of time in Discord. So I thought, why not make Discord my RSS reader.

In like an hour, I had a little app written and deployed that uses the [Feedbin API](https://github.com/feedbin/feedbin-api/blob/master/content/entries.md) and my credentials to pull all my unread posts and use a Discord webhook to post them to a private Discord server of mine. It marks them as read when it posts them so they don't show up again. Feedbin provides site icons and images for the posts too, so I'm able to make the messages fairly attractive. I've been using this for about a few days, and I'm really enjoying it!

![Screenshot of Discord on iOS showing Feedbin RSS feed with notifications from Pokebeach and Austin Kleon](https://samwarnick.com/media/2025/12/2025-12-12-feedbin-to-discord-bot1.PNG){width=600}

See [the code on GitHub](https://github.com/samwarnick/feedbin-to-discord). I use Bun and a Dockerfile. I find Docker works way better for Bun than Nixpacks when deploying with Coolify.

Some things I've thought about is evolving it from a webhook to a real life bot that can subscribe to new feeds, favorite posts, open in [Yazzy](https://yazzy.fly.dev), and other things like that. But this is working for now.
