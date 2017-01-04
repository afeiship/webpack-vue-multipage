(function() {

  var config = require('./webpack.config');
  var path = require('path');
  var webpack = require('webpack');
  var entries = require('webpack-entries');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var PurifyCSSPlugin = require('purifycss-webpack-plugin');
  var webpackEntries = entries('src/modules/**/index.js');
  var webpackPlugins = [
    new webpack.ProvidePlugin({
      Vue: 'vue'
    }),
    new webpack.NoErrorsPlugin(),
    // split vendor js into its own file,
    new ExtractTextPlugin('[name]/index-[contenthash:5].css')
  ];

  var processedEntries = {};

  for (var key in webpackEntries) {
    if (webpackEntries.hasOwnProperty(key)) {
      processedEntries[key.slice(12)] = webpackEntries[key];
    }
  }

  module.exports = {
    webpackEntries: webpackEntries,
    processedEntries: processedEntries,
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
        loader: 'url-loader?limit=8096&name=assets/images/[name].[ext]'
      }, {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8096&name=assets/fonts/[name].[ext]'
      }, {
        test: /\.(html|tpl)$/,
        loader: 'html-loader?minimize=false'
      }]
    },
    vue: {
      loaders: {
        css: ExtractTextPlugin.extract('vue-style-loader', 'css'),
        less: ExtractTextPlugin.extract('vue-style-loader', 'css!less'),
        scss: ExtractTextPlugin.extract('vue-style-loader', 'css!sass')
      }
    },
    babel: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
    },
    resolve: {
      extensions: ['', '.js', '.vue'],
      alias: {
        vue: 'vue/dist/vue.js',
        node_modules: path.join(__dirname, '../node_modules'),
        bower: path.join(__dirname, '../bower_components'),
        components: path.join(__dirname, '../src/components'),
        modules: path.join(__dirname, '../src/modules'),
        assets: path.join(__dirname, '../src/assets'),
      }
    }
  };

}());
