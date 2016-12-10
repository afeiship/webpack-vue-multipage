(function() {

  var path = require('path');
  var webpack = require('webpack');
  var $ = require('./webpack.base');
  var config = require('./config.json');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var hotReloadEntries = {};
  var hotReloadPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ];

  Object.keys($.webpackEntries).forEach(function(name) {
    if (name.indexOf('index') > -1) {
      var plugin = new HtmlWebpackPlugin({
        filename: name + '.html',
        template: name + '.html',
        inject: true,
        chunks: [config.venderName, name]
      });
      hotReloadPlugins.push(plugin);
    }
  });

  hotReloadPlugins = hotReloadPlugins.concat($.plugins);

  module.exports = {
    entry: $.webpackEntries,
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: '[name].js',
      chunkFilename: '[id].js',
      minify: false,
      publicPath: '/'
    },
    plugins: hotReloadPlugins,
    module: $.module,
    vue: $.vue,
    babel: $.babel,
    resolve: $.resolve,
    devtool: '#source-map',
    devServer: {
      hot: true,
      stats: 'errors-only'
    }
  };


}());
