const webpackMerge = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackBaseConfig = require('./webpack.base.js');
const { resolve} = require("path");

module.exports = webpackMerge(webpackBaseConfig, {
  
  module: {
    rules: [
      {
        test: /\.sass/,
        use: [
          'stly-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugin: [
                require('postcss-cssnext')()
              ]
            }
          },
          'sass-loader',
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        // collapseWhitespace: true, // 删除空白符与换行符
        // minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',
      template: resolve(__dirname, '../src/index.html'),
    })
  ],
  devtool: 'cheap-module-eval-source-map',

	mode: 'development'
})
