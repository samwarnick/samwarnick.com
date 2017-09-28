---
layout: post
title: "Hello, world!"
date: 2017-09-27
---

Hello, world!

~~~ liquid
<div class="posts-container">
  {% for post in site.posts %}
    <div>
      <h2><a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a></h2>
      <span>{{ post.date | date_to_string }}</span>
    </div>
  {% endfor %}
</div>
~~~

~~~ javascript
/**
 * Does a thing
 */
function helloWorld(param1, param2) {
  var something = 0;

  // Do something
  if (2.0 % 2 == something) {
    console.log('Hello, world!');
  } else {
    return null;
  }

  // @TODO comment
}
~~~

~~~ swift
override var isHighlighted: Bool {
  didSet {
    let newOpacity : Float = isHighlighted ? 0.6 : 0.85
    let newRadius : CGFloat = isHighlighted ? 6.0 : 4.0

    let shadowOpacityAnimation = CABasicAnimation()
    shadowOpacityAnimation.keyPath = "shadowOpacity"
    shadowOpacityAnimation.fromValue = layer.shadowOpacity
    shadowOpacityAnimation.toValue = newOpacity
    shadowOpacityAnimation.duration = 0.1

    let shadowRadiusAnimation = CABasicAnimation()
    shadowRadiusAnimation.keyPath = "shadowRadius"
    shadowRadiusAnimation.fromValue = layer.shadowRadius
    shadowRadiusAnimation.toValue = newRadius
    shadowRadiusAnimation.duration = 0.1

    layer.add(shadowOpacityAnimation, forKey: "shadowOpacity")
    layer.add(shadowRadiusAnimation, forKey: "shadowRadius")

    layer.shadowOpacity = newOpacity
    layer.shadowRadius = newRadius

    let xScale : CGFloat = isHighlighted ? 1.025 : 1.0
    let yScale : CGFloat = isHighlighted ? 1.05 : 1.0
    UIView.animate(withDuration: 0.1) {
      let transformation = CGAffineTransform(scaleX: xScale, y: yScale)
      self.transform = transformation
    }
  }
}
~~~

~~~ sass
body {
  margin: 0;
  padding: 0;
  
  & * {
   box-sizing: border-box;
  }
}
