---
title: Securing My Private Apps With Tailscale
date: '2025-12-15T12:54'
published: true
summary: >-
  I finally got Tailscale working with my homelab to secure my personal apps
  behind a VPN.
tags:
  - Self-hosting
  - Synology
---
I'm making some upgrades to my homelab. In preparation, I've been doing some spring cleaning and getting things in order. One item on my list was putting some apps behind a VPN. TBH, I don't totally understand VPNs. Like a year ago, I tried installing Tailscale on my Synology and using it to have all my DNS go through my AdGuard instance. I don't totally remember why, but it didn't go well. I decided to take another crack at it.

I made a budget app for my wife and I. It was accessible to the Internet at `budget.mydomain.com` through a Cloudflare tunnel. It has authentication, but I'm not 100% confident in it. So it always made me a little nervous having it exposed like that. With Coolify and Cloudflare, I had all subdomains pointed at my Coolify instance. First step was removing that. Now it was inaccessible. Then, I added `*.mydomain.com` to AdGuard with a DNS rewrite to point to my Coolify IP. Now, on my local network—which uses AdGuard for DNS—`budget.mydomain.com` would work! But, we actually use this app most when we are out and about. This is where Tailscale comes in.

I didn't want all traffic to go through Tailscale, just `mydomain.com` addresses. With Tailscale—and I'm sure most VPNs—I added a split DNS. Basically, I told it, if it's a `mydomain.com` address, use my Synology for DNS. Since AdGuard is already setup to rewrite to the Coolify IP, it should work.

In a step I don't totally understand, I needed to configure a subnet in the Tailscale app on my Synology. My Synology is at `192.168.1.2`, and my Coolify VM is at `192.168.1.3`. I needed to expose `192.168.1.0/24`. This gave Tailscale access to the VM too I guess. Really, everything on `192.168.1.x`.

The end result is that, when connected to Tailscale, I can hit `budget.mydomain.com` wherever I am!

I thought I was going to have issues with HTTPS, but Coolify seems to generate certificates automatically with Let's Encrypt and Traefik. The one issue I had was with the realtime service. When I first setup Coolify to be accessible through Cloudflare Tunnels, I had to add an environment variable in the Coolify .env. Something like `PUSHER_HOST=realtime.mydomain.com`, and add that to my tunnel config. I undid that and restarted Coolify, but Coolify kept warning me that it could not connect to the realtime service and websockets were not working. I looked in the container and sure enough, it still had `PUSHER_HOST=realtime.mydomain.com`, even after removing and restarting. I tried a lot, but ultimately, I had to stop all the Coolify docker containers, remove them, and reinstall.

```bash
sudo docker stop -t 0 coolify coolify-realtime coolify-db coolify-redis coolify-proxy coolify-sentinel
sudo docker rm coolify coolify-realtime coolify-db coolify-redis coolify-proxy coolify-sentinel

curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

Now, it was using the correct URL for the realtime service. I don't know if this is the best way to handle this, but it worked.

The other oddity was that `budget.mydomain.com` worked in Safari, but not Chrome or Firefox. On or off Tailscale. I thought I was hallucinating it working in Safari or something. You know what it was? I had not given Chrome or Firefox permission in macOS to access the local network. Since AdGuard was redirecting to a local IP, it needed that permission.

Phew. Got it all worked out. I hope. I think.

Anyway, I got my wife setup on Tailscale in like two minutes. It was surprisingly simple. But I told her that if it caused issues at all, I'll figure something else out. But this feels like a big step in my homelab journey.
