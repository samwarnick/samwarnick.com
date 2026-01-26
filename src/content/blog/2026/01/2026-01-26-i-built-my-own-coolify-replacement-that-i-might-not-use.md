---
title: I Built My Own Coolify Replacement That I Might Not Use
date: '2026-01-26T15:38'
published: true
summary: 'I built Deploybot-3000 to replace Coolify, but is it worth my sanity.'
tags:
  - Projects
  - Self-hosting
---
If everything goes well, you will be able to read this post shortly after I commit it. If it doesn't, well, you probably won't know it didn't work.

I replaced Coolify.

As I've been doing more with Terraform and Ansible, I wanted a way to define which apps to run where with a simple file. With Coolify, everything is done through the UI. That introduces room for errors. They do have an API, but that's not exactly what I wanted. Coolify also does not back up volumes. So I built what I wanted.

## Deploybot-3000

To do exactly what I want, I built `deploybot-3000`, a bun app that I install on a server. It handles the rest:

- Reads a config file from a specified git repo.
- Adds, removes, or updates apps as needed.
- Adds itself as a webhook to the app repo to receive updates.
- Configures Caddy as a reverse proxy for apps and a file server for static sites.
- Builds the app's Docker image and runs it with a Docker compose file, or builds and outputs the static site.
- Automatically rolls back to the previous working image if health checks fail.
- Backs up databases and mounted volumes.

It does what I want[^1].

It's built to be somewhat agnostic. It will ensure the proxy server and apps are running. How you access the apps and handle certificates for HTTPS is up to you. I mostly use Cloudflare tunnels[^2]. Without getting into the gory details, Terraform generates the app config file for me and configures the Cloudflare tunnel with the necessary domains. Ansible makes sure the VM has `deploybot-3000` and the Cloudflare tunnel installed and running. But, everything is configured as code. I really like this. I can see in one repo how everything is set up. Domains, ports, VMs, etc.

The config looks like this:

```yml
blog:
  repo: https://github.com/samwarnick/samwarnick.com
  domain: samwarnick.com
  static: true
lilyandsamshow:
  repo: https://github.com/samwarnick/lilyandsam.show
  domain: lilyandsam.show
  static: true
screencred:
  repo: https://github.com/samwarnick/ScreenCred-Web
  domain: screencred.app
```

`deploybot-3000` reads that and does its magic[^3].

It is in no way ready for prime time, but I'm excited by it. There's about a thousand ways it needs to be improved, and I'm sure it will break in new and exciting ways on every app change. But that didn't stop me from switching all my stuff over from Coolify and shutting down my Coolify VMs. At the moment, I have two instances running—public and internal. Between them are three apps and two Eleventy blogs. I think they even work.

## But I might not use it

This project has consumed me. I would be kept up at night thinking about how to solve different problems, make different features more elegant, or how to implement something. It drives me crazy. Like my brain hurts.

I can do this. I've proved it to myself. It's kinda neat even. But this fixation of mine of trying to host everything myself is really starting to feel like it is going to cost me my sanity. The rational solution would be to use the myriad of solutions out there—Netlify, Railway, Fly, etc. Pick the right tool for the right job. Static sites on Netlify. Apps on Railway. IDK.

I need to take a few moments to take some deep breaths and figure this out. It's dumb and doesn't really matter but my brain disagrees.

[^1]: Mostly.
[^2]: I also have a new shiny internal proxy that Terraform and Ansible also configure that handles domains for all my internal apps. It uses DNS-01 for certificates since the domains are not publicly accessible.
[^3]: By magic, I mean predefined processes. I told it what to do.
