export default {
	layout: "layouts/page.njk",
	permalink: function ({ title }) {
		return `/projects/${this.slugify(title)}/index.html`;
	},
};
