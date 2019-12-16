const { resolve} = require('path');
const isDev = process.env.NODE_ENV === 'development';
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  entry: {
    index: resolve(__dirname, '../src/index')
  },
  output: {
    path: resolve(__dirname, '../static'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.scss', '.json'],
    alias: {
      // '@components': '../src/components',
      '@contains': resolve(__dirname, '../src/contains'),
      // '@utils': resolve(__dirname, '../src/utils'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: resolve(__dirname, '../src'),
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'awesome-typescript-loader',
        options: {
          getCustomTransformers: () => ({
            before: [ tsImportPluginFactory( {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: 'css'
            }) ]
          }),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
           'css-loader',
        ],
        include: /node_modules/,
      },
      {
        test: /\.(png|jpge|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:5].[ext]',
              limit: 5000,
              outputPath: 'images'
            } 
          }, 
          {
            loader: 'image-webpack-loader',
            options: {
              disable: isDev,
              bypassOnDebug: true,
							pngquant: {
								quality: '80'
							}
            }
          }
        ],
        include: resolve(__dirname, '../src'),
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)/,
        loader: 'url-loader',
        options: {
          prefix: 'font',
          limit: 10000,
          outputPath: 'font'
        },
        include: resolve(__dirname, '../src'),
      }
    ]
  }
}