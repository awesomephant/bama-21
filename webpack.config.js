const path = require("path");
module.exports = {
  entry: {
    main: "./src/index.js",
    labels: "./src/labels.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./_site"),
  },
};
