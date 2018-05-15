'use strict';
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  devtool: '#source-map',
  plugins: [
    new OptimizeCSSPlugin()
  ]
});