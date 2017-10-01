---
layout: post
title: "CSS Variables?"
date: 2016-07-28
---

I just found out, I think two days ago, that CSS has native variables. I discovered this while looking through some generated code from [Zeplin](https://zeplin.io/). CSS preprocessors like LESS and Sass give us this ability, and probably do it pretty well. I don’t really know. I haven’t sued them much. For whatever reasons, I like writing plain CSS. So, without further ado, here’s an example of CSS variables:

{% gist samwarnick/ca6aa2fe1ffd29d423e0183937fe32f4 %}

Apparently this has been around since 2014-ish, as far as I can tell. `:root` is a pseudo-class which, in most contexts, represents the `<html>` tag. More on :root can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/:root). As you can see in the snippet, the variable starts with `--`. This sets it apart as a [custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/--*). Custom properties can be used as variables using `var()`! How cool. Because the custom properties are defined in `:root`, they are global. There’s all sorts of inheritance things with that, for better or worse. [Browser support](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables#Browser_compatibility) is pretty good, with one notable exception (I’m looking at you IE…🙄). That’s why line 7 exists in the snippet. It defines the color just incase someone has no idea what to do with `var()`. Seems kinda redundant, but it’s not the end of the world. Just a minor/mild nuisance. It’s not CSS’s fault though. Maybe Edge supports it? I don’t know. Maybe no one will use IE again? Hopefully. I need to do more browser testing with it myself. Maybe there’s a gulp and/or webpack tool that can automatically insert that fallback line for you. I should look into that.

So that’s a brief overview of CSS variables. I think it’s pretty cool because it lessens our dependency on preprocessors and such. The end.