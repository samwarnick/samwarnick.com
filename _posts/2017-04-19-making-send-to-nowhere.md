---
layout: post
title: Making Send to Nowhere
date: 2017-04-19
---

For me, making [Send To Nowhere](https://appsto.re/us/8ebbjb.i) was a fun process. I like making things. Send To Nowhere was a dumb and simple enough idea to experiment with some things. I’ll try to write a little bit about why and how I made this app. The entire project is up on [GitHub](https://github.com/samwarnick/Send-To-Nowhere).

### Motivation

- I had been reading a little bit about [making iOS apps without using any storyboards or the interface builder](https://blog.zeplin.io/life-without-interface-builder-adbb009d2068). I liked this idea. I did a group project where we made an iOS app, and storyboards caused a bunch of problems when using git. Send To Nowhere seemed like a simple enough idea to try this out on.
- I also wanted to put an app on the App Store. I wanted to get more familiar with the whole ecosystem.

### Life without the Interface Builder

Honestly, I didn’t miss the interface builder (IB) that much. The times I’ve used it, I feel like I was spending most of my time wrangling with constraints, and doing a lot of stuff that couldn’t be done in the IB programmatically anyways. This may be due to my inexperience with the IB. So, for me, it wasn’t a huge leap to doing everything programmatically. One of my CS classes had us doing a Java Swing interface without any IB, giving me a little experience using an UI framework programmatically. Needless to say, using Swift and UIKit is magnitudes better than using Java Swing.

Getting started with doing everything programmatically was fairly easy. I just had to delete `Main.storyboard`, add a couple lines to `AppDelegate.swift`, and change one project setting. The following code shows the necessary changes to `AppDelegate.swift`. Basically, you have to grab the window, instantiate your own view controller, and set it as the root.

{% gist samwarnick/8fd3f1df3ce0ef1c2ea68997a99810e2 %}

In the project settings, you have to make sure that the project is not looking for any storyboards. Make sure that this setting is blank so that the app will not try to load a storyboard that does not exist. The app will crash if you don’t.

That was pretty much it to get going.

Actually building the interface programmatically wasn’t too difficult either. There are many ways to do this, but for me, I had a `configureViews` function that was called in the `viewDidLoad` function of my view controllers. In there, I would create all of the UI elements and constrain them to be in the right place.