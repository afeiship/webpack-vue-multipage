'use strict';

const {join, resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {initEntries, config, argEnv, cssLoader, sassLoader, postcssLoader} = require('./base.config');
const {entries, htmlWebpackPluginArray,} = initEntries();

module.exports = {
  entry: entries,
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'assets/scripts/[name].js',
    publicPath: config[argEnv].publicPath
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      assets: join(__dirname, '../src/assets'),
      components: join(__dirname, '../src/components'),
      services: join(__dirname, '../src/components/services'),
      interceptors: join(__dirname, '../src/components/interceptors'),
      images: join(__dirname, '../src/assets/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['css-hot-loader'].concat(
              ExtractTextPlugin.extract({
                use: [cssLoader, postcssLoader],
                fallback: 'style-loader'
              })
            ),
            scss: ['css-hot-loader'].concat(
              ExtractTextPlugin.extract({
                use: [cssLoader, postcssLoader, sassLoader],
                fallback: 'style-loader'
              })
            ),
            postcss: ['css-hot-loader'].concat(
              ExtractTextPlugin.extract({
                use: [cssLoader, postcssLoader],
                fallback: 'style-loader'
              })
            )
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-hot-loader', 'css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        loader: 'import-glob-loader',
        enforce: "pre"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-hot-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|mp4|mp3)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/fonts/[name].[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 3,
          name: 'commons',
          enforce: true
        }
      }
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin(config.plugins.extractText),
    new webpack.ProvidePlugin(config.plugins.provide),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dist/assets/vendors/libs-mainfest.json') // 指向生成的manifest.json
    }),
    ...htmlWebpackPluginArray
  ]
};
