var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/js/app.js'
  ],

  output: {
    path: './app/dist',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },

  target: "atom",

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
  ]
}