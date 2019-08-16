// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const fetch = require("node-fetch");
const convert = require("xml-js");

module.exports = function(api) {
  api.loadSource(async ({ addContentType }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api
    // const response = await fetch("https://lilyandsam.show/feed", {
    //   headers: {
    //     "Content-Type": "application/xml"
    //   }
    // });
    // const feed = convert.xml2js(await response.text());
    // const episodes = feed.elements[0].elements[0].elements
    //   .filter(element => {
    //     return element.name === "item";
    //   })
    //   .map(element => {
    //     return element.elements;
    //   });
    // for (episode of episodes) {
    //   console.log(episode);
    // }
    // const contentType = addContentType({
    //   typeName: "PodcastEpisode"
    // });
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  });
};
