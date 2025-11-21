---
title: 'confetti-drop: A Web Component'
date: '2025-11-19T14:55'
published: true
summary: >-
  I turned my Svelte confetti component into a web component and published my
  first npm package.
tags:
  - Web Components
---
While making [Hannah's Game](https://hannahsgame.samwarnick.com), I made a Svelte confetti component. I wanted something similar in another project that was not Svelte. So I decided to turn it into a web component.

I was hanging out on Mastodon when I saw [a post from Zach Leatherman](https://fediverse.zachleat.com/@zachleat/115548578306298427) about an update to a web component of his. I opened up the GitHub repo and I was inspired by its simplicity—a single JS file and a super simple npm package. I did not know npm packages could be just a file lol. I've never published an npm package before. I decided to give it a shot.

I migrated the component from Svelte to a vanilla web component. I spent some time cleaning up the API and trying it out on my own blog. It was not long before I was happy enough to publish it. Created an npm account, signed in with the cli, and ran `npm publish`. Tada! [`@samwarnick/confetti-drop`](https://www.npmjs.com/package/@samwarnick/confetti-drop) is live. Install:

```bash
npm install @samwarnick/confetti-drop
```

For my projects, I generally just copy the JS file and use a script tag:

```html
<script type="module" src="/assets/js/confetti-drop.js"></script>
```

Here's a small demo using Zach Leatherman's [`browser-window`](https://github.com/zachleat/browser-window) component:

<browser-window flush style="width: 100%; max-width: 400px; margin-inline: auto">
  <div style="position: relative; width: 100%; aspect-ratio: 1; background: white;">
    <confetti-drop autostart></confetti-drop>
  </div>
</browser-window>
<script>
  customElements.whenDefined('confetti-drop').then(() => {
    const fall = document.getElementById("fall");
    const toggle = document.getElementById("fall-toggle");
    fall.stop();
    toggle.checked = false;
  });
</script>

Check out [the code on GitHub](https://github.com/samwarnick/confetti-drop).
