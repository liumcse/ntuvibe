const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

// constants
const OUTPUT_PATH = path.resolve(__dirname, "../dist");
const SRC_PATH = path.resolve(__dirname, "../src");
const PROJECT_ROOT = path.resolve(__dirname, "../");

const config = {
    entry: {
        main: SRC_PATH + "/index.js",
    },
    output: {
        filename: "[name].[hash].js",
        path: OUTPUT_PATH,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: ["node_modules"],
                use: [{ loader: "babel-loader" }],
            },
            {
                test: /\.s(a|c)ss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                },{
                    loader: "resolve-url-loader"
                }, {
                    loader: "sass-loader"
                }],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
        new CleanWebpackPlugin([OUTPUT_PATH], {
            root: PROJECT_ROOT,
        })
    ]
};

module.exports = config;