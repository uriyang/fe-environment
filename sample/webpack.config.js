const { ChildProcess } = require("child_process");
const path = require("path");
const webpack = require("webpack");
const exec = require("child_process").execSync;

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${exec("git rev-parse --short HEAD")}
        Author: ${exec("git config user.name")}
      `,
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v.1.2.3"),
      PRODUCTION: JSON.stringify(false),
      MAX_COUNT: JSON.stringify(999),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
  ],
};
