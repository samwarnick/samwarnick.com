---
title: Changing the direction of a SwiftUI Color gradient
date: '2022-06-22T10:00'
oldUrl: 'https://samwarnick.com/2022/6/changing-the-direction-of-a-swiftui-color-gradient'
published: true
---

SwiftUI added a pretty cool new property to `Color` to easily create subtle gradients.

```swift
Rectangle().fill(.blue.gradient)
```

Now, all colors, even custom colors, come with a standard gradient. The problem is that the gradients all go top to bottom. I submitted feedback to allow changing the direction, but, turns out, there's already a way! You can use new `ShapeStyle` functions to create gradients using a color's standard gradient. For example:

```swift
Text("Hello, World!")
    .foregroundStyle(.linearGradient(Color.orange.gradient, startPoint: .leading, endPoint: .trailing))

Rectangle()
    .fill(.radialGradient(Color.cyan.gradient, center: .center, startRadius: 0, endRadius: 500))
```

I like the new standard gradients. They even work with custom colors, like `Color(red: 91/255, green: 140/255, blue: 90/255).gradient`. And I'm glad you can derive new gradients from them with `ShapeStyle`—adds a lot more possibilities.
