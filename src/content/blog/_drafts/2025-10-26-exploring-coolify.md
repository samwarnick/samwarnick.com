---
title: Exploring Coolify
date: '2025-10-26'
published: false
---

Like so many of my sudden deep dives, this is Carter’s fault.

One of the [frustrations I recently expressed](https://samwarnick.com/blog/i-almost-feel-like-doing-something/) is the difficulty I have in choosing how to host projects. I think I over-index on free. Carter said “you should learn Coolify with me.” 

I had come across [Coolify](https://coolify.io) about a year ago. It markets itself as a self-hostable alternative to Netlify and other services. I use Netlify to build and host this blog. I’m not totally new to self-hosting. I have a Synology in my closet that I use and have used for a myriad of apps. My current process is pretty much a GitHub action that creates a Docker image, creating a container with Portainer, and then triggering a Watchtower webhook from a GitHub action to have automatic deploys. It works decently well, but requires a bit of manual setup. Coolify seems like it could make things marginally more simple.

I was interested and impulse bought a Beelink EQ14 Mini PC with an Intel N150, 16GB of RAM, and 500GB of storage.

Regretting my impulse buy a bit, I decided that I should first try to get everything working in a VM. Synology can run VMs, so I installed Ubuntu Server on one. Ubuntu setup has a cool step where it pulls your public keys from GitHub, so I was able to SSH into the VM very quickly and easily.

Installing Coolify is a simple one line command…that then runs a bazillion scripts. TBH, I don’t totally know what it’s doing and it needs root access. Probably fine. But I had no issues getting it setup and creating a user. At this point, I was able to access everything through the VMs private IP address.

Now to get some apps running.

The first app I got running was my budget app. It is already setup for Docker, so I connected the GitHub repo, deployed, realized I needed to add some persistent storage, deployed again, fixed some bugs in the app because I made some bad assumptions about the database, deployed again, and then I could load the app! Not too bad. For me, the hardest part of Docker is connecting volumes and directories and stuff. I wish Coolify had a file picker or something to select directories instead of just typing strings. Feels error prone.

Next up was an Eleventy site. Netlify just kinda magically builds and deploys statically generated sites, and Coolify touts itself as a replacement for Netlify. I wasn’t totally sure how to do this. When you add a project, you select a build pack—Nixpacks, static, Docker, or Docker compose. For something like Eleventy, you might think “static” is what you want. Wrong. Static is for a project that is already built. Like you already have the index.html and whatever else. Nixpacks turns out to be the correct answer. I’m not totally sure what Nixpacks is, but it does something similar to Netlify. It detects what type of project you have and runs install, build, and start automatically. So since I have a `package-lock.json` and a `package.json` with a `build` script, it just knew to use Nodejs and run `build`. Pretty cool. Supports a bunch of other languages and runtimes and stuff. The other important part was to check a box telling Nixpacks that this is a static site, and that the files are in `_site`. After it builds, it copies those files and throws them behind an Nginx server. Boom. Static site generated with Eleventy.

We’re cooking now. But how do I get to these apps and sites through the internet? Cloudflare Tunnels. One thing I wanted was to avoid manually setting up a new domain for every project. I wanted subdomains to automatically work. Turns out, Coolify has [a guide on exactly how to do this with Cloudflare Tunnels](https://coolify.io/docs/knowledge-base/cloudflare/tunnels/all-resource). I will spare you all the gory details, but I ran into a lot of issues. My issues were because I had two instances of cloduflared running—one on my Synology through Docker, and another one through Coolify. I shutdown the one on my Synology and everything started working. Really my fault for not really understanding tunnels. But, I followed Coolify’s guide and now have a wildcard entry in the Tunnels and DNS record. I can add a new app with a new subdomain, and Coolify’s proxy server will proxy to the correct app. The internet. Incredible.

Up until now, I was manually redeploying whenever I made changes to an app. I saw that similarly to Watchtower, I could setup a webhook to trigger deploys from GitHub. A fine solution, but I wanted something that required less setup. Turns out Coolify has an answer to this too. They have a little tool/wizard that helps you create a GitHub app that links your Coolify instance with your GitHub. When you setup a resource to use the GitHub app as the source instead of the repo URL or something, it will automatically redeploy on new commits without any additional setup. I had to go back to previous apps and change the source, but that was simple. Pretty slick. I’m not sure if they have plans to support similar connections with GitLab, Gitea, or other providers.

Overall, I’m pretty excited by all this. There’s a lot that could be improved. The UI/UX overall is fine, but requires a lot of clicks. It took me a few tries to realize I needed to select “Private Repository (with GitHub App)” to actually use the app on new resources. Would be cool if Nixpacks builds could choose to use Caddy instead of Nginx. I find Caddy more friendly.

So I have a Synology with a Ubuntu VM running Coolify accessible through Cloudflare Tunnels. Do I even need that mini PC? I’m not sure! Haven’t returned it yet.

But it’s got me thinking. Could I replace using Netlify for this blog? Should I?