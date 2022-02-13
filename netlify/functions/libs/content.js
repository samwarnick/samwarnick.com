import matter from "gray-matter";
import { utils } from "./utils";
import { NodeHtmlMarkdown } from "node-html-markdown";

const renameProperties = {
  name: "title",
  category: "tags",
};

const ignoreProperties = ["content", "photo", "post-status"];

const content = {
  output: (data) => {
    if (!data) {
      return null;
    }

    let output = {};
    for (let [key, value] of Object.entries(data)) {
      if (!ignoreProperties.includes(key)) {
        output[renameProperties[key] || key] = value;
      }
    }

    const content = data.content.html
      ? NodeHtmlMarkdown.translate(data.content.html)
      : data.content || "";
    return matter.stringify({ content }, output);
  },

  format: (data) => {
    if (!data) {
      return null;
    }
    const date = new Date();
    if (!data.date) {
      data.date = date.toISOString();
    } else {
      data.updated = date.toISOString();
    }
    const type = content.getType(data) || "";
    let slugParts = [];
    if (process.env.FILENAME_FULL_DATE) {
      // Jekyll post filenames must have YYYY-MM-DD in the filename
      slugParts.push(date.toISOString().substr(0, 10)); // or split('T')[0]
    }
    if (data.slug) {
      slugParts.push(utils.slugify(data.slug));
    } else if (data.name) {
      slugParts.push(utils.slugify(data.name));
    } else {
      slugParts.push(Math.round(date / 1000));
    }
    const slug = slugParts.join("-");
    const dir = (process.env.CONTENT_DIR || "src").replace(/\/$/, "");
    const filename = `${dir}/${type}/${slug}.md`;

    return {
      filename: filename,
      slug: `${type}/${slug}`,
      formatted: content.output(data),
      data: data,
    };
  },

  getType: (data) => {
    if (!utils.objectHasKeys(data)) {
      return null;
    }
    if (data["like-of"]) {
      return "likes";
    }
    if (data["bookmark-of"]) {
      return "bookmarks";
    }
    if (data["rsvp"] && data["in-reply-to"]) {
      return "rsvp";
    }
    if (data["name"]) {
      return "articles";
    }
    return "notes";
  },

  mediaFilename: (file) => {
    if (file && file.filename) {
      let dir = (process.env.MEDIA_DIR || "uploads").replace(/\/$/, "");
      return `${dir}/${Math.round(new Date() / 1000)}_${file.filename}`;
    }
  },
};

export default content;
