/* @flow */
import React, { Component } from 'react';
import { RaisedButton, List, ListItem, Subheader, Avatar } from 'material-ui';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { login, isLoggedIn, getIdToken } from '../utils/auth';
import Progress from './Progress';

const styles = {
  wrapper: {
    width: 1170,
    margin: '40px auto'
  }
};

class Home extends Component {
  render() {
    if (this.props.data.loading) {
      return (
        <div style={styles.wrapper}>
          <Progress />
        </div>
      );
    }
    console.log(this.props.data);

    return (
      <div style={styles.wrapper}>
        <RaisedButton label="Sign Up / Log In" onClick={() => !isLoggedIn() ? login() : ''} primary={true} />
        <List>
          <Subheader>Users</Subheader>
          <ListItem
            primaryText="Brendan Lim"
            leftAvatar={<Avatar src="images/ok-128.jpg" />}
          />
        </List>
      </div>
    );
  }
}

const query = gql`
{
  users {
    id
    name
    email
  }
}
`;

export default graphql(query)(Home);
