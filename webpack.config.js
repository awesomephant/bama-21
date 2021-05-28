const path = require("path");
module.exports = {
  entry: {
    main: "./src/index.js",
    admin: "./admin/admin.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./_site"),
  },
};
