const withTypescript = require('@zeit/next-typescript')
const withLess = require('@zeit/next-less')

module.exports = withTypescript(
  withLess({
    cssModules: true,
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    webpack(config, options) {
      return config
    },
    distDir: '../build'
  })
)
