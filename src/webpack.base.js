(function() {

  var config = require('./config.json');
  var path = require('path');
  var webpack = require('webpack');
  var entries = require('webpack-entries');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var PurifyCSSPlugin = require('purifycss-webpack-plugin');
  var webpackEntries = entries('modules/**/*.js');
  var WebpackMd5Hash = require('webpack-md5-hash');
  var webpackPlugins = [
    new webpack.ProvidePlugin({
      Vue: 'vue'
    }),
    new webpack.NoErrorsPlugin(),
    // split vendor js into its own file,
    new ExtractTextPlugin('[name]/index-[contenthash:5].css'),
    new WebpackMd5Hash()
  ];

  var processedEntries={};
  for (var key in webpackEntries) {
    if (webpackEntries.hasOwnProperty(key)) {
      // remove 'modules' && 'index'
      processedEntries[key.slice(8,-6)]=webpackEntries[key];
    }
  }

  module.exports = {
    entry: processedEntries,
    plugins: webpackPlugins,
    initMultiHtmlWebpackPlugins: function() {
      Object.keys(webpackEntries).forEach(function(name) {
        if (name.indexOf('index') > -1) {
          var plugin = new HtmlWebpackPlugin({
            filename: name.slice(8) + '.html',
            template: name + '.html',
            inject: true,
            chunks: [config.venderName, name.slice(8,-6)]
          });
          webpackPlugins.push(plugin);
        }
      });
    },
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
        loader: 'html-loader'
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
        bower: path.join(__dirname, 'bower_components'),
        components: path.join(__dirname, 'components'),
        assets: path.join(__dirname, 'assets')
      }
    }
  };

}());
