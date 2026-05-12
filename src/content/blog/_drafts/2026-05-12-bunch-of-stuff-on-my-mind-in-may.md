---
title: Bunch of Stuff on My Mind in May
date: '2026-05-12'
published: false
---

I had a few things I wanted to write about. Decided to throw them into a single post instead of blasting them all out at once. So here's a few random things I've been up to and thinking about.

## Experimenting with local LLMs

Like a lot of people, I'm fairly confident AI companies are going to start ratcheting up costs pretty soon. Just as something to do, I've been playing with local models. When [Gemma 4](https://deepmind.google/models/gemma/gemma-4/) from Google came out, it really piqued my interest and I wanted to learn about running them locally. Take everything about to say with a grain of salt. I am a novice.

Right now, I mostly use [gemma-4-26b-a4b-it-mlx-8bit](https://huggingface.co/lmstudio-community/gemma-4-26B-A4B-it-MLX-8bit) with [LM Studio](https://lmstudio.ai). Let me try and decipher that. `gemma-4` is the model family. `26b` is the number of parameters. In this case, 26 billion. I think higher generally means more capable, but takes more memory. `a4b` means it only loads 4 billion parameters at once. This makes it faster. `it` means that it was trained to talk with me. Stands for instruction tuned. `mlx` is an Apple framework to help run models better on Apple Silicon. `8bit` means the model weights use smaller, but less precise, 8-bit numbers instead of larger 16-bit numbers. From my understanding, 8-bit is a great place to be. You save a lot of memory, but are not losing much precision compared to something like 4-bit. The model is 28 GB. That gives me plenty of memory left over to actually use stuff with it. I tried other models like Qwen 3.6, but nothing else works quite as well as Gemma 4 for me.

I have an M1 Max with 64 GB of memory, which is surprisingly capable for a nearly 5 year old chip. The main bottleneck is memory bandwidth. This means models are slow to start, taking longer to process the context. But LM Studio is decent at caching tokens. This means that subsequent messages are usually faster to get a response. I get about 205 tokens/s when loading the context and about 24 tokens/s when generating responses.

I tried a newer server called [oMLX](https://omlx.ai). I think it has a lot of promise. Its main selling point is that it save token caches to disk and can reuse it more quickly. I've seen the cache get cleared out with LM Studio a lot. The Gemma 4 model Tool use seems to work better with LM Studio than oMLX though. I assume that is because it came from the LM Studio community.

The main use case I want is to be able to ask questions about my code. I've been using [OpenCode](https://opencode.ai) for this. I like it because I can start it from the terminal in one of my repos then ask questions. OpenCode really wants to write code though. I've tried limiting its permissions and tool access, but it still always asks if I want it to make changes. Maybe some more tweaks I can do. But I find it useful for this kind of work. OpenCode might be heavy for it, but maybe easier than using something like [Repomix](https://repomix.com).

As an experiment though, I did have Gemma 4 migrate an app of mine from [Perfect Stack](https://samwarnick.com/blog/the-perfect-stack/) to SvelteKit. It did not do great, but not terribly either. Initial attempt took 35 mins and it didn't run. Then there was a lot of back and forth. Finally got it running after about an hour total. I'm partially to blame because I said to keep using bun when it should've just used node. Possible, but not something I'm going to do regularly.

All this to say, it's surprisingly usable. I would be interested in seeing how all this runs on new Apple chips. It's just kind of a fun thing to experiment with, but it interests me because it is more private and I can run it offline.

## Project Statuses

I went through all my projects to get a feel where things are at. Everything is kinda…stable. And that is a bit unsettling. There's a few things I _could_ do. But don't really need to do.

### [samwarnick.com](https://samwarnick.com)

- Things are working.

### [lilyandsam.show](https://lilyandsam.show)

- Things are working.

### [ScreenCred](https://screencred.app)

- I think it's working.
- Should probably move the share button. Gets covered by iOS sometimes.

### What's for Dinner?

- My wife hasn't complained about it.
- The database crashed last week. I'll see if that happens again.

### Perfect Finances

- I could migrate it from Perfect Stack to SvelteKit.

### [Deploybot 3000](https://samwarnick.com/blog/i-built-my-own-coolify-replacement-that-i-might-not-use/)

- Does everything I need it to.

### Homelab

- I could automate a step to update an internal proxy. Not urgent.

### Secret Project

- Finish. But it works as is.

Nothing is screaming at me. Stuff is just working. I don't see any glaring omissions. I don't know. I'm self-hosting everything and it seems about as stable as anything else. It's boring[^1].

There's a couple other ideas I kinda have:

- A web component for my /random instead of a redirect. Would make hosting easier.
- A lightweight replacement for Netlify. Simple static file host with a nice CLI. Would probably have routing, forms, and functions too. I don't know.
- Something like OpenCode but made for exactly what I want—exploring and asking questions about my code. No editing. Leave that to the humans.

But none of those are super urgent or incredibly interesting to me right now. The code explorer is closest to something I would do.

## Self-hosting backup plan

Related, I keep in the back of my mind a plan of what I'd do if I needed to stop self-hosting for some reason. It's a pretty boring plan—move everything to Cloudflare. ScreenCred is the only one I might move to something like Railway, just because of [OG Image generation](https://samwarnick.com/blog/i-just-want-to-generate-an-og-image/). But I'd like to keep as much in one place as possible. I would try Cloudflare zero trust to make certain apps private.

---

There it is. That's what I've been thinking about this month.

[^1]: I just cursed myself.