---
title: A New Era for ScreenCred
date: '2025-11-25T10:31'
published: true
summary: I turned my iOS app ScreenCred into a web app.
tags:
  - ScreenCred
  - Web Development
---
I won't bury the lede. ScreenCred is now a web app. Find it at [screencred.app](https://screencred.app).

If you've never heard of ScreenCred, it's an app that takes two movies, TV shows, or people, and shows you all the common cast, crew, and projects between them. A slightly nerdy and niche tool that I made for myself. I started ScreenCred [about three years ago](https://samwarnick.com/blog/devlog-december-8-2022/) as an iOS app. It was a fun little project and I learned a lot about Swift and iOS development along the way. After an [initial rejection](https://samwarnick.com/blog/screencred-in-app-review/), I released it on [July 21, 2023](https://samwarnick.com/blog/devlog-july-21-2023/). I was proud of it! A couple people even used it and left tips. That was pretty neat.

[Then I got frustrated.](https://mastodon.social/@samwarnick/113857119464367786) TL;DR, I made a game for my three-year-old daughter and Apple rejected it saying it didn't do enough. It really soured me on the idea of developing for Apple platforms. I decided to focus on web development. I did get caught up in the WWDC hype and started on an iOS redesign, but about two years after releasing ScreenCred, I let my Apple Developer account lapse. That unfortunately meant you could no longer get ScreenCred on the App Store. I heard from a couple people that they were sad it was missing. I kicked things into a slightly higher gear and got moving on a web version.

A web version of ScreenCred has always been on my list. In fact, I started on it a few different times:

![Blue folder icons labeled ScreenCred-Web, ScreenCred-Web-2, ScreenCred-Web-3, and ScreenCred-Web-4, arranged vertically.](https://samwarnick.com/media/2025/11/2025-11-25-a-new-era-for-screen-cred1.png)

I tried out a few different stacks. Astro, [Perfect Stack](https://samwarnick.com/blog/the-perfect-stack/), and SvelteKit. I ended up going with SvelteKit[^1] because it had the best developer experience out of the three and I was initially planning on hosting it on Cloudflare workers. [Cloudflare got derailed](https://samwarnick.com/blog/i-just-want-to-generate-an-og-image/). I'm now self-hosting it with the [node adapter](https://svelte.dev/docs/kit/adapter-node). It took a while to gain momentum on the project, but after making the decision to just use the node adapter instead of Cloudflare, I made a lot of progress. Views and state management had to be written from scratch, but a lot of the other business logic was easily ported from the iOS app.

It's now at a point where I'm happy with it. At least happy enough that I switched over the DNS. I'm not a great designer, but I think it looks and works decently. I'm confident there are lots of ways it can be improved and I'm excited to keep working on it.

<div class="side-by-side">
  
![ScreenCred app interface on an iPhone, showing two search bars at the top, followed by "Recents" and "Suggestions" sections with movie and TV show posters in a dark-themed layout.](https://samwarnick.com/media/2025/11/2025-11-25-a-new-era-for-screen-cred2.png)

![ScreenCred app interface on an iPhone with movie posters for Spider-Man and K-pop Demon Hunters, displaying cast information for Claudia Choi and Wendell Dalit with their roles and profile pictures.](https://samwarnick.com/media/2025/11/2025-11-25-a-new-era-for-screen-cred3.png)

</div>

![ScreenCred app interface in Safari with search bars at top, showing two search bars at the top, followed by "Recents" and "Suggestions" sections with movie and TV show posters in a dark-themed layout.](https://samwarnick.com/media/2025/11/2025-11-25-a-new-era-for-screen-cred4.png)

I'm especially proud of the OG images:

![Thumbnail showing movie posters for Spider-Man: Into the Spider-Verse and KPop Demon Hunters against a blurred blue and pink gradient background.](https://samwarnick.com/media/2025/11/2025-11-25-a-new-era-for-screen-cred5.png)

I think they are a nice touch. And, honestly, like 50% of the development time was spent on these images, hence the whole dropping Cloudflare workers and using node.

So, anyway, a new web-based era for ScreenCred. Check it out and let me know what you think. Any feedback is appreciated. Again, find it at [screencred.app](https://screencred.app).

[^1]: I'll probably need to write more on why I chose SvelteKit over Perfect Stack.
