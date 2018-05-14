import gql from 'graphql-tag';

export default gql`
  mutation AddUser($name: String!, $email: Int) {
    addUser(name: $name, email: $email) {
      name
      email
    }
  }
`;
