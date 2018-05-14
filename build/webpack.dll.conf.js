const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 提取css
const AssetsPlugin = require('assets-webpack-plugin'); // 生成文件名，配合HtmlWebpackPlugin增加打包后dll的缓存
const {config, argEnv, cssLoader,  styleLoader, postcssLoader} = require('./base.config');


module.exports = {
  entry: {
    libs: [
      'next-js-core2',
      path.resolve(__dirname, '../src/assets/styles/libs.scss')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/assets/vendors'),
    filename: '[name].[hash:7].js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dist/assets/vendors/[name]-mainfest.json'),
      name: '[name]_library',
      context: __dirname // 执行的上下文环境，对之后DllReferencePlugin有用
    }),
    new ExtractTextPlugin('[name].[hash:5].css'),
    new AssetsPlugin({
      filename: '../dist/assets/vendors/bundle-config.json',
      path: './vendors'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: [
            cssLoader, postcssLoader,
            {
              loader: 'sass-loader',
              options: config[argEnv].plugins.sass
            }
          ],
          fallback: styleLoader
        }))
      },
    ]
  },
};
