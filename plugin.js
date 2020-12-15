const fs = require("fs");
const path = require("path");
const RSS = require("rss");

class MyPlugin {
    static defaultOptions() {
        return {
            option: "value",
        };
    }

    constructor(api, options) {
        api.afterBuild(async ({ queue, config }) => {
            const feedOptions = {
                title: "Sam Warnick Blog Feed",
                description:
                    "A blog about things a stuff. Often related to programming.",
                copyright: `Copyright 2016–${new Date().getFullYear()} Sam Warnick`,
                image_url:
                    "https://res.cloudinary.com/verygoodfm/image/upload/c_fill,f_auto,g_face,h_600,w_600/v1544745118/samwarnick.com/profile.jpg",
                favicon: "https://samwarnick.com/favicon.png",
                feed_url: "https://samwarnick.com/feed.xml",
                site_url: "https://samwarnick.com",
                generator: "My own Gridsome plugin",
            };

            const filename = path.join(config.outputDir, "feed.xml");

            const feedItems = queue
                .map((queue) => {
                    const data = fs.readFileSync(queue.dataOutput, "utf8");
                    return JSON.parse(data).data;
                })
                .filter((data) => {
                    return data && !!data.post;
                })
                .map((data) => {
                    return data.post;
                })
                .sort((nodeA, nodeB) => {
                    return (
                        new Date(nodeB["date"]).getTime() -
                        new Date(nodeA["date"]).getTime()
                    );
                });

            console.log(`Generate ${"feed.xml"} (${feedItems.length} items)`);

            const feed = new RSS(feedOptions);
            feedItems.forEach((post) => {
                feed.item({
                    title: post.title,
                    url: `https://samwarnick.com${post.path}`,
                    guid: `https://samwarnick.com${post.path}`,
                    date: post.date,
                    description: post.description,
                    custom_elements: [
                        {
                            "content:encoded": {
                                _cdata: post.content,
                            },
                        },
                    ],
                });
            });

            fs.writeFileSync(filename, feed.xml());
        });
    }
}

module.exports = MyPlugin;
