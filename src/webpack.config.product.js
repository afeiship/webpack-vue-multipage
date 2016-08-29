(function() {

  var path = require('path');
  var $ = require('./webpack.base');
  var config = require('./config.json');

  $.initMultiHtmlWebpackPlugins();

  module.exports = {
    entry: $.entry,
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: '[name]-[hash:6].js',
      chunkFilename: '[id]-[hash:6].js',
      minify: false,
      publicPath: '/'
    },
    plugins: $.plugins,
    module: $.module,
    vue: $.vue,
    babel: $.babel,
    resolve: $.resolve,
    devtool: $.devtool
  };


}());
