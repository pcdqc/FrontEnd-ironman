const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    compress: false,
    hot: true,
    progress: true,
    https: false,
    inline: true,
  },
  module:{
    rules:[
      // {
      //   enforce: 'pre',
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      { test: /(\.css$)/, loaders:[ 'style-loader', 'css-loader' ] },
      // { test: /(\.css$)/, loaders: ['style-loader', 'css-loader', 'postcss-loader'] }
      {
        test: /\.vue/,
        loader: 'vue-loader',
        options: {
          hotReload: true,
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }),
            scss: 'vue-style-loader!css-loader!sass-loader!sass-resources-loader', // <style lang="scss">
            sass: ExtractTextPlugin.extract({
              use:[
                'css-loader',
                'sass-loader',
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: [
                      path.resolve(__dirname, 'src/lib/sass/common.scss'),
                    ]
                  }
                }
              ],
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      { test: /\.scss$/, use: ['style-loader','css-loader','postcss-loader','sass-loader']},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:['babel-loader']
      }
      
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'index.html',
      template: 'index.html'
    }),
    new ExtractTextPlugin("style.css"),
    // 查看要修补(patch)的依赖
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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