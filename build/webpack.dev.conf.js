(function() {

  var path = require('path');
  var webpack = require('webpack');
  var $ = require('./webpack.base');
  var config = require('./webpack.config');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var nx = require('next-js-core2');
  var hotReloadEntries = {};
  var hotReloadPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ];

  nx.each($.webpackEntries,function(name) {
    if (name.indexOf('index') > -1) {
      var plugin = new HtmlWebpackPlugin(
        nx.mix(config.htmlWebpackOptions,{
          filename: name+ '.html',
          template: name + '.html',
          chunks: [config.vendorName, name]
        })
      );
      $.plugins.push(plugin);
    }
  })

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
      inline:true,
      stats: 'errors-only',
      port: 8080,
      proxy: {
        '/helper': {
           //target: 'http://train.dcpai.cn:80',
          target: 'http://192.168.10.253:80',
          pathRewrite: { '^/helper': '/helper' },
          changeOrigin: true
        }
      }
    }
  };


}());
