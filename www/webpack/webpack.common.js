// The recurring obnoxious webpack compile failure usually results from some weird libraries. Remove them from package.json!!

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

// constants
const OUTPUT_PATH = path.resolve(__dirname, "../dist");
const SRC_PATH = path.resolve(__dirname, "../src");
const PROJECT_ROOT = path.resolve(__dirname, "../");

const config = {
  entry: ["@babel/polyfill", SRC_PATH + "/index.js"],
  output: {
    filename: "[name].[hash].js",
    publicPath: "/",
    path: OUTPUT_PATH
  },
  resolve: {
    alias: {
      src: SRC_PATH,
      "@routes": SRC_PATH + "/routes",
      "@components": SRC_PATH + "/components",
      "@redux": SRC_PATH + "/redux",
      "@assets": SRC_PATH + "/assets",
      "@tracking": SRC_PATH + "/tracking"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }]
      },
      {
        test: [
          /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)/,
          /\/typefaces\/.*\.svg/
        ],
        exclude: /node_modules/,
        use: [{ loader: "file-loader" }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: true,
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
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              modifyVars: require(SRC_PATH + "/styles/antd-override.js"),
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: true,
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
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all"
        }
      }
    },
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {},
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  plugins: [
    new CompressionPlugin(),
    new HtmlWebpackPlugin({
      template: PROJECT_ROOT + "/index.html",
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyJS: true,
        removeComments: true
      }
    }),
    new CleanWebpackPlugin([OUTPUT_PATH], {
      root: PROJECT_ROOT
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    // new PreloadWebpackPlugin({
    //   fileWhitelist: [/\.css/]
    // }),
    new ScriptExtHtmlWebpackPlugin({
      preload: /\.css$/,
      defaultAttribute: "async"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(SRC_PATH, "brand/faviconit")
      },
      { from: path.resolve(SRC_PATH, "brand/seo") },
      { from: path.resolve(SRC_PATH, "brand/pic") }
    ])
  ]
};

module.exports = config;
