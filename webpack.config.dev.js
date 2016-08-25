(function() {

  var webpack = require('webpack');
  var fs = require('fs');
  var path = require('path');
  var glob = require('glob');

  //Plugin lists:
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var PurifyCSSPlugin = require('purifycss-webpack-plugin');


  const debug = process.env.NODE_ENV !== 'production';

  function entries (globPath) {
      var files = glob.sync(globPath);
      var entries = {}, entry, dirname, basename;

      for (var i = 0; i < files.length; i++) {
          entry = files[i];
          dirname = path.dirname(entry);
          basename = path.basename(entry, '.js');
          entries[path.join(dirname, basename)] = './' + entry;
      }

      return entries;
  }

  module.exports = {
      entry: entries('src/modules/**/*.js'),
      output: {
          path: path.join(__dirname, './dist'),
          publicPath: '/assets/build/',
          filename: '[name]' + (debug ? '' : '-[chunkhash]') + '.js',
          chunkFilename: '[id]' + (debug ? '' : '-[chunkhash]') + '.js'
      },
      module: {
      loaders: [
        {
          test: /\.vue$/, loader: 'vue'
        },
        {
          test: /\.js$/, loader: 'babel', exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
        },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!less')
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
        },
        {test: /\.(gif|jpg|png)\??.*$/, loader: 'url-loader?limit=8096&name=images/[name].[ext]'},
        {test: /\.(woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8096&name=fonts/[name].[ext]'},
        {test: /\.(html|tpl)$/, loader: 'html-loader'}
      ]
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
    },
    devServer: {
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.ProvidePlugin({
        Vue: 'vue'
      }),
      new ExtractTextPlugin('styles/main.css'),
      function () {
          this.plugin('done', function (stats) {
            console.log(stats);
              stats = stats.compilation.getStats().toJson({
                  hash: true,
                  publicPath: true,
                  assets: true,
                  chunks: false,
                  modules: false,
                  source: false,
                  errorDetails: false,
                  timings: false
              });

              var json = {}, chunk;
              for (var key in stats.assetsByChunkName) {
                  if (stats.assetsByChunkName.hasOwnProperty(key)) {
                      chunk = stats.assetsByChunkName[key];
                      json[key + '.js'] = chunk[0];
                  }
              }

              fs.writeFileSync(
                  path.join(__dirname, '/dist', 'rev-manifest.json'),
                  JSON.stringify(json, null, 2)
              );
          });
      }
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
