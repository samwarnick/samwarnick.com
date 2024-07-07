---
title: Shutting Down My Mastodon Instance
date: 2024-07-07T14:45
summary: After a year and half, I'm shutting down my self-hosted Mastodon server.
published: true
---
Like a lot of nerds during the Twitter turmoil of 2022, I started my own single-user Mastodon instance. Places like [Masto.host](https://masto.host) were overrun and not taking new customers, so I started up a Linode. Today, I'm shutting that Linode down and switching over to (mastodon.social)[https://mastodon.social/@samwarnick].

2 main reasons why:
1. Cost. I was having issues uploading images and videos, so I upgrade my Linode to beefier 2 GB of memory. This, with backups enabled, was costing me like $17/mo.
2. Updates. Every time I did a security update, I was nervous I was going to lose everything. Got close once.

I contacted Masto.host and it would have definitely been possible for me to transfer over hosting to them. But there are [other issues with having your own single-user instance](https://jvns.ca/blog/2023/08/11/some-notes-on-mastodon/#downsides-to-being-on-a-single-person-server). So I decided just to let someone else do all the work for me.

I went through the steps to "migrate" my account to my mastodon.social account. It just moves your followers and then you have to refollow everyone again. Could be a better experience. With that, Mastodon has a feature that puts a link to your new profile on your old profile. Kinda nifty. The problem for me is that after I shut down everything, you won't be able to access the old profile. My domain is managed by Cloudflare and I was able to add a redirect so any request to social.warnick.me will be redirected to my new account. This is nice because I have my old account URL hardcoded in ScreenCred and I don't want to update the app just to change my Mastodon account.

It feels like a failure of my nerdery. But I tried it, could do it, and am choosing not to. I'm consolidating and simplifying a lot of things right now. I'm sure the pendulum will swing again and I'll feel the desire to run my own instance again. But for now, I'm very happy to let people far more capable than me manage things while getting the benefits of being on a large Mastodon server.