export default {
  layout: "layouts/post.njk",
  permalink: function ({ title, published }) {
    if (published === false) {
      return false;
    }
    return `/blog/${this.slugify(title, {
      customReplacements: [["'", ""]],
    })}.html`;
  },
  eleventyComputed: {
    eleventyExcludeFromCollections: function ({ published }) {
      return published === false;
    },
    tags: function ({ title, tags }) {
      if (title.toLowerCase().includes("devlog")) {
        return [...tags, "Devlog"];
      }
      return tags || [];
    },
  },
};
