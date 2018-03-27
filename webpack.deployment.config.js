const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
console.log(__dirname)
module.exports = {
  devtool: 'source-map',
  entry: [
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'tgt'),
    filename: 'bundle.js',
    publicPath: '/tgt/'
  },
  plugins: [
    new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new CopyWebpackPlugin([
      { from: 'app/app.js', to: 'app.js'},
      { from: 'app/index.html', to: 'index.html'},
      { from: 'app/global.css', to: 'global.css' },
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
          presets: ['es2015', 'react', 'stage-2' ]
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ],
  },
  target: 'node'
};
