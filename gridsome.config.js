// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwind = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");

const postcssPlugins = [tailwind(), autoprefixer()];

if (process.env.NODE_ENV === "production") postcssPlugins.push(purgecss());

module.exports = {
  siteName: "Sam Warnick",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "_posts/**/*.md",
        typeName: "BlogPost",
        route: "/blog/:slug"
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "_projects/**/*.md",
        typeName: "Project"
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
