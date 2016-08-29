(function() {

  var webpack = require('webpack');
  var fs = require('fs');
  var path = require('path');
  var entries = require('webpack-entries');
  var config = require('./config.json');

  //Plugin lists:
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var PurifyCSSPlugin = require('purifycss-webpack-plugin');
  var webpackEntries = entries('modules/**/*.js');
  var webpackPlugins = [
    new webpack.ProvidePlugin({
      Vue: 'vue'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.NoErrorsPlugin(),
    // split vendor js into its own file,
    new ExtractTextPlugin('[name][hash:5].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.(js|css|less|scss)$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new PurifyCSSPlugin({
      paths: [
        'modules/**/*.html'
      ],
      purifyOptions: {
        minify: true,
        info: true
      }
    })
  ];
  //init multi page html-webpack-plugin:
  Object.keys(webpackEntries).forEach(function(name) {
    if (name.indexOf('index') > -1) {
      var plugin = new HtmlWebpackPlugin({
        filename: name + '.html',
        template: name + '.html',
        inject: true,
        chunks: ['vendor', name]
      });
      webpackPlugins.push(plugin);
    }
  });


  module.exports = {
    entry: webpackEntries,
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: '[name]-[hash:6].js',
      chunkFilename: '[id]-[hash:6].js',
      minify: false,
      publicPath: '/dist/'
    },
    plugins: webpackPlugins,
    module: {
      loaders: [{
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!less')
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
      }, {
        test: /\.(gif|jpg|png)\??.*$/,
        loader: 'url-loader?limit=8096&name=images/[name].[ext]'
      }, {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8096&name=fonts/[name].[ext]'
      }]
    },
    vue: {
      loaders: {
        css: ExtractTextPlugin.extract('vue-style-loader', 'css'),
        less: ExtractTextPlugin.extract('vue-style-loader', 'css!less'),
        sass: ExtractTextPlugin.extract('vue-style-loader', 'css!sass')
      }
    },
    babel: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
    }
  };


}());
