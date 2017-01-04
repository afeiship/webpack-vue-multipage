(function() {

  var webpack = require('webpack');
  var path = require('path');
  var $ = require('./webpack.base');
  var config = require('./webpack.config');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var PurifyCSSPlugin = require('purifycss-webpack-plugin');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var nx = require('next-js-core2');
  var productPlugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: config.vendorName,
      chunks: Object.keys($.processedEntries)
    })
  ];

  Object.keys($.webpackEntries).forEach(function(name) {
    // console.log(name.slice(12));
    if (name.indexOf('index') > -1) {
      var plugin = new HtmlWebpackPlugin(
        nx.mix(config.htmlWebpackOptions,{
          filename: name.slice(12) + '.html',
          template: name + '.html',
          chunks: [config.vendorName, name.slice(12)]
        })
      );
      $.plugins.push(plugin);
    }
  });

  productPlugins = $.plugins.concat(productPlugins);



  module.exports = {
    entry: $.processedEntries,
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: '[name]-[chunkhash:6].js',
      chunkFilename: '[id]-[chunkhash:6].js',
      minify: false,
      publicPath: '../'
    },
    plugins: productPlugins,
    module: $.module,
    vue: $.vue,
    babel: $.babel,
    resolve: $.resolve
  };


}());
