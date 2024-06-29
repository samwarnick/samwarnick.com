---
title: Creating a file from Raycast
date: '2023-03-03T17:15'
oldUrl: 'https://samwarnick.com/2023/3/creating-a-file-from-raycast'
published: true
---

I was procrastinating today, so I made a bash script. I had been using [Espanso](https://espanso.org/) to make creating my develogs a bit easier with some text replacement. But then I thought, sure would be nice to just type `dev` into [Raycast](https://www.raycast.com/) and have it create the file, insert the template, and open it in iA Writer for me. So Googled my way through to a bash script:

```bash
today=$(date +%Y-%m-%d)
publish=$(date -v +1H +"%Y-%m-%d %H:00")
titleDate=$(date +"%B %-d, %Y")
path="/.../Posts/[devlog]/_$today devlog.md"
template="---
Date: $publish
tags:
---

# Devlog: $titleDate

"

printf -- "$template" >> "$path"

open -a "iA Writer" "$path"
```

Never worked with dates in bash before, so learned a couple things:

1. Add `-` to remove leading 0's: `%-d`.
2. Use `-v` to change the date: `date -v +1H` to add an hour. I do this so develogs are published a little bit in the future.

And then with `printf`, needed to use `--` to tell it to ignore the hyphens in my text, which I need to indicate frontmatter in the markdown.

A fun little script. Might make one to create a new blog post, instead of a devlog. But I don't make posts very often. So we'll see. This was a nice little distraction, and something that has been rattling around my brain for a few weeks. Nice to get it out.
