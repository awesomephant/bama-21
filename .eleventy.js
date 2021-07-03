const markdownIt = require("markdown-it");
const md = new markdownIt();

const Image = require("@11ty/eleventy-img");

let prefix = "/sose21/"
if (process.env.NODE_ENV === "staging") {
  console.log("Building site for staging, disabling pathPrefix.")
  prefix = ""
}

async function imageShortcode(src, alt, sizes, className) {
  console.log(`Processing ${src}`)
  let metadata = await Image(src, {
    widths: [400, 800, 1600, null],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/assets/images",
    urlPath: `${prefix}/assets/images/`
  });
  
  let imageAttributes = {
    alt,
    sizes,
    class: className,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
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
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  return {
    pathPrefix: prefix
  };
};
