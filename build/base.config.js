const argv = require('yargs').argv;
const config = require('../config');
const webpackEntries = require('webpack-entries');
const nx = require('next-js-core2');
const nxKeyMap = require('next-key-map');
const argEnv = argv.env || 'dev';
const htmlWebpackPluginArray = [];
const options = {sourceMap: true};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entries = nxKeyMap(
  webpackEntries(config[argEnv].entry), (key) => key.slice(10, -4)
);

function initEntries() {
  const bundleConfig = require("../dist/assets/vendors/bundle-config.json");
  nx.each(entries, (key) => {
    const filename = key + '.html';
    const basePath = config[argEnv].publicPath + 'assets/vendors/';
    const htmlConf = {
      filename: filename,
      template: './src/pages/' + key + '/app.ejs',
      inject: 'body',
      favicon: './src/assets/images/logo.png',
      libJs: [basePath, bundleConfig.libs.js].join(''),
      libCss: [basePath, bundleConfig.libs.css].join(''),
      libs: config[argEnv].libs,
      hash: true,
      chunks: ['commons', key]
    };

    htmlWebpackPluginArray.push(
      new HtmlWebpackPlugin(htmlConf)
    );
  });
  return {
    entries,
    htmlWebpackPluginArray
  }
}


module.exports = {
  config,
  argEnv,
  initEntries: initEntries,
  styleLoader: {loader: 'style-loader', options},
  cssLoader: {loader: 'css-loader', options},
  sassLoader: {loader: 'sass-loader', options},
  postcssLoader: {loader: 'postcss-loader', options}
};