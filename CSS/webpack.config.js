var path = require('path')
var webpack = require('webpack')
module.exports = {
  entry: {
    app: path.resolve(__dirname, './app.js'),
    vendors: ['lodash']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader' 
      },
      {
        test: /\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        name:'vendor',
        test:'vendor',
        enforce:'true'
      }
    }
  },
  devtool: 'source-map'
}