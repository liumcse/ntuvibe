const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    host: "localhost",
    historyApiFallback: true, // make sure Router works
    port: 3000,
    open: true
  }
});