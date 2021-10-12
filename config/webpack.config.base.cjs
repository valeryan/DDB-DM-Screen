const path = require("path");

const { VueLoaderPlugin } = require("vue-loader");

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
    path: path.resolve(__dirname, "../dist"),
  },
  target: "web",
  externals: {
    jquery: "$",
    axios: "axios",
    "axios-userscript-adapter": "axiosGmxhrAdapter",
    vue: "Vue"
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
        },
        test: /\.js$/,
      },
      {
        test: /\.ts$/,
        loader: "babel-loader", // use ts-loader if you like
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin()
  ],
};

module.exports = webpackConfig;
