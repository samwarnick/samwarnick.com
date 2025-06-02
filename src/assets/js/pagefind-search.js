/**
 * Copyright (C) 2023 Zach Leatherman
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

class PagefindSearch extends HTMLElement {
	static register(tagName = "pagefind-search", registry) {
		if ("customElements" in window) {
			(registry || customElements).define(tagName, this);
		}
	}

	static attrs = {
		bundlePath: "_bundle_path",
		manualInit: "manual",
		autofocus: "pagefind-autofocus",
	};

	static count = 0;

	get bundlePath() {
		let dir = this.getAttribute(PagefindSearch.attrs.bundlePath);
		return dir || "/pagefind/";
	}

	get id() {
		// prefer existing id attribute
		if (this.hasAttribute("id")) {
			return this.getAttribute("id");
		}
		return "_pagefind_search_" + this.count;
	}

	static underscoreToCamelCase(str) {
		return str.replace(/_([a-z])/g, (m) => {
			return m[1].toUpperCase();
		});
	}

	get options() {
		let o = {
			element: `#${this.id}`,
		};

		let prefix = "_";
		for (let { name, value } of this.attributes) {
			if (name.startsWith(prefix)) {
				if (name === PagefindSearch.attrs.bundlePath) {
					// if bundle path is relative, we need to make it absolute to pass in to Pagefind (GitHub pages fix)
					let u = new URL(value, location);
					value = u.pathname;
				}

				if (
					value === "false" ||
					value === "true" ||
					Number(value).toString() === value
				) {
					value = JSON.parse(value);
				}
				o[PagefindSearch.underscoreToCamelCase(name.slice(prefix.length))] =
					value;
			}
		}
		return o;
	}

	async pagefind(customOptions) {
		if (typeof PagefindUI == "undefined") {
			if (!this.scriptPromise) {
				throw new Error(
					`<${this.tagName.toLowerCase()}> is not yet attached to a document.`,
				);
			}

			await this.scriptPromise;
		}

		let options = Object.assign({}, this.options, customOptions);
		this.pagefindUI = new PagefindUI(options);

		let input = this.querySelector(`input:is([type="text"], [type="search"])`);
		if (this.hasAttribute(PagefindSearch.attrs.autofocus)) {
			input?.focus();
		}
	}

	async connectedCallback() {
		if (this.hasAttached) {
			return;
		}

		this.hasAttached = true;
		this.count = PagefindSearch.count++;
		this.setAttribute("id", this.id);

		// clear out fallback content
		this.replaceChildren();

		let scriptUrl = `${this.bundlePath}pagefind-ui.js`;
		this.scriptPromise = import(scriptUrl);
		if (!this.hasAttribute(PagefindSearch.attrs.manualInit)) {
			await this.scriptPromise;
			await this.pagefind();
		}
	}
}

PagefindSearch.register();
