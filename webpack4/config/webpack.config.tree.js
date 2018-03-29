const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: {
    pageA: path.resolve(__dirname, '../src/es6TreeShaking/pageA.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'],{
        root: path.resolve(__dirname, '../'), //制定插件根目录位置
        verbose: true, //开启控制台输出信息
        dry: false //启用删除文件
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            warnings: false,
          }
        }
      }),
    ]
  },
  mode: 'production'
}