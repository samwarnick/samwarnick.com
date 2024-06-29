---
title: Is Vanilla JavaScript better?
date: '2023-06-05T10:00'
oldUrl: 'https://samwarnick.com/2023/6/is-vanilla-javascript-better'
published: true
---

The other day, I made a little [calculator](https://frosthaven-calc.netlify.app) for my brother's Frosthaven group. To make it simple, I just did an index.html with some pure, vanilla JavaScript. You can find the code on [GitHub](https://github.com/samwarnick/frosthaven-calc).

I've been working with JavaScript frameworks like Angular and Vue for what feels like a real long time now. So I'm not a Vanilla JS wizard. There may be better ways to do what I'm doing. I was just trying to get something done quick. This setup was simple to get going since it is just some files with no build step. But it got me thinking, is it better? I'm not so sure.

Vanilla JS is very declarative. While it's nice to see exactly what it's doing, I'm not so sure that's easier for a beginner to reason about. And maybe I'm mostly thinking about the rendering logic. The business logic is going to be pretty much the same, but when it comes to displaying data on the page, I think frameworks have a clear advantage.

I'm sure it's subjective, but I think this:

```html
<table id="costsTable" aria-label="Enhancement Costs" role="grid">
    <thead>
        <tr>
            <th scope="col">Enhancement</th>
            <th scope="col">Cost</th>
        </tr>
    </thead>
    <tbody id="costsBody">
	    <tr *ngFor="let enhancement of costs">
		    <td>
			    <img [src]="enhancement.icon">
			    {{ ehancement.label }}
		    </td>
		    <td>{{ ehancement.cost }} gold</td
	    </tr>
    </tbody>
</table>
```

Is a lot easier to follow than:

```js
const table = document.getElementById("costsTable");
table.removeChild(document.getElementById("costsBody"));

const body = document.createElement("tbody");
body.id = "costsBody";

costs.forEach(({ label, cost, id, icon }) => {
	const iconEl = document.createElement("img");
	iconEl.src = `/assets/img/${icon ?? id}.png`;
	iconEl.alt = `Frosthaven icon for ${label}`;
	iconEl.setAttribute("aria-hidden", true);
	iconEl.classList.add("enhancementIcon");

	const labelEl = document.createElement("span");
	labelEl.textContent = label;

	const enhancementCell = document.createElement("th");
	enhancementCell.setAttribute("scope", "row");
	enhancementCell.appendChild(iconEl);
	enhancementCell.appendChild(labelEl);

	const costCell = document.createElement("td");
	costCell.textContent = `${cost} gold`;
	costCell.classList.add("costCell");

	const row = document.createElement("tr");
	row.appendChild(enhancementCell);
	row.appendChild(costCell);

	body.appendChild(row);
});

table.appendChild(body);
```

It makes sense to me to keep template/rendering in the HTML.

I think it's important to understand how to do things in vanilla JS. And there is a lot to be said for the simplicity of getting it setup. I guess completely unique and new idea is that good frameworks provide levels of abstraction that actually make it easier for people to understand the code. You add some complexity on the build side for a better developer experience. Probably worth it.

Maybe I need to try [Alpine.js](https://alpinejs.dev) to get around the build issue...
