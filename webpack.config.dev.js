var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './app/js/app.js'
  ],

  output: {
    path: './app/dist',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/app/'
  },

  devServer: {
    contentBase: './app',
    publicPath: 'http://localhost:8080/app/'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },

  target: "atom",

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
  ]
}