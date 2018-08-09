// The recurring obnoxious webpack compile failure usually results from some weird libraries. Remove them from package.json!!

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// constants
const OUTPUT_PATH = path.resolve(__dirname, "../dist");
const SRC_PATH = path.resolve(__dirname, "../src");
const PROJECT_ROOT = path.resolve(__dirname, "../");

const config = {
  entry: ["babel-polyfill", SRC_PATH + "/index.js"],
  output: {
    filename: "[name].[hash].js",
    publicPath: "/",
    path: OUTPUT_PATH
  },
  resolve: {
    alias: {
      src: SRC_PATH
    }
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
        exclude: ["node_modules"],
        use: [{ loader: "file-loader" }]
      },
      {
        test: /\.s?css$/,
        exclude: ["node_modules"],
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: true,
              localIdentName: "[hash:base64:10]",
              importLoaders: 1,
              modules: true,
              camelCase: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: path.resolve(PROJECT_ROOT, "postcss.config.js")
              }
            }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve(SRC_PATH, "styles")],
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PROJECT_ROOT + "/index.html"
    }),
    new CleanWebpackPlugin([OUTPUT_PATH], {
      root: PROJECT_ROOT
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(SRC_PATH, "brand/faviconit")
      },
      { from: path.resolve(SRC_PATH, "brand/seo") }
    ])
  ]
};

module.exports = config;
