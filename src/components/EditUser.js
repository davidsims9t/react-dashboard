/* @flow */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TextField, RaisedButton, Snackbar } from 'material-ui';
import Progress from './Progress';
import { getProfile } from '../utils/auth';

const styles = {
    wrapper: {
        width: 1170,
        margin: '40px auto'
    }
};

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isOpen: false,
        message: "",
        email: getProfile().email,
        name: getProfile().nickname
    };
  }

  editUser = () => {
    const variables = {
        email: this.state.email,
        name: this.state.name
    };

    this.props.editUser({ variables })
      .then((response) => {
        this.setState({
            isOpen: true,
            message: "Profile updated!"
        });
      }).catch((e) => {
        this.setState({
            isOpen: true,
            message: "An error occured"
        });
      });
  }

  onSubmit = () => {
      this.editUser();
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
            <h1>Edit User</h1>
            <form onSubmit={this.onSubmit}>
                <TextField onChange={(e, newValue) => this.setState({
                    name: newValue
                })} fullWidth floatingLabelText="Name" defaultValue={this.props.data.user.name} />
                <TextField onChange={(e, newValue) => this.setState({
                    email: newValue
                })} fullWidth floatingLabelText="Email" defaultValue={this.props.data.user.email} />
                <RaisedButton label="Submit" onClick={this.onSubmit} primary={true} />
            </form>
            <br />
            <RaisedButton label="Go Back" primary={true} onClick={() => this.props.history.replace('/')} />
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

const editUser = gql`
  mutation ($name: String!, $email: String!) {
    editUser(name: $name, email: $email) {
      id
      email
      name
    }
  }
`;

const userQuery = gql`
  query ($sub: String!) {
    user(sub:$sub) {
      id
      email
      name
    }
  }
`;

export default graphql(editUser, {name: 'editUser'})(
  graphql(userQuery, {
    options: {
        variables: {
            sub: getProfile().sub
        },
        fetchPolicy: 'network-only'
    }
  })(withRouter(EditUser))
);
