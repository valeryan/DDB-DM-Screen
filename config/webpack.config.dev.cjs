const path = require('path');
const { merge } = require('webpack-merge');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const { UserScriptMetaDataPlugin } = require('userscript-metadata-webpack-plugin');

const metadata = require('./metadata.cjs');
const webpackConfig = require('./webpack.config.base.cjs');

metadata.require.push(
  'file://' + path.resolve(__dirname, '../dist/ddb-dm-screen.debug.user.js')
);

const cfg = merge(webpackConfig, {
  entry: {
    debug: webpackConfig.entry,
    dev: path.resolve(__dirname, './empty.cjs'),
  },
  output: {
    filename: 'ddb-dm-screen.[name].user.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'eval-source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new LiveReloadPlugin({
      delay: 500,
    }),
    new UserScriptMetaDataPlugin({
      metadata,
    }),
    new HtmlWebpackPlugin(),
    new HtmlWebpackTagsPlugin({
      scripts: ['http://localhost:35729/livereload.js?snipver=1'],
      append: true,
    }),
  ],
});

module.exports = cfg;
