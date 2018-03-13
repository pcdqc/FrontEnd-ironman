const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: false,
    hot: true,
    progress: false,
    https: false,
    // inline: true,
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    // 查看要修补(patch)的依赖
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
})