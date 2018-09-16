const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const DEBUG = ENV !== 'production';

const sassLoaders = [
  'style-loader',
  { loader: 'css-loader', options: { importLoaders: 1 } },
  'postcss-loader',
  'sass-loader',
];

module.exports = {
  target: 'web',
  entry: {
    app: [
      './src',
      './src/styles/index.scss',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, '../src'),
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: DEBUG ? sassLoaders : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: sassLoaders.filter(f => (f !== 'style-loader')),
        }),
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),
  ],
};
