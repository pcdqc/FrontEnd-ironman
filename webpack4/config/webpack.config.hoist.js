const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: {
    pageA: path.resolve(__dirname, '../src/hoist/pageA.js'),
    pageB: path.resolve(__dirname, '../src/hoist/pageB.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin(['dist'],{
        root: path.resolve(__dirname, '../'), //制定插件根目录位置
        verbose: true, //开启控制台输出信息
        dry: false //启用删除文件
    })
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        name: 'common',
        chunks: "initial"
      }
    }
  },
  mode: 'development',
  devtool: 'inline-source-map'
}