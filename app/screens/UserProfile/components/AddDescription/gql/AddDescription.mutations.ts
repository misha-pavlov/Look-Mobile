import { gql } from '@apollo/client';

export const SET_DESCRIPTION = gql`
  mutation setDesc($userId: String!, $newDesc: String!) {
    setDesc(userId: $userId, newDesc: $newDesc) {
      _id
    }
  }
`;
