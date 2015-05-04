path = require('path')
_ = require('lodash')
webpack = require('webpack')
ExtractTextPlugin = require('extract-text-webpack-plugin')

# coffeelint: disable=max_line_length
DefaultConfig =
  entry: [ './src/scripts/route' ]

  output:
    path: path.join(__dirname, "public")
    filename: 'bundle.js'

  resolveLoader:
    modulesDirectories: ['node_modules']

  plugins: [
    new webpack.DefinePlugin 'process.env.NODE_ENV': process.env.NODE_ENV==null ? "'development'" : "'#{process.env.NODE_ENV}'"
  ]

  resolve:
    extensions: ['', '.js', '.jsx', '.cjsx', '.coffee', '.css', '.styl']

  module:
    loaders: [
      { test: /\.woff$|\.ttf$/, loader: "file" }

      { test: /\.json$/, loader: 'file' }
    ]
# coffeelint: enable=max_line_length

class Config
  constructor: ->
    @config = DefaultConfig

  set: (values) ->
    _.assign @config, values
    this

  prependEntry: (entries) ->
    @config.entry = entries.concat @config.entry
    this

  appendPlugins: (plugins) ->
    @config.plugins = @config.plugins.concat plugins
    this

  appendLoaders: (loaders) ->
    @config.module.loaders = @config.module.loaders.concat loaders
    this

  toJson: ->
    @config

module.exports = new Config()
