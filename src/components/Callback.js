/* @flow */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getAndStoreParameters, getIdToken, getEmail, getName } from '../utils/auth';

class Callback extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getAndStoreParameters(() => {
      this.addUser();
    });
  }

  addUser = () => {
    const variables = {
      email: getEmail(),
      name: getName()
    };

    this.props.addUser({ variables })
      .then((response) => {
        console.log(response);
          // localStorage.setItem('userId', response.data.createUser.id);
          // this.props.router.replace('/');
      }).catch((e) => {
        console.log(e);
        // this.props.router.replace('/');
      });
  }

  render() {
    return null;
  }
}

const addUser = gql`
  mutation ($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(addUser, {name: 'addUser'})(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(withRouter(Callback))
);
