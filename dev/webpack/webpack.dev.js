const webpack = require('webpack');
const path = require('path');
const helper = require('../lib/helper');
const HtmlPlugin = require('webpack-html-assets-plugin');
const ip = require('ip').address();

module.exports = (cfg) => ({
  mode: 'development',
  devtool:'sourcemap',
  context: path.resolve(__dirname, '../../'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: helper.createDevModeEntry(cfg),
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: `http://${ip}:${cfg.serverPort}/`,
    filename: '[name].js',
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
      DEBUG: true,
      THEME:JSON.stringify(cfg.theme),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin(cfg),
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
        exclude: path.resolve(__dirname, '../../src/css/'), // 非src/css下的scss开启局部样式模式
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&sourceMap=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../../src/css/'),
        loaders: ['style-loader?sourceMap', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'],
      },
    ],
  },
});
