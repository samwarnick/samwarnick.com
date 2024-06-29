---
title: My Photography Workflow
date: '2022-02-20T10:00'
oldUrl: 'https://samwarnick.com/2022/2/my-photography-workflow'
---

I'm a casual photographer; hobbyist at best. A little over a year ago, in preparation for our second daughter arriving, I got a Sony A7C. I wanted a nice camera that wasn't too big, and that I knew could take better photos than my iPhone. The A7C fits the bill perfectly in my opinion. The [lens it comes with](https://www.bhphotovideo.com/c/product/1592780-REG/sony_fe_28_60mm_f_4_5_6_lens.html) feels impossibly small, which is great when I need to save space. I have since upgraded to a [Sony FE 24–70 mm f/2.8 GM](https://www.bhphotovideo.com/c/product/1222774-REG/sony_sel2470gm_fe_24_70mm_f_2_8_gm.html?sts=pi&pim=Y). It's more than I need, and is much, _much_ larger, but I'm loving it.

I take a few hundred photos a month on the A7C. This isn’t a ton, but I still don’t want all the photos I take on my nice camera to bloat my iCloud Photos Library—most shots I get are not that good. I also want to make sure I have plenty of backups. After consuming dozens of YouTube videos and articles about photography workflows, I've come up with the following (somewhat simple) workflow that has served me quite well over the last year or so.

## 1. Take photo on camera
I shoot in RAW.

## 2. Import all photos into [Lightroom](https://www.adobe.com/products/photoshop-lightroom.html)
I have the Creative Cloud version. It's fine. I don't love having to use their cloud service to store the photos. I've tried [Lightroom Classic](https://www.adobe.com/products/photoshop-lightroom-classic.html) and [RAW Power](https://www.gentlemencoders.com/raw-power-for-macos/index.html), which both support local libraries, but I've found the interface in CC to work best for me. I might reconsider when I run out of cloud storage.

I tried keeping the Lightroom library on my Synology, but it really slowed imports down. For now, I have plenty of room on my MacBook Pro, and I'm keeping as much local as I can.

## 3. Flag photos as picked and rejected
This is one feature I quite like about Lightroom. As soon as I import photos, I go through them and flag the ones I want to edit and reject the ones that are obviously out of focus. The rest stay around mostly for good measure. I delete the rejected ones every few months—I go through them once more to make sure I didn't make any mistakes.

## 4. Edit
I'm still learning about editing. I have a preset (based on a preset that came with Lightroom that I found pleasing) that does some small adjustments. I apply that to most photos and spend special attention to ones I especially like. I try to edit the photos when I import them, otherwise, I'll procrastinate, and perhaps never edit them.

## 5. Export and Backup
I only export the edited photos. I export them to a folder on my MacBook as full-sized JPEGs at 100% quality. I then have a [Hazel](https://www.noodlesoft.com) rule that watches that folder and does two things:

1. It imports the exported photos into my iCloud Photos library.
2. It moves them my Synology, sorting them automatically into folders based on the year and month they were taken[^1].

Now I have a copy of the edited photo in iCloud, and my Synology (which also backs up to Backblaze.) The RAW file remains in Lightroom, in their cloud. Right now, I have enough space on my laptop for there to also be another copy of the RAW file locally—which gets backed up to Time Machine and Backblaze as well. Long term, I'm not sure how to handle backups of the RAW files. Still looking into that.

----

That's it. The key points for me are editing at the same time I import, and being able to automatically import and backup my favorite shots with Hazel. I like keeping my iCloud and Lightroom libraries  separate, and only adding my favorites from my good camera to iCloud—which is where I view them and share from. This process has been working pretty solidly (except for when my MacBook decides to not be connected to the Synology,) but I’m sure I’ll find something to change eventually, because that’s what I do—“fix” things that aren’t broken.

[^1]: I have [Synology Photos](https://www.synology.com/en-global/DSM70/SynologyPhotos) pointed at the directory, but I rarely use it. I mainly setup because I could.
