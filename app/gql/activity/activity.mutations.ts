import { gql } from '@apollo/client';

export const ADD_USER_ACTIVITY = gql`
  mutation addUserActivity($actionUserId: String!, $targetUserId: String!, $commentText: String, $postImage: String) {
    addUserActivity(
      actionUserId: $actionUserId
      targetUserId: $targetUserId
      commentText: $commentText
      postImage: $postImage
    ) {
      _id
    }
  }
`;
