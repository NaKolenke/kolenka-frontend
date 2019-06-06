process.env.VUE_APP_VERSION = require('./package.json').version
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/content': {
          target: 'https://beta.kolenka.net',
          secure: false
        }
      },
      allowedHosts: [
        'kolenka.net',
        'youtube.com'
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      //new BundleAnalyzerPlugin()
    ]
  }
}
