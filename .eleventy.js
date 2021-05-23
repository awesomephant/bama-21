if (process.env.NODE_ENV === "production") {
  console.log("Building site for production.")
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addWatchTarget("./css/");
  eleventyConfig.addWatchTarget("./src/");
  return {};
};
