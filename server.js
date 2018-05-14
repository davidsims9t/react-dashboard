/* @flow */

// Server dependencies
const express = require('express');
const expressGraphQL = require('express-graphql');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./server/schema');

const app = express();
mongoose.Promise = Promise;

// Client dependencies
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// Global variables
require('dotenv').load();

// Authentication middleware for making authenticated requests with JWTs and Auth0.
const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://react-dashboard.auth0.com/.well-known/jwks.json',
})

const auth = jwt({
  secret,
  audience: process.env.AUTH0_CLIENT_ID,
  algorithms: ['RS256'],
  issuer: 'https://react-dashboard.auth0.com/',
  credentialsRequired: false,
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1].trim();
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
});
app.use(auth);

// Mongoose connection
mongoose.connect(process.env.MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Mongoose connection open'))
  .on('error', error => console.error('Something went wrong: ', error));

// GraphQL endpoint with graphiql
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

// Webpack middleware
if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

app.use(express.static('dist'));

app.get('*', (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

// Start the server
app.listen(process.env.PORT, () => console.log('Running on port ' + process.env.PORT));
