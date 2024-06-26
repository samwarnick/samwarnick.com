---
title: Adventures with Templater for Obsidian
date: '2022-02-24T10:00'
oldUrl: 'https://samwarnick.com/2022/2/adventures-with-templater-for-obsidian'
---

I've been experimenting more with how I can handle managing my small side projects in Obsidian. More on that another time, but one piece I wanted was the ability to quickly and easily scaffold out a new project—which for me is multiple directories with some default notes.

I found that [Templater](https://silentvoid13.github.io/Templater/introduction.html) can run scripts when the file is created. This [post](http://www.macdrifter.com/2021/08/obsidian-templater-fun.html) was very helpful in getting me started, and helping me understand what might be possible. I was able to make a script that will create multiple folders and notes at once. Since Templater's `move` and `create_new` functions cannot handle missing folders in a path, I needed to find a way to create folders. Luckily the Obsidian `app` is exposed and there is an API for that[^1].

Here's the final script in my template file:

```js
<%*
 let projectName = await tp.system.prompt("Project Name")
 let projectPath = `Projects/${projectName}`
 let tasksPath = `Projects/${projectName}/Tasks`
 await app.vault.createFolder(projectPath)
 await app.vault.createFolder(tasksPath)
 let tasksFolder = app.vault.getAbstractFileByPath(tasksPath)

 await tp.file.move(`${projectPath}/${projectName}`)
 let tasksTemplate = await tp.file.find_tfile("Project Tasks (Template)")
 let tasks = tp.file.create_new(tasksTemplate, "Tasks", false, tasksFolder)
-%>
```

Here's how it works:
1. I run the `Templater: Create new note from template` command and select my new project template.
1. New note created.
2. Asks for project name.
3. Creates necessary folders.
4. Moves new note to `/Projects/Project Name`, and renames it.
5. Creates a new tasks note in `/Projects/Project Name/Tasks`.

In short, the newly created note creates a new home for itself and moves itself in.

There might be an easier way to do this, but this seems like a pretty good way to start off. Templater seems pretty powerful and I'm going to keep looking into it and see how it can help in other areas.

[^1]: There is a [request](https://github.com/SilentVoid13/Templater/issues/442) to add this functionality into Templater itself.
