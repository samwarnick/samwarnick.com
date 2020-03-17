// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwind = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");
const marked = require("marked");

const postcssPlugins = [tailwind(), autoprefixer()];

if (process.env.NODE_ENV === "production") postcssPlugins.push(purgecss());

module.exports = {
  siteName: "Sam Warnick",
  siteUrl: "https://samwarnick.com",
  templates: {
    Post: "/posts/:title",
    Tag: "/posts/tags/:id",
    Category: "/posts/categories/:id",
    Project: "/projects/:name"
  },
  plugins: [
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: "UA-131092224-1"
      }
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
            create: true
          },
          categories: {
            typeName: "Category",
            create: true
          }
        },
        remark: {
          plugins: [
            "@gridsome/remark-prismjs",
            ["remark-behead", { after: 0, depth: 1 }]
          ]
        }
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "_content/projects",
        path: "*.md",
        typeName: "Project"
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "_content/",
        path: "uses.md",
        typeName: "Uses"
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "_content/",
        path: "resume.md",
        typeName: "Resume"
      }
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        cacheTime: 600000, // default
        exclude: ["/thanks"]
      }
    },
    {
      use: "gridsome-plugin-feed",
      options: {
        contentTypes: ["Post"],
        feedOptions: {
          title: "Sam Warnick Blog Feed",
          description:
            "A blog about things a stuff. Often related to programming.",
          copyright: `Copyright 2016–${new Date().getFullYear()} Sam Warnick`,
          image:
            "https://res.cloudinary.com/verygoodfm/image/upload/c_fill,f_auto,g_face,h_600,w_600/v1544745118/sam_profile.jpg",
          favicon: "https://samwarnick.com/favicon.png",
          author: {
            name: "Sam Warnick",
            email: "sam@verygoodwebsites.io",
            link: "https://samwarnick.com"
          }
        },
        rss: {
          enabled: true,
          output: "/feed.xml"
        },
        htmlFields: ["description", "content"],
        nodeToFeedItem: node => ({
          title: node.title,
          date: node.date,
          content: marked(node.content),
          description: node.description
        })
      }
    }
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins
      }
    }
  }
};
