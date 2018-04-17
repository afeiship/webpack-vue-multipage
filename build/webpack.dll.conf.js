var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 提取css
var AssetsPlugin = require('assets-webpack-plugin'); // 生成文件名，配合HtmlWebpackPlugin增加打包后dll的缓存
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

module.exports = {
  entry: {
    libs: [
      'vue',
      'next-js-core2',
      path.resolve(__dirname, '../src/assets/styles/index.scss')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/vendors'),
    filename: '[name].[chunkhash:7].js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dist/vendors/[name]-mainfest.json'),
      name: '[name]_library',
      context: __dirname // 执行的上下文环境，对之后DllReferencePlugin有用
    }),
    new ExtractTextPlugin('[name].[chunkhash:7].css'),
    new AssetsPlugin({
      filename: '../dist/vendors/bundle-config.json',
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
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: sassOptions,
          fallback: styleLoaderOptions
        }))
      },
    ]
  },
}
