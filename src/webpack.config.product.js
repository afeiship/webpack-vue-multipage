(function() {

  var webpack = require('webpack');
  var fs = require('fs');
  var path = require('path');
  var entries = require('webpack-entries');

  var $ = require('./webpack.base');
  var config = require('./config.json');


  module.exports = {
    entry: $.webpackEntries,
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: '[name]-[hash:6].js',
      chunkFilename: '[id]-[hash:6].js',
      minify: false,
      publicPath: '/dist/'
    },
    plugins: $.webpackPlugins,
    module: $.webpackModules,
    vue: $.vue,
    babel: $.babel
  };


}());
