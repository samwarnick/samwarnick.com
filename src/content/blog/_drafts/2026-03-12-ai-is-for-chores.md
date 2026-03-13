---
title: AI Is for Chores
date: '2026-03-12'
published: false
---

A couple years ago, I built an app for my wife and I to keep track of what is for dinner. It was cleverly named What's for Dinner? Yesterday, it broke. I did not renew my Apple Developer account last year. Best I can figure, the certificate I signed the app with finally expired yesterday. So neither of us could run it. I didn't feel like paying $100 for us to use the app. But I wanted to resolve this quickly. So I turned to Claude Code.

Since I've been self-hosting more and more, I've been wanting to move What's for Dinner? To the web anyway. So I pointed Claude at the iOS app and an existing SvelteKit project of mine to use as a template and told it to make a web version of What's for Dinner? Planning and implementation took about 20 mins. Fixing things and tweaks took another 10. Getting it deployed took an hour, but that's another story that essentially boils down to I forgot to update a string. In half a night of free time, I took care of a thing that had been on my imaginary todo list for months.

It was a perfectly fine experience. A good one even. It identified all the features. It created a script to import all our existing meals. It looks fine. It didn't add dependencies unless I explicitly asked for them. Yes, it was not as fun as building it myself. But I viewed this as a chore. It would have taken me at least a week to do this small project myself. Claude Code helped me do my chores.