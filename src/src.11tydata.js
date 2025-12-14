import crypto from "node:crypto";

function hash(title, backgroundImage) {
  const hash = crypto.createHash('sha256');
  hash.update(`${title}-${backgroundImage}`);
  return hash.digest('hex').substring(0, 8);
}

export default {
  layout: "layouts/base.njk",
  eleventyComputed: {
    hash: (data) => {
      return hash(data.title, data.ogImage)
    },
  }
};
