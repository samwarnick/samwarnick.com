---
title: I tried Alpine
date: '2023-06-06T08:00'
oldUrl: 'https://samwarnick.com/2023/6/i-tried-alpine'
published: true
---

As part of my little Frosthaven calculator, I gave [Alpine.js](https://alpinejs.dev) a try. I think I like it.

If you look at [the PR](https://github.com/samwarnick/frosthaven-calc/pull/1) for the switch, you can see that using Alpine really simplified the JS, and has the advantage of keeping my template in the HTML.

To keep my template a bit cleaner, I used `Alpine.data()` and `Alpine.store()` in a separate JS file. As you might expect, you don't get all the niceties you'd expect when using Vue or Angular, like jumping to a definition. But you gain a very lightweight and flexible framework that's pretty easy to use.

I also used the [Persist plugin](https://alpinejs.dev/plugins/persist) to remove my own local storage implementation. With a few characters, you get automatic persistence of a value. That's really nice.

There's a lot of directives and features I didn't use, but Alpine really seems like it's got a lot of what you'd need. It was very simple for me to loop through an array and display table rows. It worked well for this small project. I'd be interested to see how it scales though. It seems to be geared toward server-side projects where you can componentize things with partials or includes to reuse code. The JS and HTML could get a bit unwieldy if you're not able to refactor things into smaller files.

I'm definitely going to look to use Alpine more in future projects. I've been trying to explore more what it's like to not immediately bring in a build step when making a website. While Alpine is not right for every project, I think it could be a really good step for some projects before jumping to use another, "heavier" JS framework. But, since I don't do a lot of serverside stuff like Laravel or Rails, it may make more sense for me to reach for another framework in order to make components and whatnot.
