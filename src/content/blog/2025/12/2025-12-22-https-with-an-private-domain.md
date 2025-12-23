---
title: HTTPS With an Private Domain
date: '2025-12-22T19:54'
published: true
summary: >-
  I figured out how to get Let's Encrypt certificates working for my self-hosted
  apps behind Tailscale by switching from HTTP to DNS verification.
tags:
  - Self-hosting
---
You may remember that I've moved some sites and apps that I self-host to only be accessible when connected to my tailnet. Things were working pretty well, and even with HTTPS! Or so I thought. I was working on adding a couple subdomains to proxy to services on my Synology. I eventually got those proxying correctly by using a dynamic config in Coolify. Something like:

```yaml
http:
  routers:
    castle-http:
      entryPoints:
        - http
      service: adguard-service
      rule: Host(`adguard.my-domain.com`)
      middlewares:
        - redirect-to-https
    castle-https:
      entryPoints:
        - https
      service: adguard-service
      rule: Host(`adguard.my-domain.com`)
      tls:
        certresolver: letsencrypt

  services:
    adguard-service:
      loadBalancer:
        servers:
          - url: http://192.168.1.2:9080

  middlewares:
    redirect-to-https:
      redirectscheme:
        scheme: https
```

(I do not understand Traefik)

However, my browser was complaining about it "not being safe and trying to steal information." I could have used HTTP instead of HTTPS, or just said "Yeah, I can steal from myself. Move along." I wanted to solve this. It was strange because a couple subdomains _did_ work with HTTPS, but not new ones.

Turns out, I have no idea how Let's Encrypt works. Traefik/Let's Encrypt had generated certificates for a couple subdomains while the domain was publicly accessible through a Cloudflare tunnel. The default Traefik config on Coolify configures Let's Encrypt to use HTTP verification. This basically creates a verification file on your server that Let's Encrypt then accesses. This does not work if your server is not publicly accessible. The other option is DNS verification. This method involves adding a DNS record that Let's Encrypt verifies against. This can be added manually, but would need to be updated every 90 days. Through Traefik, you can configure Let's Encrypt to use DNS verification and also use an API to update your DNS records for you. I use Cloudflare for my DNS, so I added `CF_DNS_API_TOKEN=my-token`[^1] as an environment variable and configured Let's Encrypt to use DNS challenge instead of HTTP.

```yaml
- 'certificatesresolvers.letsencrypt.acme.dnschallenge=true'
- '--certificatesresolvers.letsencrypt.acme.dnschallenge.provider=cloudflare'
- '--certificatesresolvers.letsencrypt.acme.dnschallenge.delaybeforecheck=30'
```

I also added an `A` record to point my root to some IP like `192.168.1.1` and a `CNAME` wildcard to point to my root. I believe this is necessary for the verification. Let's Encrypt wants to see an `A` record, but what it points to doesn't actually matter.

With this in place, I restarted the proxy, and it was able to generate certificates! No more failures in the logs. And, it actually worked. The browser was no longer yelling at me.

Huge shout out to [Wolfgang's Channel](https://youtu.be/qlcVx-k-02E?si=Q7WLPlbIsJ7U7727)'s video on the subject. It got me pointed in the right direction.

[^1]: Traefik uses Lego under the hood for this. [Their docs](https://go-acme.github.io/lego/dns/) show all the possible providers and what the environment variable should be.
