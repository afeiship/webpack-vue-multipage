(function() {

  var webpack = require('webpack');
  var fs = require('fs');
  var path = require('path');
  var entries = require('webpack-entries');
  var config = require('./config.json');

  console.log(config);

  //Plugin lists:
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var PurifyCSSPlugin = require('purifycss-webpack-plugin');
  var webpackEntries = entries('modules/**/*.js');
  var webpackPlugins = [];

  //init html-webpack-plugin:
  Object.keys(webpackEntries).forEach(function(name) {
    // console.log(name);
    // modules/auth/index
    // modules/detail/index
    // modules/global
    // modules/home/index
    // modules/list/index
    if (name.indexOf('index') > -1) {
      var plugin = new HtmlWebpackPlugin({
        filename: name + '.html',
        template: name + '.html',
        inject: true,
        chunks: [name]
      });
      webpackPlugins.push(plugin);
    }
  });


  module.exports = {
    entry: webpackEntries,
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[id]-[chunkhash].js'
    },
    plugins: webpackPlugins,
    resolve: {
      extensions: ['', '.js', '.vue'],
      alias: {
        service: path.join(__dirname, './src/service'),
        components: path.join(__dirname, './src/components'),
        views: path.join(__dirname, './src/views'),
        styles: path.join(__dirname, './src/styles'),
        images: path.join(__dirname, './src/assets/images')
      }
    }
  };


}());
