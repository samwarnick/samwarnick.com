const localImageTransform = require("./transforms/local-image-transform");
const prettierTransform = require("./transforms/prettier-transform");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const convertHtmlToAbsoluteUrls = require("@11ty/eleventy-plugin-rss/src/htmlToAbsoluteUrls");

const posthtml = require("posthtml");
const urls = require("posthtml-urls");
const path = require("path");
const slugify = require("slugify");

const now = String(Date.now());

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addCollection("posts", (collection) => {
    const posts = collection.getFilteredByGlob(["./src/posts/**/*.md"]);
    const articles = collection.getFilteredByGlob([
      "./src/content/articles/**/*.md",
    ]);
    return [...posts, ...articles];
  });

  eleventyConfig.addWatchTarget("./_tmp/styles.css");

  eleventyConfig.addPassthroughCopy({
    "./_tmp/styles.css": "./assets/styles/main.css",
    "./src/assets": "./assets",
    "./src/icons": "./",
  });
  eleventyConfig.addPassthroughCopy("./src/robots.txt");

  eleventyConfig.addFilter("slug", (input) => {
    const options = {
      replacement: "-",
      remove: /[&,+()$~%.'":*?<>{}]/g,
      lower: true,
    };
    return slugify(input, options);
  });

  let markdownIt = require("markdown-it");
  const markdownItFootnote = require("markdown-it-footnote");
  const markdownItExternalLinks = require("markdown-it-external-links");
  const markdownItAttrs = require("markdown-it-attrs");
  const markdownItPrism = require("markdown-it-prism");
  const figure = require("./figure");

  let options = {
    html: true,
  };
  let markdownLib = markdownIt(options)
    .use(markdownItFootnote)
    .use(markdownItExternalLinks, {
      internalClassName: "internal-link",
      externalTarget: "_blank",
      externalRel: "noopener noreferrer",
    })
    .use(markdownItAttrs)
    .use(markdownItPrism)
    .use(figure);
  markdownLib.renderer.rules.heading_open = (tokens, index) => {
    const currentLevel = parseInt(tokens[index].tag.replace("h", ""));
    return `<h${currentLevel + 1}>`;
  };
  markdownLib.renderer.rules.heading_close = (tokens, index) => {
    const currentLevel = parseInt(tokens[index].tag.replace("h", ""));
    return `</h${currentLevel + 1}>`;
  };
  markdownLib.renderer.rules.footnote_caption = (tokens, index) => {
    let n = Number(tokens[index].meta.id + 1).toString();

    if (tokens[index].meta.subId > 0) {
      n += ":" + tokens[index].meta.subId;
    }

    return `${n}`;
  };
  markdownLib.renderer.rules.footnote_block_open = (tokens, idx, options) => {
    return (
      (options.xhtmlOut
        ? '<hr class="footnotes-sep" />\n'
        : '<hr class="footnotes-sep">\n') +
      '<section class="footnotes text-sm mb-12">\n' +
      '<ol class="footnotes-list">\n'
    );
  };

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addTransform("local-images", localImageTransform);
  eleventyConfig.addTransform("prettier", prettierTransform);

  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "default",
    },
  });

  eleventyConfig.addFilter("lessRelativeUrl", (value, base) => {
    return path.join(base, value.trim());
  });
  eleventyConfig.addNunjucksAsyncFilter(
    "htmlToLessRelativeUrls",
    (htmlContent, base, callback) => {
      if (!htmlContent) {
        callback(null, "");
        return;
      }

      test(htmlContent, base).then((html) => {
        callback(null, html);
      });
    }
  );

  eleventyConfig.addShortcode("version", function () {
    return now;
  });

  return {
    dir: {
      input: "src",
    },
  };
};

async function test(htmlContent, base, processOptions = {}) {
  let options = {
    eachURL: function (url) {
      if (url.startsWith(".")) {
        return path.join(base, url.trim());
      }
      return url;
    },
  };

  let modifier = posthtml().use(urls(options));

  let result = await modifier.process(htmlContent, processOptions);
  return result.html;
}
