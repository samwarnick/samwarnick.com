---
title: Adding .pkpasses bundle to iOS Wallet
date: 2024-07-12T10:45
summary: I learned some things about adding multiple passes to iOS Wallet.
published: true
---
Recently, at work, I had the opportunity and pleasure to work on our iOS implementation of adding boarding passes to Wallet. I learned some things about those passes. Hard earned lessons.

Each pass is a collection of signed files zipped together into a `.pkpass` file. To manage multiple passes more easily, you can zip them together into a `.pkpasses` file. _A zipped file of zipped files._ (Emphasis added because it will be very important in like 2 paragraphs.)

We were opening a URL to the `.pkpasses` in an in-app browser. Safari knows how to handle this bundle and prompt the user to add them to their wallet. We wanted to cut out the browser step and call the native methods—in our case, using [`PKAddPassesViewController`](https://developer.apple.com/documentation/passkit_apple_pay_and_wallet/pkaddpassesviewcontroller). Turns out, _only_ Safari knows how to handle this `.pkpasses` file. There are not native methods to add a bundle—you need individual passes. Without changing our backend to send individual passes, I didn't know what to do. I was stuck and spinning my wheel.

Then all the random stuff I was reading clicked—_`.pkpasses` is literally just a zipped file._ Now I was cooking with bits.

So what I ended up doing:
1. Download the `.pkpasses` bundle.
2. Unzip the `.pkpasses` bundle and get all those beautiful  `.pkpass` files.
3. Create `PKPass` for each file—Base64 string to `Data` to `PKPass`.
4. Add the passes.

It was a fun problem that I spent too much time on. But now I know more things!