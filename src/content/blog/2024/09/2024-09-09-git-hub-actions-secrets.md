---
title: GitHub Actions Secrets
date: 2024-09-09T10:10
summary: What even are GitHub Actions?
tags:
  - GitHub Actions
published: true
---

> [!WARNING]
> I am a GitHub Actions noob. They confuse and scare me.

I have a GitHub action that runs on a cron schedule to rebuild my site once a day. This is mostly to make sure my [TODO](/todo) page gets updated from the latest issues. But it could have other uses in the future.

I made a noob mistake and left my Netlify webhook in plain text in the action definition. I caught it before anyone could abuse it and make run out of build minutes or whatever. I deleted the old webhook and created a new one. Figured I should move it into a secret.

Secret seemed to be the right choice here because GitHub will obfuscate secrets in logs, but variables will be logged as plain text. It wasn't until later that I realized you need to be logged in to see logs anyway. So in reality, secrets and variables would work the same for me.

I created a new environment and added the secret to that. Off to a good start.

The job failed. And failed again. And again. I could not figure out why it was not picking up the secrets! I tried so many things and syntaxes and properties. Nothing I tried would get the job to pickup the secrets.

Turns out, there are 2 buckets of secrets or variables—Repository and Environment.

I needed to define an environment for my job:

```yml
jobs:
  build:
    name: Request Netlify Webhook
    runs-on: ubuntu-latest
    environment: samwarnick.com // [!code focus]
    steps:
      - name: Curl request
        run: curl -X POST -d {} ${{ secrets.NETLIFY_HOOK }}
```

Then it worked! Hallelujah.

After realizing my mistake, I deleted the environment and moved the secret to be a repository secret. This simplifies things.
