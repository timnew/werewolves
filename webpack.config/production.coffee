webpack = require('webpack')
ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = 'production'

Config = require('./common')

# coffeelint: disable=max_line_length
Config.set devtool: 'source-map'
  .appendPlugins [
      new ExtractTextPlugin('main.css')
      new webpack.optimize.DedupePlugin()
      new webpack.optimize.UglifyJsPlugin()
    ]
  .appendLoaders [
      { test: /\.(png|svg)$/i, loaders: 'image?bypassOnDebug&optimizationLevel=7&interlaced=true' }
      { test: /\.(gif)$/i, loaders: 'image?bypassOnDebug&optimizationLevel=7&interlaced=false' }
      { test: /\.(jpe?g)$/i, loaders: 'image?bypassOnDebug&optimizationLevel=7&interlaced=false&progressive=true' }

      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap') }
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!stylus') }

      { test: /\.cjsx$/, loaders: 'coffee!cjsx' }
      { test: /\.coffee$/, loader: 'coffee' }
      { test: /\.jsx$|\.js$/, loader: 'jsx?harmony' }
    ]
# coffeelint: enable=max_line_length

module.exports = Config.toJson()
