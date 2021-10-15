const path = require("path");
const webpack = require('webpack');
const { VueLoaderPlugin } = require("vue-loader");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpackConfig = {
  resolve: {
    extensions: [".js", ".ts"],
  },
  optimization: {
    minimize: false,
    moduleIds: "named",
  },
  entry: "./src/index.ts",
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, "../dist"),
  },
  target: "web",
  externals: {
    jquery: "$",
    axios: "axios",
    "axios-userscript-adapter": "axiosGmxhrAdapter"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        use: {
          loader: "babel-loader",
        },
        test: /\.js$/,
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { babelrc: true }
          },
          {
            loader: "ts-loader",
            options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true}
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    })
  ],
};

module.exports = webpackConfig;
