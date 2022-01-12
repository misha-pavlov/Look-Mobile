import { gql } from '@apollo/client';

export const UNBLOCK_USER = gql`
  mutation doUnblocked($userId: String!, $targetUserId: String!) {
    doUnblocked(userId: $userId, targetUserId: $targetUserId) {
      blocked
    }
  }
`;
