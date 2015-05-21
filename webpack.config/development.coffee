webpack = require('webpack')

Config = require('./common')

Config.prependEntry [
      "webpack-dev-server/client?http://0.0.0.0:8888"
      'webpack/hot/only-dev-server'
    ]
  .set devtool: 'eval', debug: true
  .appendPlugins [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]
  .appendLoaders [
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, loader: "file" }
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" }
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }

      { test: /\.css$/, loader: 'style!css?sourceMap' }
      { test: /\.styl$/, loader: 'style!css?sourceMap!stylus' }

      { test: /\.cjsx$/, loaders: 'react-hot!coffee!cjsx' }
      { test: /\.coffee$/, loader: 'react-hot!coffee' }
      { test: /\.jsx$/, loader: 'react-hot!babel?optional=runtime' }
    ]

module.exports = Config.toJson()
