const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');


module.exports = {
  entry: {
    libs: [
      'next-js-core2',
      path.resolve(__dirname, '../src/assets/styles/libs.scss')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/assets/vendors'),
    filename: '[name].[chunkhash:7].js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dist/assets/vendors/[name]-mainfest.json'),
      name: '[name]_library',
      context: __dirname
    }),
    new ExtractTextPlugin('[name].[hash:7].css'),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path:path.resolve(__dirname, '../dist/assets/vendors')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
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
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
    ]
  },
};
