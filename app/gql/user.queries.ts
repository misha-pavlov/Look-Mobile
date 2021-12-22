import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      _id
      userName
      img
      firstName
      lastName
      description
    }
  }
`;
