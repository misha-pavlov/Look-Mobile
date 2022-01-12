import { gql } from '@apollo/client';

export const GET_BLOCKED_USERS = gql`
  query getBlocked($userId: String!) {
    getBlocked(userId: $userId) {
      _id
      img
      userName
    }
  }
`;
