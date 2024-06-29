---
title: Some thoughts on editors
date: '2022-07-10T10:00'
oldUrl: 'https://samwarnick.com/2022/7/some-thoughts-on-editors'
---

I've been messing around with my workflow and trying different code editors. I know IntelliJ kinda has a bad rap  and often feels slow compared the everything else out there, but it has 2 features that I think are under appreciated.

1. [Language Injection](https://www.jetbrains.com/help/idea/using-language-injections.html). You can sort of do this in VSCode, but you have to add an `html` tag to your string. IntelliJ just automatically figures it out, highlights it properly, and even Emmet works. Magic.
2. Running tests with the click of a button in the gutter[^1]. In IntelliJ, it's very convenient, and I don't think I even had to set anything up to make it work. It just configured itself like magic. I haven't found running individual tests (let alone debugging them) a pleasant experience in any other editor.

I'm currently trying out Vim full-time, but IntelliJ has a lot going for it. Most editors have way too much going on, especially IntelliJ. That's what I like about Vim, I can keep it light and add just what I need.

But I'm always looking at others and seeing what fits me best. I own and like [Nova](https://nova.app/), but it still feels immature and doesn't have a thriving extensions ecosystem. [Fleet](https://www.jetbrains.com/fleet/) looks interesting, but have to wait to actually try it. VSCode has good extensions and is pretty fast. But I just don't like how it looks 🤷🏻‍♂️. Xcode is necessary when working on iOS or macOS apps, but it works well for what it does, and I've been quite impressed with the Xcode 14 betas.

So TL;DR, IntelliJ is kinda slow and doesn't look great, but has great features.  Seems to be that the faster something is, the more fiddly it is. For the most part, IntelliJ just works out of the box.

[^1]: Xcode has this too, but in my day job, I mainly work with JavaScript.
