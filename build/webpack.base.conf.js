'use strict';

const { join, resolve } = require('path');
const webpack = require('webpack');
const glob = require('glob');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bundleConfig = require("../dist/assets/vendors/bundle-config.json");
const argv = require('yargs').argv;
const argEnv = argv.env || 'dev';
const extractCSS = new ExtractTextPlugin({
  filename: 'assets/styles/[name].css',
  allChunks: true
});
const CSS_HOT_LOADER = ['css-hot-loader'];

const extractSASS = new ExtractTextPlugin({
  filename: 'assets/styles/[name].css',
  allChunks: true
});

const entries = {};
const chunks = [];
const htmlWebpackPluginArray = [];

glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0];
  entries[chunk] = path;
  chunks.push(chunk);
  const filename = chunk + '.html';
  const basePath = argEnv === 'dev' ? '/dist/assets/vendors/' : '/assets/vendors/';
  const htmlConf = {
    filename: filename,
    template: path.replace(/.js/g, '.ejs'),
    inject: 'body',
    favicon: './src/assets/images/logo.png',
    libJs: [basePath, bundleConfig.libs.js].join(''),
    libCss: [basePath, bundleConfig.libs.css].join(''),
    hash: true,
    chunks: ['commons', chunk]
  };
  htmlWebpackPluginArray.push(new HtmlWebpackPlugin(htmlConf));
});

const styleLoaderOptions = {
  loader: 'style-loader',
  options: {
    sourceMap: true
  }
};

const cssOptions = [
  { loader: 'css-loader', options: { sourceMap: true } },
  { loader: 'postcss-loader', options: { sourceMap: true } }
];

const sassOptions = [...cssOptions, {
  loader: 'sass-loader',
  options: {
    sourceMap: true
  }
}];


const config = {
  entry: entries,
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'assets/scripts/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      assets: join(__dirname, '../src/assets'),
      components: join(__dirname, '../src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: CSS_HOT_LOADER.concat(ExtractTextPlugin.extract({
              use: cssOptions,
              fallback: styleLoaderOptions
            })),
            scss: CSS_HOT_LOADER.concat(ExtractTextPlugin.extract({
              use: sassOptions,
              fallback: styleLoaderOptions
            })),
            postcss: CSS_HOT_LOADER.concat(ExtractTextPlugin.extract({
              use: cssOptions,
              fallback: styleLoaderOptions
            }))
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
        use: CSS_HOT_LOADER.concat(ExtractTextPlugin.extract({
          use: cssOptions,
          fallback: styleLoaderOptions
        }))
      },
      {
        test: /\.scss$/,
        loader: 'import-glob-loader',
        enforce: "pre"
      },
      {
        test: /\.scss$/,
        use: CSS_HOT_LOADER.concat(ExtractTextPlugin.extract({
          use: sassOptions,
          fallback: styleLoaderOptions
        }))
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
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
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
    extractSASS,
    extractCSS,
    new webpack.ProvidePlugin({
      Vue: 'vue',
      nx: 'next-js-core2'
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dist/assets/vendors/libs-mainfest.json') // 指向生成的manifest.json
    })
  ]
};

config.plugins = [
  ...config.plugins,
  ...htmlWebpackPluginArray
];

module.exports = config;
