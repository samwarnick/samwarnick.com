const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g);
  }
}

let plugins = [tailwindcss("tailwind.js"), autoprefixer()];
if (process.env.NODE_ENV === "production") {
  plugins.push(
    purgecss({
      whitelist: [
        "html",
        "body",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "pre",
        "code",
        "content",
        "extra-class"
      ],
      content: [".vuepress/theme/**/*.vue"],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["vue"]
        }
      ]
    })
  );
}

module.exports = {
  plugins
};
