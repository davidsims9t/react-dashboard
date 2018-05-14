/* @flow */
import React, { Component } from 'react';
import { RaisedButton, List, ListItem, Subheader, Snackbar } from 'material-ui';
import { withRouter } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { login, isLoggedIn, getIdToken, getProfile, logout } from '../utils/auth';
import Progress from './Progress';

const styles = {
  wrapper: {
    width: 1170,
    margin: '40px auto'
  }
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isOpen: false,
        message: ""
    };
  }

  onDelete = () => {
    this.props.deleteUser()
      .then((response) => {
        logout();
        this.setState({
            isOpen: true,
            message: "User deleted!"
        });
      }).catch((e) => {
        this.setState({
            isOpen: true,
            message: "An error occured"
        });
      });
  }

  render() {
    if (this.props.data.loading) {
      return (
        <div style={styles.wrapper}>
          <Progress />
        </div>
      );
    }

    return (
      <div style={styles.wrapper}>
        <RaisedButton label="Edit User" onClick={() => !isLoggedIn() ? login() : this.props.history.replace('/edit')} primary={true} />
        <List>
          <Subheader>Users</Subheader>
          {this.props.data.users.map((user) => {
            return (
              <ListItem
                onClick={this.onDelete}
                key={user.id}
                primaryText={user.name}
              />
            );
          })}
        </List>
        <Snackbar
          open={this.state.isOpen}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({isOpen: false, message: ""})}
        />
      </div>
    );
  }
}

const deleteUser = gql`
  mutation {
    deleteUser {
      id
    }
  }
`;

const query = gql`
{
  users {
    id
    name
    email
  }
}
`;

export default graphql(deleteUser, {name: 'deleteUser'})(
  graphql(query, {
    options: {
      fetchPolicy: 'network-only'
    }
  })(withRouter(Home))
);