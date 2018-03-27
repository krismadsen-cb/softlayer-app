var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'tgt'),
    filename: 'bundle.js',
    publicPath: '/app/assets/'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'app/app.js', to: 'tgt/app.js'}
    ])
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  target: 'node'
};
