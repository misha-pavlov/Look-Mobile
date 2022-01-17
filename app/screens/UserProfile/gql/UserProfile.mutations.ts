import { gql } from '@apollo/client';

export const BLOCK_USER = gql`
  mutation block($userId: String!, $targetUserId: String!) {
    block(userId: $userId, targetUserId: $targetUserId) {
      _id
    }
  }
`;
