const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/js/index.js',
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'cache-loader',
          'vue-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'cache-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
   // runtimeChunk: true
  },
  // devtool: 'eval',
  devServer: {
    contentBase: './build',
    allowedHosts: [
      'kolenka.net',
      'youtube.com'
    ],
    historyApiFallback: {
    },
    proxy: {
      '/content': {
        target: 'https://beta.kolenka.net',
        secure: false
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "index.css"
    }),
    // new BundleAnalyzerPlugin(),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /en|ru/
    )
  ]
};
