---
title: Bookmarks in Obsidian
date: '2022-03-11T10:00'
oldUrl: 'https://samwarnick.com/2022/3/bookmarks-in-obsidian'
---

For a while, I tried to utilize Twitter's bookmark feature to save interesting links, helpful tidbits, and whatnot. I quickly realized that it was almost impossible to go back and find what I had saved. Around the time I started looking for other options, I was also diving deeper into Obsidian. After some fights with Shortcuts on iOS, and creating my own Obsidian plugin, I now have a quick way to add tweets and other links to notes in Obsidian from the iOS share sheet.

[The shortcut](https://www.icloud.com/shortcuts/22ce59d8d6b04f0ca807b5292f9d920b) gets the url, asks for a note, wraps it in a markdown link, and prepends it to the appropriate file. The shortcut does some other things like look in my bookmarks folder and present me with a list of files to insert the link into[^1]. It can also create a new file if I want to start saving links related to a new topic.

With the links now in Obsidian, I can use the search to easily find them again. One downside, since I'm not saving the actual content of the links, search is dependent on the notes I attach. I'm not always great at coming up with good notes...so I also wanted a way to easily scan through my links. That's why I made the [Simple Embeds plugin](https://github.com/samwarnick/obsidian-simple-embeds). It automatically replaces supported links—like Twitter and YouTube—with embeds instead. This way, when my laziness fails me, I can quickly scroll through my bookmark notes and see the actual tweet or video.

![My iOS bookmarks file](https://samwarnick.com/assets/media/1646961373_ios-links.jpg)

![My iOS bookmarks file with Twitter links replaced with an embed](https://samwarnick.com/assets/media/1646961367_ios-links-with-embeds.jpg)

So that's my bookmarking system with Shortcuts and Obsidian. Works pretty well for me.

[^1]: The shortcut does require [Toolbox Pro](https://toolboxpro.app) because that was the easiest way I could find to sort my list of files.
