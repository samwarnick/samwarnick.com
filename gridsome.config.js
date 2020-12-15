// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwind = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");
const marked = require("marked");
const MyPlugin = require("./plugin");

const postcssPlugins = [tailwind(), autoprefixer()];

if (process.env.NODE_ENV === "production")
    postcssPlugins.push(
        purgecss({
            content: ["./src/**/*.vue", "./_content/**/*.md"],
            whitelist: [
                "body",
                "html",
                "img",
                "a",
                "p",
                "g-image",
                "g-image--lazy",
                "g-image--loaded",
                "svg-inline--fa",
                "fa-primary",
                "fa-secondary",
                "fa-swap-opacity",
            ],
            whitelistPatterns: [/fa-$/],
            extractors: [
                {
                    extractor: (content) =>
                        content.match(/[A-Za-z0-9-_:#/]+/g) || [],
                    extensions: ["vue", "md"],
                },
            ],
        }),
    );

module.exports = {
    siteName: "Sam Warnick",
    siteUrl: "https://samwarnick.com",
    templates: {
        Post: "/posts/:title",
        Tag: "/posts/tags/:id",
        Category: "/posts/categories/:id",
        Project: "/projects/:name",
    },
    plugins: [
        {
            use: "@gridsome/plugin-google-analytics",
            options: {
                id: "UA-131092224-1",
            },
        },
        {
            use: "@gridsome/source-filesystem",
            options: {
                path: "_content/posts/**/*.md",
                typeName: "Post",
                refs: {
                    // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
                    tags: {
                        typeName: "Tag",
                        create: true,
                    },
                    categories: {
                        typeName: "Category",
                        create: true,
                    },
                },
                remark: {
                    plugins: [
                        "@gridsome/remark-prismjs",
                        ["remark-behead", { after: 0, depth: 1 }],
                    ],
                },
            },
        },
        {
            use: "@gridsome/source-filesystem",
            options: {
                baseDir: "_content/projects",
                path: "*.md",
                typeName: "Project",
            },
        },
        {
            use: "@gridsome/source-filesystem",
            options: {
                baseDir: "_content/",
                path: "uses.md",
                typeName: "Uses",
            },
        },
        {
            use: "@gridsome/source-filesystem",
            options: {
                baseDir: "_content/",
                path: "resume.md",
                typeName: "Resume",
            },
        },
        {
            use: "@gridsome/plugin-sitemap",
            options: {
                cacheTime: 600000, // default
                exclude: ["/thanks"],
            },
        },
        MyPlugin,
    ],
    css: {
        loaderOptions: {
            postcss: {
                plugins: postcssPlugins,
            },
        },
    },
    transformers: {
        remark: {
            // global remark options
        },
    },
};
