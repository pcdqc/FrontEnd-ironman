const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    // print: './src/print.js',
    // another: './src/another-module.js'
  },
  output: {
    filename: '[name].bundle.js',
    // chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    progress: true,
    // https: false,
    inline: true,
  },
  module:{
    rules:[
      {
        test: '/\.js$/',
        exclude: /node_modules/,
        use:['babel-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development'
    }),
    new webpack.HotModuleReplacementPlugin()
    // new ManifestPlugin(),
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       name:'common',
  //       test:'common',
  //       enforce:'true'
  //     }
  //   }
  // },
};