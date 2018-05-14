const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval',
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
    path: `${__dirname}/dist`,
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
            presets: ["es2015", "stage-0", 'react']
          }
        },
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/views/template.ejs'
    })
  ]
};
