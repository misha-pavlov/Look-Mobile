import gql from 'graphql-tag';

export const GET_USER_ACTIVITIES = gql`
  query getUserActivities($userId: String!) {
    getUserActivities(userId: $userId) {
      _id
      actionUserId
      targetUserId
      commentText
      postId
      date
    }
  }
`;
