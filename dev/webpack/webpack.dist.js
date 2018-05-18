const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const helper = require('../lib/helper');
const HtmlPlugin = require('webpack-html-assets-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'css/[name].[chunkhash:5].css',
  allChunks: true,
});

module.exports = (cfg) => ({
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  mode: 'production',
  context: path.resolve(__dirname, '../../'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: helper.createDistEntry(cfg),
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: './',
    filename: 'js/[name].[chunkhash:5].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
      DEBUG: false,
      THEME: JSON.stringify(cfg.theme),
    }),
    new HtmlPlugin(cfg),
    extractCSS,
    new CopyWebpackPlugin([
      { from: 'static/', to: 'static/' },
    ].concat(cfg.copyFile)),
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/, // 通过正则匹配js,jsx文件
        loaders: [
          {
            loader: "thread-loader",
            options: {
              workers: 2,
              workerParallelJobs: 50,
              workerNodeArgs: ['--max-old-space-size=1024'],
              poolTimeout: 2000,
              poolParallelJobs: 50,
              name: "my-pool"
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: false
            }
          }
        ],
        exclude: /node_modules/, // 跳过 node_modules 目录
        include: path.resolve(__dirname, '../../src'),
      },
      { test: /\.(jpg|gif|png|svg|ico)$/, loader: 'file-loader?name=images/[name].[ext]' },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, '../../src/css'),  // 非src/css下的scss开启局部样式模式
        use: extractCSS.extract({
          use: [
            'css-loader?minimize&modules&&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader',
            'sass-loader',
          ],
          publicPath: '../',
        }),
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../../src/css'),
        use: extractCSS.extract({
          use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
          publicPath: '../',
        }),
      },
    ],
  },
});
