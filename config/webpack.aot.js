var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  entry: {
    'polyfills': './dist/ngc-compiled/polyfills.js',
    'vendor': './dist/ngc-compiled/vendor.js',
    'app': './dist/ngc-compiled/main.aot.js'
  },

  devtool: 'source-map',

  output: {
    path: helpers.root('dist/aot'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false
    }),
    new webpack.NoErrorsPlugin(),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: {
    //     keep_fnames: true
    //   },
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
