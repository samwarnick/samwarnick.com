const now = new Date();

function isScheduled(data) {
	return data.page.date > now;
}

export default {
	layout: "layouts/post.njk",
	permalink: function (data) {
		if (data.site.production && (data.published === false || isScheduled(data))) {
			return false;
		}
		if (data.page.inputPath.includes("_draft")) {
			return `/blog/${this.slugify(`${data.title}-${data.date}`, {
				customReplacements: [["'", ""]],
			})}/index.html`;
		}
		return `/blog/${this.slugify(data.title, {
			customReplacements: [["'", ""]],
		})}/index.html`;
	},
	eleventyComputed: {
		eleventyExcludeFromCollections: function (data) {
			return data.site.production && (data.published === false || isScheduled(data));
		},
		tags: function ({ title, tags }) {
			if (title.toLowerCase().includes("devlog") && !tags.includes("Devlog")) {
				return [...tags, "Devlog"];
			}
			return tags || [];
		},
	},
};
