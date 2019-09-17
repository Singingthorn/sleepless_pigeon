const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const webpackMerge = require("webpack-merge");
const webpack = require("webpack");

const webpackBaseConfig = require('./webpack.base.js');


module.exports = webpackMerge(webpackBaseConfig, {
  
  module: {
    rules: [
      {
        test: /\.sass/,
        use: [
          MiniCssExtractPlugin.loader,
          'stly-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugin: [
                require('postcss-cssnext')()
              ]
            }
          },
        ]
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new OptimizeCss({}),
    new MiniCssExtractPlugin({
			filename: `css/[name].[hash:5].min.css`
    }),
  ],

  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1, 
      maxAsyncRequests: 5,
      cacheGroups: {
        "commons": {
          name: 'commons',
          test: /[\\/]src[\\/]/,
          priority: 50,
          minChunks: 2,
          chunks: 'all',
          reuseExistingChunk: true
        },
        // vendor: {
        //   name: true,
        //   test: /[\\/]src[\\/]vendor[\\/]/,
        //   minChunks: 1, 
        //   priority: 50,
        //   chunks: 'all',
        //   reuseExistingChunk: false
        // }
      }
    },
    runtimeChunk: {
			name: 'manifest'
		}
  },

  devtool: 'cheap-module-source-map',

	mode: 'production'
})