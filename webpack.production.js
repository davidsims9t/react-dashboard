const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'app': `${__dirname}/src/index.js`,
    'graphql-tag': 'graphql-tag',
    'apollo-client': 'apollo-client',
    'react-apollo': 'react-apollo',
    'apollo-cache-inmemory': 'apollo-cache-inmemory',
    'apollo-link': 'apollo-link',
    'history': 'history',
    'material-ui': 'material-ui',
    'tcomb-form': 'tcomb-form'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'lodash': 'lodash',
    'auth0-js': 'auth0'
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }
        },
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: [
          {
            loader: 'style-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/views/template.ejs')
    })
  ]
};
