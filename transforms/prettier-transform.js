const path = require("path");
const prettier = require("prettier");

module.exports = function (content, outputPath) {
    const extname = path.extname(outputPath);
    switch (extname) {
        case ".html":
        case ".xml":
            // Strip leading period from extension and use as the Prettier parser.
            const parser = "html";
            return prettier.format(content, { parser });

        default:
            return content;
    }
};
