const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

// constants
const OUTPUT_PATH = path.resolve(__dirname, "../dist");
const SRC_PATH = path.resolve(__dirname, "../src");
const PROJECT_ROOT = path.resolve(__dirname, "../");

const config = {
  entry: {
    main: SRC_PATH + "/index.js"
  },
  output: {
    filename: "[name].[hash].js",
    publicPath: "/",
    path: OUTPUT_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: ["node_modules"],
        use: [{ loader: "babel-loader" }]
      },
      {
        test: [
          /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)/,
          /\/typefaces\/.*\.svg/
        ],
        use: [{ loader: "file-loader" }]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader?modules=true&camelCase=true"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: true,
              localIdentName: "[hash:base64:10]",
              importLoaders: 1
            }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve(SRC_PATH, "styles")]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PROJECT_ROOT + "/index.html"
    }),
    new CleanWebpackPlugin([OUTPUT_PATH], {
      root: PROJECT_ROOT
    })
  ]
};

module.exports = config;
