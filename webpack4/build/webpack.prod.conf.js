const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new ExtractTextPlugin("style.css"),
    new ManifestPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
});