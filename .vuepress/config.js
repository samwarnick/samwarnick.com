const path = require("path");
const postcss = require("../postcss.config");

module.exports = {
  title: "Sam Warnick",
  description: "The personal website and blog of Sam Warnick",
  head: [["script", { src: "https://www.google.com/recaptcha/api.js" }]],
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
    ],
    [
      "sitemap",
      {
        hostname: "https://samwarnick.com"
      }
    ]
  ],
  dest: "dist",
  postcss
};
