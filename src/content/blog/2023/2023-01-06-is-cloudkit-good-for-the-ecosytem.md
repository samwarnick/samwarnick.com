---
title: Is CloudKit good for the ecosystem?
date: '2023-01-06T11:00'
oldUrl: 'https://samwarnick.com/2023/1/is-cloudkit-good-for-the-ecosystem'
---

I use Day One for journaling. The other day I was checking about another journaling app made by an indie dev. It looks nicer, feels faster, and has some better features, and I'm assuming uses CloudKit to sync data. But it's missing an API. I use IFTTT to automatically record some things in Day One for me. I really like that about Day One. It's more than an app and I guess more of a service. It is difficult for indie devs to make that experience. As soon as you move away from CloudKit, you're brining on a whole bunch more baggage—servers, databases, privacy policies, and who knows what else. But, using CloudKit doesn't really allow developers to create services.

I think CloudKit is holding back a lot of indie apps. A lot of indie apps use CloudKit. I've used CloudKit. It's not the most simple solution, but it's free, and you don't have to manage servers. It's a pretty good option.

And maybe there's already ways around this. I honestly haven't looked into it much, but I think there's ways to access CloudKit from the web or server? Haven't heard good things about that though...

I think this could be partially mitigated if 3rd party apps could add automation triggers to Shortcuts (e.g., when I post something new in Mastodon, run a Shortcut that saves it to Day One.) That could be cool. But still probably pretty limited. Like could I have Shortcuts constantly checking for updates on an RSS feed? Maybe they could let apps with automation hooks wake up once every 15 mins or something.[^1]

Not all apps need to be exposed to the web like I'm talking about, but a lot of the projects I've started could benefit from it. I'm always drawn into CloudKit though and accept the limitations, because one less dependency I have to manage is great, and an entire backend is a pretty big dependency. I'm keeping my eye on other options like [PocketBase](https://pocketbase.io/), which can be extended with your own Go code, but lacks an iOS SDK at the moment. And maybe I should take another look at what Firebase can do these days, but Google...

Like everything, it's a balance. I don't want to spin up a backend for every side project I start, but maybe I need to so I feel less limited?

[^1]: I suppose I could already do this now. Create a Shortcut to check and RSS feed, store the latest in something like DataJar, and if there's a newer one, parse and save into another app. Then just create 96 automations to run every 15 mins.
