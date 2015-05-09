path = require('path')
_ = require('lodash')
webpack = require('webpack')
ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_PATH = path.resolve(__dirname, '..', 'scripts')
require('module').Module._initPaths()

DefaultConfig =
  entry: [ './scripts/route' ]

  output:
    path: path.resolve(__dirname, '..', 'scripts')
    filename: 'bundle.js'

  resolveLoader:
    modulesDirectories: ['node_modules']

  plugins: [
    new webpack.DefinePlugin 'process.env.NODE_ENV': process.env.NODE_ENV==null ? "'development'" : "'#{process.env.NODE_ENV}'"
  ]

  resolve:
    root: process.env.NODE_PATH
    extensions: ['', '.js', '.jsx', '.cjsx', '.coffee', '.css', '.styl']

  module:
    loaders: [
      { test: /\.woff$|\.ttf$/, loader: "file" }
      { test: /\.json$/, loader: 'file' }
    ]

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
