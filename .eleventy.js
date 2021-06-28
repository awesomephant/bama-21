const markdownIt = require("markdown-it");
const md = new markdownIt();

module.exports = function (eleventyConfig) {
  let prefix = "/sose21/"

  if (process.env.NODE_ENV === "staging") {
    console.log("Building site for staging, disabling pathPrefix.")
    prefix = ""
  }

  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["./projects/*.md"]).sort(function (a, b) {
      if (a.data.title > b.data.title) return 1;
      else if (a.data.title < b.data.title) return -1;
      else return 0;
    });
  });

  eleventyConfig.addFilter("cleanURL", function (url) {
    return url.replace(/(https?:\/\/)|(www.)|(\/$)/g, "");
  });
  eleventyConfig.addFilter("cleanURL", function (url) {
    return url.replace(/(https?:\/\/)|(www.)|(\/$)/g, "");
  });
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addWatchTarget("./css/");
  eleventyConfig.addWatchTarget("./src/");
  eleventyConfig.addPassthroughCopy({ "./admin/config.yml": "/admin/config.yml" });
  eleventyConfig.addFilter("renderMarkdown", function (value) {
    return md.render(value);
  });
  return {
    pathPrefix: prefix
  };
};
