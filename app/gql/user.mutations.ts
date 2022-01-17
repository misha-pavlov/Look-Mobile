import { gql } from '@apollo/client';

export const DO_FOLLOW = gql`
  mutation doFollow($isFollow: Boolean!, $userId: String!, $followUserId: String!) {
    doFollow(isFollow: $isFollow, userId: $userId, followUserId: $followUserId) {
      _id
    }
  }
`;

export const UNBLOCK_USER = gql`
  mutation doUnblocked($userId: String!, $targetUserId: String!) {
    doUnblocked(userId: $userId, targetUserId: $targetUserId) {
      blocked
    }
  }
`;
