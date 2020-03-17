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
      extractor: content => content.match(/[A-Za-z0-9-_:#/]+/g) || [],
      extensions: ["vue", "md"]
    }
  ]
};
