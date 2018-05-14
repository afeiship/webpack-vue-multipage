'use strict';
const merge = require('webpack-merge');
const {resolve} = require('path');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: [
      resolve(__dirname, '../dist'),
      resolve(__dirname, '../node_modules')
    ],
    host: '0.0.0.0',
    port: 8012,
    historyApiFallback: false,
    noInfo: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    },
    open: true,
    openPage: 'home.html'
  }
});

module.exports = devWebpackConfig;
