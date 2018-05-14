'use strict';
const merge = require('webpack-merge');
const {resolve} = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const {config, argEnv, cssLoader, sassLoader, postcssLoader} = require('./base.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: [
      resolve(__dirname, '../dist'),
      resolve(__dirname, '../node_modules')
    ],
    host: '0.0.0.0',
    port: config[argEnv].port,
    historyApiFallback: false,
    noInfo: true,
    proxy: config.devProxy,
    open: true,
    openPage: 'home.html'
  }
});

