const webpack = require('webpack') 
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: {
    pageA: [path.resolve(__dirname, '../src/multiple/pageA.js')],
    pageB: [path.resolve(__dirname, '../src/multiple/pageB.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
  },
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor',
  //     minChunks: 2,
  //   }),
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'manifest',
  //     chunks: ['vendor']
  //   })
  // ]
  plugins: [
    new CleanWebpackPlugin(['dist'],{
        root: path.resolve(__dirname, '../'), //制定插件根目录位置
        verbose: true, //开启控制台输出信息
        dry: false //启用删除文件
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'vendor'
    },
    splitChunks: {
      cacheGroups: {
        name: 'mainfest',
      }
    }
  },
  mode: 'development',
  devtool: 'inline-source-map'
}