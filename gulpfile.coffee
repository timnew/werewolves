# gulp modules
gulp = require 'gulp'
runSequence = require 'run-sequence'
gutil = require 'gulp-util'
stylus = require 'gulp-stylus'
minifyHTML = require 'gulp-minify-html'
del = require 'del'

# webpack modules
webpack = require 'webpack'
WebpackDevServer = require 'webpack-dev-server'
webpackConfig = require './webpack.config.js'
webpackProductionConfig = require './webpack.production.config.js'

# util
size = require 'gulp-size'
map = require 'map-stream'
touch = require 'touch'

paths = {
  dest: 'public'
}

devServer = {}

# CSS
gulp.task 'css', ->
  gulp.src ['src/styles/*.styl']
  .pipe stylus compress: true
  .on 'error', (err) ->
    gutil.log err
    @emit('end')
  .pipe size()
  .pipe gulp.dest(paths.dest)
  .pipe map (a, cb) ->
    if devServer.invalidate? then devServer.invalidate()
    cb()

# this is for PROD
gulp.task 'minify-html', ->
  opts = { comments: true, spare: true }

  gulp.src('assets/**/*.html')
  .pipe minifyHTML(opts)
  .pipe gulp.dest(paths.dest)
  .pipe size()

# this is for PROD
gulp.task 'copy-assets-ignore-html', ->
  gulp.src ['assets/**', '!assets/**/*.html']
  .pipe gulp.dest(paths.dest)
  .pipe size()

# this is for DEV
gulp.task 'copy-assets', ->
  gulp.src(['assets/**'])
  .pipe(gulp.dest(paths.dest))
  .pipe(size())

gulp.task "webpack:build", (callback) ->
# Run webpack.
  webpack webpackProductionConfig, (err, stats) ->
    throw new gutil.PluginError("webpack:build", err)  if err
    gutil.log "[webpack:build]", stats.toString(colors: true)
    callback()
    return

# Create a single instance of the compiler to allow caching.
devCompiler = webpack(webpackConfig)

gulp.task "webpack:build-dev", (callback) ->

# Run webpack.
  devCompiler.run (err, stats) ->
    throw new gutil.PluginError("webpack:build-dev", err)  if err
    gutil.log "[webpack:build-dev]", stats.toString(colors: true)
    callback()
    return

  return


gulp.task "webpack-dev-server", (callback) ->
# Start a webpack-dev-server.
  devServer = new WebpackDevServer webpack(webpackConfig),
    contentBase: './' + paths.dest + '/'
    hot: true
    watchDelay: 100
    noInfo: true

  devServer.listen "8888", "0.0.0.0", (err) ->
    throw new gutil.PluginError("webpack-dev-server", err) if err
    gutil.log "[webpack-dev-server]", "http://localhost:8888"
    callback()

  return

########################################################
# Below are the recommended gulp commands for new users
########################################################

# gulp  ( with no argument )
# description -- the same as build
gulp.task 'default', ->
  gulp.start 'build'

# gulp build
# description -- create a production ready snapshot into paths.dest folder ( default ./public )
gulp.task 'build', ['webpack:build', 'css', 'copy-assets-ignore-html', 'minify-html']

# gulp dev
# description -- start a development server
gulp.task 'dev', ['copy-assets'], ->
  runSequence 'css', 'webpack-dev-server', ->
    gulp.watch(['src/styles/**'], ['css'])
    gulp.watch(['assets/**'], ['copy-assets'])

# gulp clean
# description -- clean the paths.dest
gulp.task 'clean', (done) ->
  del([paths.dest + '/*'], done)
