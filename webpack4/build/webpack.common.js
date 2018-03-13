const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

cssLoader = {}
if(process.env.NODE_ENV === 'production') {
  cssLoader = {
    css: ExtractTextPlugin.extract({
      use: 'vue-style-loader!css-loader'
    }),
    scss: ExtractTextPlugin.extract({
      use:[
        'css-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: 'src/lib/sass/common.scss'
          }
        }
      ]
    }),
  }
}else{
  cssLoader = {
    css: 'vue-style-loader!css-loader',
    scss: 
        ['vue-style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: 'src/lib/sass/common.scss'
          }
        }]
  }
}
module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module:{
    rules:[
      // {
      //   enforce: 'pre',
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      // { test: /\.html$/, use: 'vue-template-loader' },
      { test: /(\.css$)/, loaders:[ 'style-loader', 'css-loader' ] },
      // { test: /(\.css$)/, loaders: ['style-loader', 'css-loader', 'postcss-loader'] }
      {
        test: /\.vue/,
        loader: 'vue-loader',
        options: {
          hotReload: true,
          loaders: cssLoader
        }
      },
      // { test: /\.scss$/, use: ['style-loader','css-loader','postcss-loader','sass-loader']},
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
  ],
};