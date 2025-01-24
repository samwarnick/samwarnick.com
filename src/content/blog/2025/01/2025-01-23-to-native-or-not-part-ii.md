---
title: To Native or Not Part II
date: 2025-01-23T19:43
summary: I'm torn between building a native app or a web app for my new task
  management project after a frustrating experience with App Store rejection.
published: true
---
I was getting real close to starting a new task app. I was pretty set on just doing it SwiftUI on iOS and macOS with CloudKit. Then Apple rejected a [little game](https://hannahsgame.samwarnick.com) I made for my daughter.

It made me a little upset.

They rejected it for “Guideline 4.2 - Design - Minimum Functionality.” I tried to explain that my three-year-old loves it. It's the first thing she asks to do when she wakes up. It's simple on purpose to reduce distractions. People have asked me to release it so they could share it. Apple's response "We encourage you to consider ways to make your app stand out. We understand that it can be difficult to determine what the best experience is to offer your users." I could more to it and try again. But I have no idea where the minimum functionality line is. I've put apps that do less than this game on the App Store and I've had other apps that do more get rejected for the same reason. I built the app I wanted to build and am in no mood to please the App Review people. I decided not to invest any more time into a native version. Sunk cost. I polished up the web version instead.

Maybe I'm being overly dramatic, but this experience is having me question my thoughts about building apps. My idea for a task app is for a fairly simple app built for the way I want to manage tasks. It will likely take me months to build. After all that investment, there is no guarantee it will get approved. Might be too simple for them. They might call it spam since there are already a couple task apps on the store.

So I'm trying to decide, native or not?

## Native

When possible, I mostly use native apps on iOS and macOS. I like them. I've built a couple myself. I would mostly want to use this app on macOS, but would want it available on iOS as well.

### Pros

*   iOS and macOS apps just feel cool and are fun to make (IMO)
*   System features like widgets, shortcuts, focus modes, menu bar app, etc.
*   They come with some amount of legitimacy
*   Less infrastructure to manage
*   CloudKit is basically free and doesn't require users to make an additional account
*   Easier to do offline/local first
*   I like the community
*   Might have an easier time getting people to pay

### Cons

*   App Review
*   CloudKit is mostly a walled garden
*   SwiftUI is nice to get going, but I know there are places where it will not be sufficient for what I want
    *   If I do macOS, that would mean learning some AppKit, which I am 0% familiar

## Web

I would probably use my [perfect stack](https://samwarnick.com/blog/the-perfect-stack/) to build this. I enjoy it. Buts, some of the equation would change if I used something like SvelteKit and Supabase or PocketBase. I may look into those options.

### Pros

*   I control it all
*   Can build once and use on mobile and desktop
*   Can easily add an API
    *   Could be used by shortcuts and apps to make widgets
*   Would be nice building for the web, making it accessible to more people
*   No App Review

### Cons

*   Saving web apps to iOS Home Screen or macOS Dock is still not great
*   Have to manage and pay for a lot more infrastructure (again, if I use services, this changes a bit)
    *   Servers
    *   Databases
    *   User management
    *   Payments if I decide to do that
*   Probably harder to get people to pay

So, I don't know. I've really good at making decisions. I think I could make a pretty compelling app for iOS and macOS, but at what cost? There is also a hybrid approach, make 3 apps—iOS, macOS, and web with my own backend. The most expensive and ambitious option of all. I would have fun building either. Both would be a lot of work. I'm sure this is an easy decision for a lot of people. But it's not for me.

What do you think? What do you think I am missing?