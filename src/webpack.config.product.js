(function() {

  var webpack = require('webpack');
  var path = require('path');
  var $ = require('./webpack.base');
  var config = require('./config.json');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var PurifyCSSPlugin = require('purifycss-webpack-plugin');


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
      name: config.venderName
    }),
    // new PurifyCSSPlugin({
    //   paths: [
    //     'modules/**/*.html'
    //   ],
    //   purifyOptions: {
    //     minify: true,
    //     info: true
    //   }
    // })
  ];

  $.initMultiHtmlWebpackPlugins();

  productPlugins = $.plugins.concat(productPlugins);

  module.exports = {
    entry: $.processedEntries,
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: '[name]/index-[hash:5].js',
      chunkFilename: '[name]/index-[hash:5].js',
      minify: false,
      publicPath: '/'
    },
    plugins: productPlugins,
    module: $.module,
    vue: $.vue,
    babel: $.babel,
    resolve: $.resolve
  };


}());
