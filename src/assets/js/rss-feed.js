/**
 * MIT License
 *
 * Copyright (c) 2024 David DeGraw
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

class RSS extends HTMLElement {
	async connectedCallback() {
		const feedUrl = this.getAttribute("url");
		let postCount = parseInt(this.getAttribute("count"));

		if (!feedUrl) {
			console.error("No RSS feed URL provided!");
			return;
		}

		if (isNaN(postCount)) {
			postCount = 1;
		}

		try {
			const response = await fetch(feedUrl);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.text();

			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(data, "application/xml");

			const items =
				xmlDoc.querySelectorAll("item") || xmlDoc.querySelectorAll("entry");
			const itemsToRender = [...items].slice(0, postCount);

			if (itemsToRender.length) {
				this.innerHTML = itemsToRender.reduce((acc, item) => {
					return acc + this.itemToHTML(item);
				}, "");
			} else {
				console.log("No items found in the feed.");
			}
		} catch (error) {
			console.error("Error fetching the RSS feed:", error);
		}
	}

	itemToHTML(item) {
		const title = item.querySelector("title")?.textContent;
		const linkElement = item.querySelector("link");
		const link = linkElement?.getAttribute("href") || linkElement?.textContent;
		const description =
			item.querySelector("description")?.textContent ||
			item.querySelector("summary")?.textContent;
		const pubDate =
			item.querySelector("pubDate")?.textContent ||
			item.querySelector("updated")?.textContent;
		const hostname = link ? new URL(link).hostname : "No hostname";
		const userLocale = navigator.language || "en-US";
		const formattedPubDate = new Date(pubDate).toLocaleDateString(userLocale, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		const mediaContent = item.querySelector("content");
		const mediaIsImage = mediaContent?.getAttribute("medium") === "image";
		const mediaUrl = mediaContent?.getAttribute("url");
		const mediaDescription = mediaContent?.querySelector(
			CSS.escape("description"),
		)?.textContent;

		return `
				${title ? `<h3>${title}</h3>` : ""}
				${description ? `<div>${description}</div>` : ""}
				${mediaUrl && mediaIsImage ? `<img src="${mediaUrl}" alt="${mediaDescription}"></img>` : ""}
				<small>
				${link ? `<a href="${link}" target="_blank">${hostname || "source"}</a>` : `${hostname || "source"}`}
				${pubDate ? `<time datetime="${new Date(pubDate).toISOString()}">${formattedPubDate}</time>` : ""}
				</small>
				<hr>
				`;
	}
}

// Define the custom element
customElements.define("rss-feed", RSS);
