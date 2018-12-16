const path = require("path");
const postcss = require("../postcss.config");

module.exports = {
  title: "Sam Warnick",
  description: "The personal website and blog of Sam Warnick",
  markdown: {
    anchor: { permalink: false, permalinkBefore: false, permalinkSymbol: "#" }
  },
  plugins: [
    [
      "@vuepress/blog",
      {
        permalink: "/:year/:month/:slug"
      }
    ],
    "@vuepress/pagination",
    [
      "@vuepress/register-components",
      {
        componentsDir: [path.resolve(__dirname, "theme/components")]
      }
    ]
  ],
  dest: "dist",
  postcss
};