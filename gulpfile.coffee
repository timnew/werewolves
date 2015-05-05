require('coffee-script/register')

gulp = require 'gulp'
runSequence = require 'run-sequence'
gutil = require 'gulp-util'
stylus = require 'gulp-stylus'
minifyHTML = require 'gulp-minify-html'
size = require 'gulp-size'
map = require 'map-stream'
touch = require 'touch'
del = require 'del'

webpack = require 'webpack'
WebpackDevServer = require 'webpack-dev-server'

paths =
  dest: 'public'

devServer = {}

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

gulp.task 'assets:minify-html', ->

  gulp.src('assets/**/*.html')
  .pipe minifyHTML(comments: true, spare: true)
  .pipe gulp.dest(paths.dest)
  .pipe size()

gulp.task 'assets:copy-assets-ignore-html', ->

  gulp.src ['assets/**', '!assets/**/*.html']
  .pipe gulp.dest(paths.dest)
  .pipe size()

gulp.task 'assets:copy-assets', ->

  gulp.src(['assets/**'])
  .pipe(gulp.dest(paths.dest))
  .pipe(size())

gulp.task "webpack:build", (callback) ->
  config = require './webpack.config/production'

  webpack config, (err, stats) ->
    throw new gutil.PluginError("webpack:build", err)  if err
    gutil.log "[webpack:build]", stats.toString(colors: true)
    callback()
    return

gulp.task "webpack:build-dev", (callback) ->
  config = require './webpack.config/development'

  webpack config, (err, stats) ->
    throw new gutil.PluginError("webpack:build-dev", err)  if err
    gutil.log "[webpack:build-dev]", stats.toString(colors: true)
    callback()
    return

  return

gulp.task "webpack:dev-server", (callback) ->
  config = require './webpack.config/development'

  devServer = new WebpackDevServer webpack(config),
    contentBase: "./public/"
    hot: true
    quiet: false
    watchDelay: 100
    noInfo: true
    stats: { colors: true }

  devServer.listen "8888", "0.0.0.0", (err) ->
    throw new gutil.PluginError("webpack:dev-server", err) if err
    gutil.log "[webpack:dev-server]", "http://localhost:8888"
    callback()

  return

gulp.task 'default', ->
  gulp.start 'dev'

# coffeelint: disable=max_line_length
gulp.task 'build', ['webpack:build', 'css', 'assets:copy-assets-ignore-html', 'assets:minify-html']
# coffeelint: enable=max_line_length

gulp.task 'dev', ['assets:copy-assets'], ->
  runSequence 'css', 'webpack:dev-server', ->
    gulp.watch(['src/styles/**'], ['css'])
    gulp.watch(['assets/**'], ['assets:copy-assets'])

gulp.task 'clean', (done) ->
  del([paths.dest + '/*'], done)
