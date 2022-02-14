module.exports = {
    permalink: "posts/{{ title | slug }}/index.html",
    layout: "post",
    eleventyComputed: {
        date: (data) => new Date(data.date)
    }
};
