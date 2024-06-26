---
title: 'ScreenCred: A Retrospective'
date: '2023-07-29T13:00'
tags:
  - Projects
  - ScreenCred
oldUrl: 'https://samwarnick.com/2023/7/screencred-a-retrospective'
---

As of July 24, 2023, ScreenCred is officially launched. I announced it on my [Mastodon](https://social.warnick.me/@sam/110769797330600515), [Threads](https://www.threads.net/@samwarnick/post/CvFeOcsOwDs), and a Discord I belong to. I think at least four people have downloaded it. Don't know if anyone is using it though.

I thought it would be a good idea to kinda summarize what it took to build ScreenCred, what I've learned, what's next, and things like that.

## The Goal

The main goal for ScreenCred was just to finish something. More specifically, build an iOS app and release it on the App Store. For a long time, I was feeling frustrated about starting but never finishing projects. I knew I could do it—I've done it a couple times before. But I keep getting burned out. So really, my objective was to manage my energy and effort.

The second goal was to learn new things. I was already pretty comfortable with SwiftUI, so I was looking for new areas to explore. I was going to be using an API in an app for the first time. I quickly realized I wanted a great sharing experience. I also decided to throw in some in-app purchases since I've never done that either.

So based on those goals, ScreenCred has been a great success for me. Sure, I secretly hope it will make me a ton of money—who wouldn't—but it won't. I doubt it will even make me a little bit of money.

## Learnings

Now that things are "done", I'll try to summarize some of the things I learned.

### iOS

I can't articulate exactly why, but I like making iOS apps, and I want to get better at it. There's always a lot of stuff I want to try with iOS.

#### Getting data from the Internet

For the most part, all the iOS apps I've made put to this point have been pretty local experiences. They didn't fetch or store any data with another service—excluding CloudKit. But I wanted to. I wanted to learn more about handling loading, error, and others states[^1]. I wanted to make something that felt a little more "real", because real apps have servers I guess?

Using [The Movie Database API](https://developer.themoviedb.org/reference/intro/getting-started) was a good chance to use Swift's new async/await patterns and functions. That was fun. It was also a good chance to learn more about `Decodable`.

#### Universal Links

As I was building ScreenCred, I realized that sharing links would be a cool feature. I wanted links sent in iMessage to open in the app instead of the website. The hardest part of this for me was creating the `apple-app-site-association` file. It's not documented incredibly well. I had issues with content type headers, formatting, and stuff. But got it working in the end, and the links I wanted to open in the app do.

#### App Clip

Universal Links led me to think "what if the other person doesn't have the app installed?" Easy solution, tell them to download the app when the link opens in Safari. My galaxy brain moment was when I realized that pretty much the entire app could be an App Clip.

Really, I should've just updated my website to show results—which I would like to do at some point—but App Clips were new to me, so that's the path I went. And I'm glad I did. The first time I sent my brother a ScreenCred link, and it opened for him in the App Clip he said "that's really slick." So, yeah.

Also, don't confuse `applinks` with `appclips` like I did.

#### In-app purchases

My first app was free. My last app was paid up front. So next in the progression is that ScreenCred needed in-app purchases. My IAPs don't do anything. Just give me money! That made the implementation simpler.

App review couldn't find them, but after I explained where they were, no issues. That was nice.

Next app will be subscription.

### Web

I'm a web developer by trade. I'm always looking for new an exciting technologies to build for the World Wide Web.

#### Generating images with Puppeteer

When I had the idea for the dynamic images for sharing links in iMessage, I wasn't totally sure how I'd do it. I knew it could be done though.

When looking for dynamically generating custom images for websites, puppeteer seems to be the universal answer. The idea is simple, you make a webpage, get puppeteer to render it and essentially take a screenshot of it.

The main problem is that it needs Chrome, so kinda needs a lot of resources to run.

It was kinda hard to get setup too. I eventually needed to get it running in Docker and just kinda googled and threw stuff into a Dockerfile until it worked. Had a hard time with it. But, I don't really know Docker, so I guess that's to be expected.

#### 11ty

I didn't particularly want to have servers and all that for ScreenCred, but I needed some way to generate the images with Puppeteer. I had read about [11ty and Netlify builders](https://samwarnick.com/2023/2/devlog-february-11-2023) and thought I'd give that a shot. A serverless function that generated and cached the result sounded like the perfect solution.

The problem I had is it was slow. Like 10–30 seconds to generate an image. That was not good enough for sharing links in iMessage.

I also find 11ty a little chaotic for whatever reason. There's a lot of ways to configure things, and felt like I had to drop back down into JS to do basic things. Which I guess is the point of 11ty. I think this project helped me realize that my mental model doesn't exactly fit with 11ty. And that's fine. I guess I just gravitate towards more opinionated frameworks and tools.

#### Astro

So needed to try something else. At the time, I was trying to make nevoid work for me. So I was looking for something that would have good support in Neovim, be able to run on a server for SSR since edge functions didn't seem quick enough.

This led, me to Astro. With Astro I can pre-generate the pages that don't change like homepage, privacy, etc. but generate the search pages and images on-demand with SSR. Pulling in markdown content is also easy.

But, it uses a JSX-like syntax. And I just don't like JSX. It's fine, but not very clean IMO.

Overall, I'm happy with Astro. It works really well for a site like ScreenCred.

#### PicoCSS

I generally use Tailwind for my side projects, but found [PicoCSS](https://picocss.com) and wanted to give that a try. I like it because it makes things look nice by default, but easy to add custom styles. It took a lot of the design making decisions away from me, without a ton of overhead, which was exactly what I was looking for at the time. I've used it on a couple other things since.

Customizing colors is a pain though.

### Myself

#### Work habits

I really wanted to build a side-project in a sustainable way. I tend to work in spurts. I'll pour 100% of my energy into something for a few days or weeks and then just get totally burned out. This especially happens when I start working on things in the evening. Whenever I do, I'm up until like 3 in the morning because I cannot shut my brain off.

I knew I could not work like this if I wanted to be serious about building things.

So I made a new plan and an agreement with my wife. I would try working for an hour or 2 a few mornings during the week. Sometimes before a workout, sometimes after. After a few months of this schedule, I think it works really well for me.

It gave me much needed structure. I needed to quit to either take my kid to school, or start my real job.

Occasionally, a problem or curiosity would escape out of those work times in the mornings and I would spend lunch breaks, or time after work finishing up on a couple thoughts.

And, every once in a while, I still need the late, long nights to explore a new technology or idea. But those were far less frequent with ScreenCred than in previous projects.

So I've been quite pleased with how things have gone. I was able to sustain consistent work over nearly 8 months without feeling burned out on the project. If I took a couple days, or even a week off, I didn't feel too bad about it.\

#### Project planning

Project planning is a trap for me. I love the idea of productivity apps that are definitely way overkill for me. I've even started making a couple productivity apps myself. I don't know why, but there is always something in me driving to overcomplicate processes.

I tried to reign myself in for ScreenCred.

I started with a simple list in Tot. Then I switched to just plain index cards. I liked the index cards because it really focused the work. If the number of tasks for a feature did not fit on an index card, I knew I needed to break it down some more. I got tired of migrating unfinished tasks to new index cards and all the issues with not digital methods. But I liked the physical limitations[^2].

As a reaction against simple index cards, I probably gave Notion a shot. Then Reminders. Then probably Notion again. Shawn Hickman, who makes Sofa, has some great videos on [how he uses Notion](https://youtu.be/U9O_Jnb57Sw). Every time I see it, the part of me that loves this stuff gets real excited. But my projects are such small potatoes, it just seems too extra.

So I fought the urge and I'm on Reminders... for now. It's simple and everywhere.

#### Devlogging

About an hour a day is not a lot to get into things. I knew there would be many days where I'd finish in the middle of something. When that happens, my problem is that my brain does not let go and I cannot think of anything else. It's exhausting.

What seems to have helped me is a devlog on my blog for each work session. I wasn't 100%, but I did it more consistently than I thought I would. And you know what? I think it helped. At the end of each session, I'd try to write a quick summary of what I did, what I learned, and what's next. This acted as a brain dump and helped my brain relax and make room for the rest of the days activities. It's felt really beneficial and I'm going to do my best to continue.

## What's Next?

That's a great question. ScreenCred works for me as-is. So far, I've gotten pretty much zero feedback beyond "looks great!" I have no clue if people want anything different. Or if they want ScreenCred at all. So it's hard for me to decide if I want to continue putting the majority of my effort into ScreenCred. I've got ideas for it though, so I certainly could.

But I've got ideas for other projects too. Right now, my options are:

1. Keep working on ScreenCred.
	* There are still plenty of things I can try and learn from with ScreenCred. Like how do I actually get people to use it.
	* I kinda want to make a web version.
2. Start a new project.
	* My wife and I had an idea for an app for our kids.
	* Would also have a lot of new things to try and learn.
3. Finish the book I started for my daughter.
	* I started book for my daughter's fifth birthday. I gave her the first half and promised I'd finish it.

As I write that I promised my daughter I'd finish the book, I think it's pretty clear to me which thing I need to work on next. I realized that I pretty much have room for one project in my life at a time. As much as I'd like to work on everything, I just can't.

[^1]: A little awkward, as I write that, I'm wondering did I actually handle any of those cases well...🤔 I probably actually have a lot of work to do here.
[^2]: This has been processing in the back of my mind since. It think there is an app opportunity here.
