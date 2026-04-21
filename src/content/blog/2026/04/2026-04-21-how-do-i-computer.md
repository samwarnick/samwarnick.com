---
title: How Do I Computer
date: '2026-04-21T08:32'
published: true
summary: 'My setup, tools, and the way my brain works when I''m thinking about code.'
tags:
  - April 2026 Blog Challenge
  - Uses
---

The prompt was "how do I compute", but I made a typo. I'm leaving it.

I go through phases of wanting a specific device for each task vs wanting a single device for everything. Right now, I'm in a phase of consolidation. I don't want a ton of devices or apps. I want to be content with what I have.

My main device is a 14" M1 Max MacBook Pro with 64GB of memory. I've toyed with the idea of getting a desktop for my primary computer, but I think I detach from my desk too often to make it realistic. My daughter has been sick, so right now, I'm sitting on the floor of her room as she tries to go to sleep. I like having a single computer. I don't have to worry about syncing or anything. I just bring my work with me. I work with git a lot and I know I'd forget to push needed changes[^1]. I love this computer though. I've had it for almost five years and it is not really showing any signs of slowing down. The only things that make the fans go are ffmpeg and local LLMs.

Being on a MacBook, you will be shocked to learn that I use macOS. I got my first Mac in 2013. I was studying computer science and I had heard software people liked macOS. I didn't really know why. But I went to the university bookstore and got one. We mostly get along. TBH, I still don't really get Finder sometimes. With my shift to [self-hosting](https://samwarnick.com/tags/self-hosting/), I've been curious to try Linux again, but I don't have anything to install it on and give it a real go.

I use Safari on my personal computer. I like being in the ecosystem. The worst part is how poorly the 1Password extension works in it. Like maybe 25% success rate. Why not just use Apple's built in password manager? I use 1Password for more than passwords—passports, driver's licenses, software keys, etc.—and I share these with my wife. There is no built in way to nicely share encrypted notes like this. As soon as you lock a note in Notes.app, it can no longer be shared. I also have some accounts that have more than a username and password. Arbitrary fields are not supported. I also can't set Kagi as my default search engine. At work, I use [Helium](https://helium.computer). I like Chrome developer tools more than Safari's. The 1Password extension mostly works, and I can set Kagi as my search engine.

Lately, a lot of ideas have been starting with Claude. I'm on the free plan. I find it useful for triaging and iterating on ideas before I dive into implementation. I always feel like I'm letting myself down when I turn to an LLM for anything. Like I'm no longer legit[^2]. But I still do my best to write the code for my personal projects myself.

My goto editor is WebStorm. It just works. Since they implement their own language support, sometimes they are a bit behind though. Like their Svelte support is not the best. I have been experimenting with using Zed more. It feels more lightweight, which I enjoy. I think my days of neovim are behind me. I'm too old to be messing with configs and plugins and all that. I'm also pretty used to having my editor and terminal in separate apps. It works for me. I try to limit the number of apps I use, and one hope with Zed is that I can have one editor for any language I might work with.

I use Ghostty as my terminal. Why? Hype I guess. I don't think I had any issues with iTerm. I also use fish as my shell. Why? Carter said I should. It comes with a lot of stuff I used Oh My ZSH plugins for. But, I'm not a fish or bash expert, so when something has bash instructions and not fish, I'm lost. But I'm too lazy to switch back to zsh right now. But I might. Who knows.

My current stack of choice is SvelteKit and Postgres. With Zod and Drizzle, it gets pretty close to my ideal of a top to bottom typed stack. Yes, TypeScript is a lie. But it's kinda the best we have right. I have not explored the world of WASM though. So who knows. I deploy apps to my server with [Deploybot-3000](https://samwarnick.com/blog/i-built-my-own-coolify-replacement-that-i-might-not-use/).

Blog posts start with my [CLI](https://samwarnick.com/blog/weekend-project/). It creates files with the correct name and template. I can also use it to add media to posts. I write and edit posts with [MarkEdit](https://github.com/MarkEdit-app/MarkEdit). Claude does some light edits and grammar checks and helps with the frontmatter. Once I'm ready, I use the CLI to publish—rename the file with the correct date and title and upload media to my server. A push to GitHub triggers Deploybot-3000 to build and publish.

I'm not a huge note taker, but I do use Obsidian. More at work than at home, but I have a vault for each. I keep them separate. I don't want to see work stuff when I'm not working.

I use Numbers for a couple budget related spreadsheets.

Every once in a while, I get my good camera[^3] out and take some pictures. Those end up in Lightroom CC. I like keeping them separate from my main photo library, and the CC version gives me better tools to manage my library locally. I've used quite a few other apps, but I find Lightroom's tools the easiest for me to use and get the results I want. I export the winners to my Photos library that I share with my wife.

## How I, Me, Myself Compute

When I'm away from my computer, my brain has trouble shutting down. When I have an idea, I often implement it in my head dozens of times before I have time to actually do it. I think about the commands I need to run, the code I need to write, and what's next. Sometimes I get fixated on one line of code. Write it in my head over and over. Keeps me up at night a lot. One of the reasons I intentionally hold myself back. I've tried writing things down in a notebook to get it out of my head, but I must be doing something wrong because it does not help[^4]. Sometimes I find bugs or improvements thinking about things over and over, but things do not really click until I actually do it. If I'm learning a new thing, I can read and think about it all I want, but it's not until I've actually done it a couple times that I feel like I have computed it. Really, all the cycles my brain spends on the "Think System" are not as useful as I'd like. Like when I'm considering learning more about React, it's not that useful for me to _think_ about _looking_ at the React docs over and over. But, it's part of my process—fill up memory, process, garbage collect.

---

There you have it. Nothing too exciting. If you want me to dive into something deeper, let me know!

---

My friends and I decided to do a weekly blog challenge for the month of April, 2026! Each week, one of us chooses a prompt and we all write posts.

For week 2, Dave chose the prompt:
**"How do you compute?"**

My friends' posts this week:

- [Carter](https://carter.works/)
- [Dave](https://catskull.net/)
- [Jared](https://jaredezz.tech/)

[^1]: Time to switch to [Fossil](https://fossil-scm.org/home/doc/trunk/www/index.wiki)?

[^2]: Likely never was.

[^3]: Sony A7C

[^4]: It's too early to say definitively, but sometimes it does help to talk through ideas with Claude to get them out of my head. It's like cosplaying working on a project. But other times it just makes it worse. Keep uncovering more things to explore. It's something I'm keeping my eye on though. It can sometimes be just the right amount of effort to get something out of my head.
