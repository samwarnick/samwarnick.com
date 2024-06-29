export default {
	permalink: function ({ title }) {
		return `${title.toLowerCase()}/index.html`;
	},
};
