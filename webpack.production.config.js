const webpack = require('webpack');
const path = require('path');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const Merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.config.js');


let config = Merge.smart(baseWebpackConfig, {
  devtool: 'cheap-source-map',
  output: {
    path: __dirname + '/disk',
    publicPath: '',
    filename: 'js/[name]-main-[hash:8].min.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      include: path.resolve(__dirname, 'src'),
      loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","postcss-loader","sass-loader"]
        })
    }]
  },
  plugins: [
    new uglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("css/[name]-main-[hash:8].css"),
    new HtmlWebpackPlugin({
      filename: 'pc.html',
      template: './src/pc/index.html',
      inject: 'body',
      hash: false,
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      },
      excludeChunks: ["mobile", "index"]
    }),
    new HtmlWebpackPlugin({
      filename: 'mobile.html',
      template: './src/mobile/index.html',
      inject: 'body',
      hash: false,
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      },
      excludeChunks: ["pc", "index"]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body',
      hash: false,
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      },
      excludeChunks: ["pc", "mobile"]
    })
  ]
});

config.entry = {
  mobile: [path.resolve(__dirname, 'src/mobile/main.jsx')],
  pc: [path.resolve(__dirname, 'src/pc/main.js')],
  index: [path.resolve(__dirname, 'src/main.js')]
};

module.exports = config;
