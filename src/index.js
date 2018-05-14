/* @flow */
// External Libraries
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, IndexRoute, hashHistory } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Components
import Wrapper from './components/Wrapper';
import Home from './components/Home';
import Callback from './components/Callback';
import EditUser from './components/EditUser';

// Configure the HTTP link so we can pass in
// a JWT authentication header.
const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_ENDPOINT
});

// Sets the authentication header with an authentication token from local storage
const middlewareLink = new ApolloLink((operation, forward) => {
  if (localStorage.getItem("id_token")) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${localStorage.getItem("id_token")}`
      }
    });
  }
  return forward(operation);
});

const link = middlewareLink.concat(httpLink);

// Apollo client with instructions to identify records by the id attribute.
// Every record should have an id attribute.
// Configure out network interface.
const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  link,
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id
  })
});

const Root = (): React.Node => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Wrapper>
          <Route exact path="/" component={Home} />
          <Route path="/callback" component={Callback} />
          <Route exact path="/edit" component={EditUser} />
        </Wrapper>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.getElementById('mount')
);
