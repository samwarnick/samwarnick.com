import pluginRss from "@11ty/eleventy-plugin-rss";
import eleventyPluginOgImage from "eleventy-plugin-og-image";
import { OgImage } from 'eleventy-plugin-og-image/og-image';
import lightningCSS from "@11tyrocks/eleventy-plugin-lightningcss";
import fs from "node:fs";
import crypto from 'node:crypto';
import { execSync } from "child_process";
import { DateTime } from "luxon";

import MarkdownIt from "markdown-it";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";
import MarkdownItAttrs from "markdown-it-attrs";
import { html5Media } from "markdown-it-html5-media";
import Shiki from "@shikijs/markdown-it";
import {
	transformerNotationFocus,
} from "@shikijs/transformers";

export class CustomOgImage extends OgImage {
	async hash() {
		const hash = crypto.createHash('sha256');
		hash.update(this.data.title);
		return hash.digest('hex').substring(0, this.options.hashLength);
	}
}

/** @param {import('@11ty/eleventy/src/UserConfig').default} eleventyConfig */
export default async function (eleventyConfig) {
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	eleventyConfig.addDateParsing(function (dateValue) {
		if (dateValue) {
			return DateTime.fromISO(dateValue).setZone("America/New_York");
		}
	});

	const options = {
		html: true,
		breaks: true,
		linkify: true,
	};

	let markdownLib = MarkdownIt(options)
		.use(
			await Shiki({
				theme: "rose-pine-moon",
				transformers: [transformerNotationFocus()],
			}),
		)
		.use(MarkdownItGitHubAlerts)
		.use(MarkdownItFootnote)
		.use(html5Media)
		.use(MarkdownItAttrs);

	markdownLib.renderer.rules.footnote_anchor = (
		tokens,
		idx,
		options,
		env,
		slf,
	) => {
		var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

		if (tokens[idx].meta.subId > 0) {
			id += ":" + tokens[idx].meta.subId;
		}

		return ' <a href="#fnref' + id + '">&#10558;</a>';
	};

	eleventyConfig.setLibrary("md", markdownLib);

	eleventyConfig.addPlugin(lightningCSS);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(eleventyPluginOgImage, {
		OgImage: CustomOgImage,
		satoriOptions: {
			fonts: [
				{
					name: "Atkinson",
					data: fs.readFileSync(
						"./src/assets/fonts/Atkinson-Hyperlegible-Bold-102.woff",
					),
					weight: 700,
					style: "normal",
				},
				{
					name: "Calistoga",
					data: fs.readFileSync("./src/assets/fonts/Calistoga-Regular.ttf"),
					weight: 400,
					style: "normal",
				},
			],
		},
	});

	eleventyConfig.addShortcode("timestamp", function () {
		return Date.now();
	});
	eleventyConfig.addShortcode("year", function () {
		return new Date().getFullYear();
	});
	eleventyConfig.addShortcode("youtube", function (url) {
		const youtubeRegex = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)(?<id>[a-zA-Z0-9_-]{11})(?:.*[?&]t=(?<timestamp>\d+))?/;
		const match = url.match(youtubeRegex)
		if (match) {
			const { id, timestamp } = match.groups;
			return `<lite-youtube videoId="${id}" videoStartAt="${timestamp ?? 0}" posterquality="maxresdefault"></lite-youtube>`;
		}
	});
	eleventyConfig.addShortcode("tcg-card", function (src, alt, style) {
		return `<tcg-card src="${src}" alt="${alt}" style="${style ?? 'width: 300px; margin-inline: auto;'}">
				<img src="${src}" alt="${alt}" style="${style ?? 'width: 300px; margin-inline: auto;'}"></img>
				<p>(You're viewing this post somewhere that does not support JS, like RSS. Load this page with JS to interact.)</p>
			</tcg-card>`;
	});
	eleventyConfig.addFilter("replaceWebComponents", function(content) {
		return content
			// Replace lite-youtube with iframe
			.replace(
				/<lite-youtube\s+videoId="([^"]+)"(?:\s+videoStartAt="([^"]+)")?[^>]*><\/lite-youtube>/gs,
				(match, videoId, startTime) => {
					const startParam = startTime ? `&start=${startTime}` : '';
					return `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?${startParam}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
				}
			);
	});
	eleventyConfig.addFilter("toDate", function (value) {
		return new Date(value);
	});
	eleventyConfig.addFilter("formattedDate", function (date) {
		return DateTime.fromJSDate(date).toLocaleString(
			DateTime.DATE_MED,
		);
	});
	eleventyConfig.addFilter("getAllTags", function (collection) {
		let tagSet = new Set();
		for (let item of collection) {
			(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});
	eleventyConfig.addFilter("removeSite", function (url) {
		return url.replace("https://samwarnick.com", "");
	});
	eleventyConfig.addFilter("toGitHub", function (inputPath) {
		return `https://github.com/samwarnick/samwarnick.com/blob/main${inputPath.substring(1)}`;
	});
	eleventyConfig.addFilter("dateToRfc822WithCorrectTz", function (date) {
		return DateTime.fromJSDate(date).toRFC2822();
	});
	eleventyConfig.addFilter("defaultImage", function (image) {
		const defaultImages = [
			"og-image/1.jpg",
			"og-image/2.jpg",
			"og-image/3.jpg",
			"og-image/4.jpg",
			"og-image/5.jpg",
			"og-image/6.jpg",
			"og-image/7.jpg",
			"og-image/8.jpg",
			"og-image/9.jpg",
			"og-image/10.jpg",
			"og-image/11.jpg",
			"og-image/12.jpg",
		];
		return (
			image || defaultImages[Math.floor(Math.random() * defaultImages.length)]
		);
	});
	eleventyConfig.addFilter("something", function (value) {
		return value.replace("&#39;", ",");
	});

	eleventyConfig.addPassthroughCopy("src/assets/fonts");
	eleventyConfig.addPassthroughCopy("src/assets/favicon");
	eleventyConfig.addPassthroughCopy("src/assets/js");
	eleventyConfig.addPassthroughCopy("src/assets/img");

	eleventyConfig.addCollection("posts", function (collectionApi) {
		return collectionApi.getFilteredByGlob("src/content/blog/**/*.md");
	});
	eleventyConfig.addCollection("currentProjects", function (collectionApi) {
		return collectionApi.getFilteredByGlob("src/content/projects/**/*.md");
	});
	eleventyConfig.addCollection("postsByYear", function (collectionApi) {
		const posts = collectionApi.getFilteredByGlob("src/content/blog/**/*.md");
		const years = posts.map((post) => post.date.getFullYear());
		const uniqueYears = [...new Set(years)];

		const postByYear = uniqueYears.reduce((acc, year) => {
			const filteredPosts = posts.filter(
				(post) => post.date.getFullYear() === year,
			);

			return [...acc, { year, posts: filteredPosts }];
		}, []);

		return postByYear;
	});
	eleventyConfig.addCollection("Devlog", function (collectionApi) {
		const posts = collectionApi.getFilteredByGlob("src/content/blog/**/*.md");

		return posts.filter((post) => post.data.tags.includes("Devlog"));
	});

	eleventyConfig.on("eleventy.after", () => {
		execSync(`npx pagefind --site _site`, { encoding: "utf-8" });
	});

	eleventyConfig.watchIgnores.add("./cli/**");

	return {
		dir: {
			input: "src",
		},
	};
}
