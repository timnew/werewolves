var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    "webpack-dev-server/client?http://0.0.0.0:8888",
    'webpack/hot/only-dev-server',
    './src/scripts/components/route'
  ],
  devtool: 'eval',
  debug: true,
  output: {
    path: path.join(__dirname, "public"),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size.
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/), // https://github.com/webpack/webpack/issues/353
    new ExtractTextPlugin("public/bootstrap.css"),
    new ExtractTextPlugin("main.css")
  ],
  resolve: {
    // you can now require('myfile') instead of require('myfile.cjsx')
    extensions: ['', '.js', '.jsx', '.cjsx', '.coffee']
  },
  module: {
    loaders: [
      {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file"},
      {test: /.*\.json$/, loader: 'json'},
      {test: /\.css$/, loader: 'style!css' },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style!css!stylus')},
      { test: /\.cjsx$/, loaders: 'react-hot!coffee!cjsx'},
      { test: /\.coffee$/, loader: 'react-hot!coffee' },
      { test: /\.jsx$|\.js$/, loader: 'react-hot!jsx?harmony' }
    ]
  }
};
