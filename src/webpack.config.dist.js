(function() {

  var webpack = require('webpack');
  var fs = require('fs');
  var path = require('path');
  var entries = require('webpack-entries');

  //Plugin lists:
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var PurifyCSSPlugin = require('purifycss-webpack-plugin');
  var AssetsPlugin = require('assets-webpack-plugin');


  const debug = process.env.NODE_ENV !== 'production';

  module.exports = {
    entry: entries('modules/**/*.js'),
    output: {
      path: path.join(__dirname, '..','dist'),
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[id]-[chunkhash].js'
    },
    plugins: [
      new AssetsPlugin({filename:'dist/rev-mainfest.json'})
    ],
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
