export default {
  layout: "layouts/page-card.njk",
  permalink: function ({ title }) {
    return `/projects/${this.slugify(title)}/index.html`;
  },
};
