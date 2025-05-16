---
title: "/debugging-kids"
layout: layouts/page
---

I started to dig in and start debugging some of the strange behavior in my kids. I don't know who wrote this code, but it's not very good. It's full of bugs, TODOs, and unimplemented methods.

I'll record what I find here.

```js
askParent(question, volume = 1.0) {
  sayOutloud(question, volume);
  setTimeout(() => {
    if (!parentHasResponded) {
      this.askParent(question, volume += 0.1);
    }
  }, 1);
}
```

```js
wantsToWatchShow(show) {
  if (this.sibilings?.some(s => s.wantsToWatchShow(show))) {
    return false;
  }
  return true;
}
```

```js
keepThoughtInHead() {
  throw new Error("Not implemented.");
}
```

```js
wakeUp() {
  // TODO: Wait for response before asking next question.
  this.askParent("Can I have a treat?");
  this.askParent("Can I watch a show?");
  this.askParent("Can I have pancakes?");
  this.askParent("Can I have waffles?");
  this.askParent("Can I have french toast?");
  this.askParent("Can I stay home?");
}
```

```js
willEatFood(food) {
  if (this.parents.includes(food.suggestedBy)) {
    return false;
  } else if (food.isFavorite && getRandomInt(5) === 0) {
    this.unfavoriteFood(food);
  }
  return getRandomInt(2) === 0;
}
```

```js
/**
 * @deprecated will be removed in version 0.7
 */
canRollOverInDirection(direction) {
  return direction === DIRECTIONS.clockwise;
}
```