---
title: Making Send to Nowhere
date: 2017-04-19
layout: post
description: "Send To Nowhere was a dumb and simple enough idea to experiment with some things."
categories: [programming]
---

For me, making [Send To Nowhere](https://appsto.re/us/8ebbjb.i) was a fun process. I like making things. Send To Nowhere was a dumb and simple enough idea to experiment with some things. I’ll try to write a little bit about why and how I made this app. The entire project is up on [GitHub](https://github.com/samwarnick/Send-To-Nowhere).

## Motivation

- I had been reading a little bit about [making iOS apps without using any storyboards or the interface builder](https://blog.zeplin.io/life-without-interface-builder-adbb009d2068). I liked this idea. I did a group project where we made an iOS app, and storyboards caused a bunch of problems when using git. Send To Nowhere seemed like a simple enough idea to try this out on.
- I also wanted to put an app on the App Store. I wanted to get more familiar with the whole ecosystem.

## Life without the Interface Builder

Honestly, I didn’t miss the interface builder (IB) that much. The times I’ve used it, I feel like I was spending most of my time wrangling with constraints, and doing a lot of stuff that couldn’t be done in the IB programmatically anyways. This may be due to my inexperience with the IB. So, for me, it wasn’t a huge leap to doing everything programmatically. One of my CS classes had us doing a Java Swing interface without any IB, giving me a little experience using an UI framework programmatically. Needless to say, using Swift and UIKit is magnitudes better than using Java Swing.

Getting started with doing everything programmatically was fairly easy. I just had to delete `Main.storyboard`, add a couple lines to `AppDelegate.swift`, and change one project setting. The following code shows the necessary changes to `AppDelegate.swift`. Basically, you have to grab the window, instantiate your own view controller, and set it as the root.

```swift
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = YourFirstViewController()
        window?.makeKeyAndVisible()
        return true
    }

    // The rest of AppDelage.swift
}
```

In the project settings, you have to make sure that the project is not looking for any storyboards. Make sure that this setting is blank so that the app will not try to load a storyboard that does not exist. The app will crash if you don’t.

That was pretty much it to get going.

Actually building the interface programmatically wasn’t too difficult either. There are many ways to do this, but for me, I had a `configureViews` function that was called in the `viewDidLoad` function of my view controllers. In there, I would create all of the UI elements and constrain them to be in the right place.

```swift
func configureViews() {
    let authorLabel = UILabel()
    authorLabel.defaultStlye()
    authorLabel.text = "Created by Sam Warnick"

    let websiteButton = UIButton(type: .system)
    websiteButton.defaultStlye()
    websiteButton.setTitle("samwarnick.com", for: .normal)
    websiteButton.addTarget(self, action: #selector(STNCreditsViewController.didPressWebisteButton), for: .touchUpInside)
    websiteButton.sizeToFit()

    let twitterButton = UIButton(type: .system)
    twitterButton.defaultStlye()
    twitterButton.setTitle("@samwarnick", for: .normal)
    twitterButton.addTarget(self, action: #selector(STNCreditsViewController.didPressTwitterButton), for: .touchUpInside)
    twitterButton.sizeToFit()

    let contactLabel = UILabel()
    contactLabel.defaultStlye()
    contactLabel.font = UIFont.systemFont(ofSize: 12, weight: UIFontWeightThin)
    contactLabel.text = "Please get in touch on Twitter or my website with any feedback"

    let myDetailsStackView = UIStackView(arrangedSubviews: [authorLabel, websiteButton, twitterButton, contactLabel])
    myDetailsStackView.axis = .vertical
    myDetailsStackView.alignment = .center
    myDetailsStackView.distribution = .equalSpacing
    myDetailsStackView.spacing = 8
    myDetailsStackView.sizeToFit()

    view.addSubview(myDetailsStackView)

    myDetailsStackView.snp.makeConstraints { (make) -> Void in
        make.centerY.equalTo(view)
        make.left.equalTo(view).offset(40)
        make.right.equalTo(view).offset(-40)
    }

    view.backgroundColor = UIColor.white
}
```

The process was simple—make an UI element and add it as a subview. After that, you have to put it where you want using constraints. I used [SnapKit](http://snapkit.io) for setting my constraints. It was pretty straightforward and it was easy enough to do everything I wanted. The only tricky thing was remembering to use negative numbers for the right and bottom constraints. For example, in the code above, I wanted the stack view to be 40 pts from the right edge of the view, so I had to give it an offset of -40.

I was initially a little worried about doing segues programmatically, but again, I found it to be simple enough.

```swift
let nextViewController = NextViewController()
nextViewController.modalPresentationStyle = .custom
nextViewController.modalTransitionStyle = .crossDissolve
present(nextViewController, animated: true, completion: nil)
```

You create an instance of the view controller you want to go to, set it up as needed (in my case I was setting the modal presentation and transition styles), and call `present`. These were simple segues that would present the view on top of my main view. I would just call `dismiss` to get rid of it. This project didn’t get me into using any navigation controllers. That’s something I want to try in the future.

I liked doing everything programmatically. Even with the IB, I was spending so much time in the code, so it makes sense to me to do everything in the code. It takes the mystery out of everything. I learned a lot about the UI elements I was using because it required spending a lot more time in the documentation. I built this app on my own, so I didn’t get the advantages of avoiding merge conflicts and such, but I can imagine how it’d be a blessing. I’d recommend giving it a try and see if it fits how you work.

## Submitting to the App store

I won’t get into the details of actually submitting to the App Store (there are plenty of good tutorials), but I’ll say that I did have some trouble because I started the project before I had a real developer account. It caused some weird issues with the bundle identifier. It just took some time to work out, but I got it in the end, obviously.

I was about 80% sure my app would be rejected. One of the App Store’s criteria is:

> If your app doesn’t offer much functionality or content, or only applies to a small niche market, it may not be approved.

So, I was worried that Send To Nowhere was too simple. It would have been fine if it had been rejected. I originally set out to just learn more about the whole process. But it was approved! After submitting, it took about a day and a half waiting to be reviewed and it took about 30 mins to be reviewed. It was very exciting. After that, it took about 6 hours to propagate to the App Store.

To date (about 6 days after it’s been released), Send To Nowhere has been downloaded an entire 18 times!

## The Future

Luckily, Send To Nowhere is simple enough that bugs shouldn’t come up. I had a few people beta test it to get the kinks out. But we’ll see if anything pops up. It’s always possible. I have a few ideas for possible updates. So there will most likely be version 1.1. After that, who knows!

If you have any feedback, leave a comment or hit me up on [Twitter](https://twitter.com/samwarnick).
