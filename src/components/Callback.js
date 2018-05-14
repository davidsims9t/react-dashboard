/* @flow */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getAndStoreParameters, getIdToken, getProfile, getEmail, getName } from '../utils/auth';

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
      name: getName(),
      sub: getProfile().sub
    };

    this.props.addUser({ variables })
      .then((response) => {
        localStorage.setItem('userId', response.data.addUser.id);
        this.props.history.replace('/');
      }).catch((e) => {
        console.log(e);
        this.props.history.replace('/');
      });
  }

  render() {
    return null;
  }
}

const addUser = gql`
  mutation ($sub: String!, $name: String!, $email: String!) {
    addUser(sub: $sub, name: $name, email: $email) {
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
