const webpackMerge = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackBaseConfig = require('./webpack.base.js');
const { resolve } = require("path");

const BIND_HOST = process.env.BIND_HOST || 'localhost';
const BIND_PORT = process.env.BIND_PORT || 9527;

module.exports = webpackMerge(webpackBaseConfig, {  
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)/,
        include: resolve(__dirname, '../src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
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

  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: resolve(__dirname, '../static'),
    historyApiFallback: true,
    open: true,
    hot: true,
    host: BIND_HOST,
    port: BIND_PORT,
    // proxy: {
    //   '/api': {
    //     target: API_URL,
    //     pathRewrite: { '^/api': '/api' },
    //     changeOrigin: true,
    //     secure: false,
    //     cookieDomainRewrite: 'localhost',
    //   },
    // },
    stats: 'errors-only',
  },
  devtool: 'cheap-module-eval-source-map',
})
