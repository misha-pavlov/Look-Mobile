import gql from 'graphql-tag';

export const ADD_USER = gql`
  mutation addUser($userName: String, $email: String, $password: String) {
    addUser(userName: $userName, email: $email, password: $password) {
      _id
      email
      userName
      password
    }
  }
`;
