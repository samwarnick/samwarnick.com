---
title: Generating my /todo page
date: 2024-07-02T13:15
summary: How I display issues from a GitHub repo on my Eleventy blog.
tags:
  - Eleventy
  - Blog
published: true
---
I had an idea to add a [/todo](/todo) page to my site. Initially, it started as a markdown file. But I had an idea to make it more complicated and generate the page from open issues on my repo.

Eleventy lets you add [global data files](https://www.11ty.dev/docs/data-global/). I've never used these, but seemed to be the right solution.

Using GitHub's [octokit.js](https://github.com/octokit/octokit.js) it was straightforward to pull the issues from my repo.

`_data/githubIssues.js`:

```js
import { Octokit } from "@octokit/core";

export default async function () {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: "samwarnick",
        repo: "samwarnick.com",
        headers: {
            "X-GitHub-Api-Version": "2022-11-28",
        },
    });
    return data;
}
```

And since it's JS and not TS I didn't have to make a type for the response! I could just grab what I needed in the template! Who knew.

```jinja
{%- raw -%}
<ul>
    {%- for issue in githubIssues -%}
    <li><a href="{{issue.html_url}}">{{issue.title}}</a></li>
    {%- endfor -%}
</ul>
{%- endow %-}
```