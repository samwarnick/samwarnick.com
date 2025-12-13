---
title: New Bookshelf Page
date: 2025-07-08T19:00
summary: Just wanted to show off the books I have read.
tags:
  - Blog
published: true
ogImage: og-img-bg/bookshelf.jpg
---

I added a new [/bookshelf](https://samwarnick.com/bookshelf) page. It is pretty simple, just a list of books grouped by year. I don't review or even rate the books I read—who has time for that? If it is on the list, I liked it enough to finish it. That's what you get.

One of my favorite apps is [Reading List](https://readinglist.app). I've been using it for over 5 years to track the books I have read and want to read. IMO, it is well-designed and works the way I expect it to. Since it is a local first, native app, it has no API. But, you can export everything as a CSV. I take the CSV export, turn it into JSON, do some filtering and mapping and boom, I have all the books I have read. Yay!

Getting book cover images was harder than I expected. I tried a few APIs to get cover images, but they were all missing a lot of covers for books I had read. It could be a difference in ISBN of physical vs ebooks, but I'm not sure. Reading List has every cover image though. They use the [Google Books API](https://developers.google.com/books). Luckily, the export comes with a Google Books ID. The problem is, the Google Books API only has tiny thumbnails for each book[^1]. I worked around that by putting the thumbnail in a square and blurring the background behind it. It tricks you—or maybe just me—into thinking the images look better than they actually do.

<div class="book" style="width: 200px; margin-inline: auto; margin-block: var(--spacing-more);">
    <a href="https://bookshop.org/book/9780870714993">
        <span class="wrapper">
            <img class="background" src="https://books.google.com/books/content?id=Wcg50WcWJT4C&amp;printsec=frontcover&amp;img=1&amp;zoom=1" alt="" aria-hidden="true">
        </span>
        <span class="cover-wrapper">
            <img class="cover" src="https://books.google.com/books/content?id=Wcg50WcWJT4C&amp;printsec=frontcover&amp;img=1&amp;zoom=1" alt="Gathering Moss">
        </span>
    </a>
</div>

Whenever I want to update this page, I export from Reading List, run my script to generate the data, and push to prod. Not too bad.

[^1]: They have higher resolution covers for _some_ books, but not all.