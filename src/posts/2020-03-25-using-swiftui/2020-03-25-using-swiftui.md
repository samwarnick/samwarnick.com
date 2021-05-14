---
title: "Using SwiftUI for Focuses"
date: 2020-03-25
description: "I used SwiftUI to make Focuses. It went suprisingly well."
categories: [projects]
image: ../../posts/introducing-focuses/focuses.jpg
imageAlt: Focuses iOS app.
---

I think I mentioned it briefly, but Focuses is built mostly with SwiftUI. Overall, I'm very impressed with SwiftUI. I don't think I would've been able to build the first version of Focuses as quickly as I did had I not used SwiftUI.

Focuses is my first "real" iOS app. My first app, [Send To Nowhere](https://samwarnick.com/projects/send-to-nowhere), is a simple app using UIKit, Swift, and no storyboard. I'm still a novice when it comes to the iOS ecosystem. I'm a full-time web developer by day, so using SwiftUI felt familiar in ways. However, the declarative nature of it still feels quite foreign from time to time.

## SwiftUI: The Good

I was worried that SwiftUI wasn't going to be mature enough to complete my app. I was surprised at how capable it currently is—despite it's many shortcomings—and I'm very excited to see it develop. It's not perfect, but I was able to use it for about 95% of my views. Even in the short time I have been building Focuses, I've seen great bug fixes and improvements come to SwiftUI. I'm very optimistic for it's future.

SwiftUI made some things in Focuses a breeze to implement. Take the animation when filling up the circle. That whole view, including the animation, took me about 10 minutes to make. Again, I'm not a UIKit expert, but I have no idea where to start if I had to make that same view without using SwiftUI.

![Animation of score indicator filling up](https://res.cloudinary.com/verygoodfm/video/upload/c_fill,g_north,h_500,w_500,e_loop/v1584789978/samwarnick.com/score_indicator.gif)

Creating complex layouts like the calendar was relatively straight forward as well. I think my first implementation had too many nested views, which were being rendered too often, so it took a long time to load. But it was easy to go from idea to implementation quickly. I was able to iterate and make a much more performant version fairly quickly.

![Sreenshot of Focuses calendar with boxes around elements](https://res.cloudinary.com/verygoodfm/image/upload/v1584789837/samwarnick.com/calendar.png)

I also like how easy it is to use CoreData with SwiftUI. There were times that things weren't updating when I thought they should've, but I found ways around it. This was my first time using CoreData, so for all I know, I could be doing everything wrong and that's the source of my problems. Hopefully not though.

The main issue with CoreData and SwiftUI, in my opinion, is previews. I could not find a way to adequately seed that database for previews. So for much of the project, I did not use previews. Maybe I need to take another look at this.

## SwiftUI: The Bad

SwiftUI is great at hiding complexity and implementation details, like when using `@FetchRequest`. However, once you want to do something that is more complex, like pass in params to your fetch request, things can get messy.

Here's a couple things I needed to use UIKit for:

1. Text fields that I wanted to become the first responder (i.e., receive focus when the view appears and show the keyboard).
2. `UITextView`. There doesn't appear to be a SwiftUI equivalent of this. I needed a multi-line text input for notes. I also wanted an input accessory view, and I believe this can still only be done using UIKit.
3. I wanted to set the scroll position of the calendar view so you would start at the bottom. The only way I could find to do this is by using a `UITableView`. I was still able to use my SwiftUI view for the cells.

There's also some things that just don't make a lot of sense. Action sheets do not work on iPad. You have to use a [work around](https://stackoverflow.com/questions/56910941/present-actionsheet-in-swiftui-on-ipad). iPad support in general seems kinda weak. I’ve found it tough to make layouts for iPad, part of the reason the first version of Focuses doesn’t have great iPad support. I need to spend more time figuring it out.

I also had a lot of trouble embedding forms _inside_ other views, like on the privacy and about views. My solution is hacky and doesn't respond well to changing the system font size, but it works for now. Essentially, I have to give the form a set height based on my best guess using the font size. Additionally, I have to use `.fixedSize(horizontal: false, vertical: true)` on all the text so it would wrap properly.

I also wish there was a way to customize the navigation bar. As far as I can tell, you're stuck with it's color and font.

I'm hoping all these things will be addressed in iOS 14, or possibly even point updates of iOS 13.

## Conclusion

The best resource I've found for SwiftUI is [Hacking with Swift](https://www.hackingwithswift.com/quick-start/swiftui). The examples are fantastic.

If I were starting a new app today, I think I would still start with SwiftUI. I feel like I'm faster when I use it, and it's pretty simple to use a UIKit view if you need to. I think I've only scratched the surface of what SwiftUI is capable of. I need to delve deeper into animations and transitions.

I'm excited for the future of SwiftUI. I feel like it allows me to create things I would've dreaded to try a year ago.

If you're curious about how I did anything in Focuses, let me know on [Twitter](https://twitter.com/samwarnick), or use the [contact form](https://samwarnick.com/contact). I can dig into the nitty-gritty specifics.
