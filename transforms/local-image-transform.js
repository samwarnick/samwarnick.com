const path = require("path");
const fs = require("fs");
const glob = require("glob");

module.exports = function (content, outputPath) {
    console.warn(
        `TRANSFORM - input: ${this.inputPath}, output: ${outputPath}`,
    );

    const outputDir = path.dirname(outputPath);
    const templateDir = path.dirname(this.inputPath).replace(/^\.\//, "");

    const extensionsRegex = "njk,md,html";

    const mdSearchPattern = path.join(templateDir, `**/*.{${extensionsRegex}}`);
    const mdIgnorePattern = path.join(
        templateDir,
        `**/_index.{${extensionsRegex}}`,
    );

    const entries = glob.sync(mdSearchPattern, {
        nodir: true,
        ignore: mdIgnorePattern,
    });

    // only 1 page template allowed when copying assets
    if (entries.length > 1) {
        console.info(
            `Skipping copying over files from: ${templateDir} as multiple templates found in directory!`,
        );
        return content;
    }

    // copy all hierarchically, except templates
    const fileSearchPattern = path.join(templateDir, `**/*`);
    const fileIgnorePattern = path.join(
        templateDir,
        `**/*.{${extensionsRegex}}`,
    );

    const filesToCopy = glob.sync(fileSearchPattern, {
        nodir: true,
        ignore: fileIgnorePattern,
    });

    for (let filePath of filesToCopy) {
        // strip template dir
        // prepend output dir
        const destPath = path.join(
            outputDir,
            filePath.substr(templateDir.length),
        );

        const destDir = path.dirname(destPath);

        fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(filePath, destPath);
    }

    // keep original content
    return content;
};
