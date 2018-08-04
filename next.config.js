const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript({
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack(config, options) {
    return config
  },
  distDir: '../build'
})

