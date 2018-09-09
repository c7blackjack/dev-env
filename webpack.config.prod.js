import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [

    new ExtractTextPlugin('[name].[contenthash].css'),

    //Hash files for new names
    new WebpackMd5Hash(),

    //This CommonsChunkPlugin makes a seperate bundle for vendors

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    //This creates a HTML file that references bundle.js
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),

    //Filter out any duplicate packages
    new webpack.optimize.DedupePlugin(),

    //Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}