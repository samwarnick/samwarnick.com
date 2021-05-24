const fs = require("fs");

fs.writeFile("src/.eleventyignore", "posts/_drafts", function (err) {
    if (err) return console.log(err);
    console.log("posts/_drafts > src/.eleventyignore");
});
