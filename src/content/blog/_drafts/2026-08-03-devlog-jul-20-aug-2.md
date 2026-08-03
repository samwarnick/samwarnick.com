---
title: Devlog Jul 20 - Aug 2
date: '2026-08-03'
published: false
---

I've been on vacation for a lot of this work block, but still got quite a bit done. The main focus has been on polishing ScreenCred.

![ScreenCred comparison screen for Andor (2006) and Rogue One: A Star Wars Story (2016), showing shared cast and crew members including Forest Whitaker as Saw Gerrera, Alan Tudyk as K-2SO, and George Lucas, each with an info icon.](/media/media-1.png)

- Added more gradients. For fun. I like it.
- Switched to using a proxy to access the TMDB API instead going direct.
- Switched from Boutique to SwiftData. I only use this for recents and history. Pretty low stakes data, so I'm not bothering with migration. LMK if you have strong feelings otherwise.
- Fixed a few animation bugs.
- Switched how I render some things to improve scroll performance. Including switching to the [NukeUI](https://github.com/kean/Nuke) package for images. Still pretty surprising how bad scrolling with SwiftUI is.

There's still plenty of polish needed, but it's starting to feel pretty good to me. Not sure when I will wrap it up. Soon™.

And, the latest version of ScreenCred is [available on TestFlight](https://testflight.apple.com/join/5DSMBfj2). Check it out and let me know what you think!


