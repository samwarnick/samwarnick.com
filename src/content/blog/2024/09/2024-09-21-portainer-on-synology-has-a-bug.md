---
title: Portainer on Synology Has a Bug
date: '2024-09-21T13:31'
summary: >-
  I'm using Portainer on my Synology, but a bug has me questioning why I even
  need it.
tags: []
published: false
---
I've been using [Portainer](https://www.portainer.io) on my Synology to handle Docker stuff. The internet said I should, so I did. It has a decent enough UI and seems easier to use than the built in container stuff on Synology. But honestly, I don't know enough to know what I'm getting.

Turns out Portainer has a bug. You [can't update environment variables](https://github.com/portainer/portainer/issues/5813) when it's running on Synology DSM7. Kinda a big deal. I needed to update a token for one of my containers and was so confused when it was still showing the old token after restart.

The work around is to just update the environment variable using the built in Container Manager to DSM7. Which makes me wonder why I'm even using Portainer. Maybe there's something about it handling Docker Compose better? IDK. Again, my personal infrastructure is the equivalent of throwing spaghetti at the wall.
