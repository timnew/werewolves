webpack = require('webpack')
ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = 'production'

Config = require('./common')

Config.set devtool: 'source-map'
  .appendPlugins [
      new ExtractTextPlugin('main.css')
      new webpack.optimize.DedupePlugin()
      new webpack.optimize.UglifyJsPlugin()
    ]
  .appendLoaders [
      { test: /\.(png)$/i, loaders: 'image?bypassOnDebug&optimizationLevel=7&interlaced=true' }
      { test: /\.(gif)$/i, loaders: 'image?bypassOnDebug&optimizationLevel=7&interlaced=false' }
      { test: /\.(jpe?g)$/i, loaders: 'image?bypassOnDebug&optimizationLevel=7&interlaced=false&progressive=true' }

      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" }
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream" }
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml" }

      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap') }
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!stylus') }

      { test: /\.cjsx$/, loaders: 'coffee!cjsx' }
      { test: /\.coffee$/, loader: 'coffee' }
      { test: /\.jsx$/, loader: 'babel?optional=runtime' }
    ]

module.exports = Config.toJson()
