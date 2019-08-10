class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:#/]+/g) || [];
  }
}

module.exports = {
  content: ["./src/**/*.vue", "./_content/**/*.md"],
  whitelist: [
    "body",
    "html",
    "img",
    "a",
    "p",
    "g-image",
    "g-image--lazy",
    "g-image--loaded"
  ],
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ["vue", "md"]
    }
  ]
};
