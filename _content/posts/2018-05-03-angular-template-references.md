---
title: Angular Template References
date: 2018-05-03
description: "Template references let you use and access elements in your template to do cool things."
categories: [programming]
---

## What is a Template Reference?

A template reference (I'll call it a template ref) is basically a tag you put on an element in your _template_ so that you can easily _reference_ that element later. Can you see why they named it like they did? The syntax is `#` and then the `name`. For example, if I want to add a template ref to an email input and call it `email`, then I would add `#email` to the input, like the following:

```html
<input type="email" #email />
```

So how is this useful. Well, elements with a template ref can be used in a template just like a public variable on a component can be.

So if I want a button to validate the email entered, I can do something like:

```html
<input type="email" #email />
<button (click)="validateEmail(email.value)">Validate!</button>
```

The value of the email input will be passed into the function. Cool!

In a little project I was working on, I had a widget selector and a button to add that widget to the page. The button called a function on the component and needed the selected value from the selector. I could add a variable to the component and change that every time an option was selected, but nothing else needs to know about that selected option, just the function the button calls.

```html
<select #widget>
  <option value="a">Dashboard Title</option>
  <option value="b">Tickets</option>
</select>
<select #width>
  <option value="span-col-1">1 Column</option>
  <option value="span-col-2">2 Columns</option>
</select>
<select #height>
  <option value="span-row-1">1 Row</option>
  <option value="span-row-2">2 Rows</option>
</select>
<button (click)="addWidget(widget.value, width.value, height.value)">
  Add
</button>
```

If I select "Tickets" "1 Column" and "2 Rows", then click the button, `a`, `span-col-1`, and `span-col-2` will be passed into `addWidget`! I like that a lot. It keeps my component cleaner because I don't need to define a bunch of variables to keep state that I don't really need.

## Template Refs and Components

You might be asking yourself right about now, "Can I only put template refs on regular ol' HTML elements?" Even if you aren't asking, the answer is no! You can put template refs on components too and access their properties! For example, if we have a `hello` component that has a property that tells us how many times a hello world has been done, you can access it in your template with a template ref.

```html
<hello #hello></hello>
<p>{{hello.howManyTimesHasHelloWorldBeenDoneBefore}}</p>
```

So there's probably some cool things you can do with that. I haven't messed with it much.

## Template Refs _in_ components

The other powerful way you can use template refs, is grabbing template elements inside of your component. Using [`ViewChild`](https://angular.io/api/core/ViewChild) you can grab an [`ElementRef`](https://angular.io/api/core/ElementRef) using your template ref. This lets you do some cool things.

```js
import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "my-app",
  template:
    '<input type="email" #email><button (click)="clickButton()">Click</button>'
})
export class AppComponent {
  @ViewChild("email") emailInput: ElementRef;

  clickButton() {
    console.log(this.emailInput.nativeElement.value);
  }
}
```

I'll write about this more when I write about `ng-template` and `ng-container`. Stay tuned!

## A Couple More Things About Template Refs

Template refs need to be unique. You can't have two inputs with the ref `#email` in the same template.

---

`ref-input` is a alternate way of doing `#input`.

```html
<input type="email" #email />
```

and

```html
<input type="email" ref-email />
```

are equivalent.

---

I've tried doing something like

```html
<input type="text" #input />
<p>{{input.value}}</p>
```

In hopes of it printing out the value of the input as you type. It doesn't seem to work. You can add `change` to the input and that will show the value, not as you type, but on blur.

```html
<input type="text" (change)="true" #input />
<p>{{input.value}}</p>
```

Won't lie, don't really understand what's going on here. But adding `(change)="true"` triggers change detection.

---

## Conclusion

This is the conclusion of this article. Hit me up on [Twitter](https://twitter.com/samwarnick) if you have any questions or comments.
