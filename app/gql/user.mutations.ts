import { gql } from '@apollo/client';

export const DO_FOLLOW = gql`
  mutation doFollow($isFollow: Boolean!, $userId: String!, $followUserId: String!) {
    doFollow(isFollow: $isFollow, userId: $userId, followUserId: $followUserId) {
      _id
    }
  }
`;
