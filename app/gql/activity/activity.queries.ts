import gql from 'graphql-tag';

export const HAS_UNREAD_ACTIVITIES = gql`
  query hasUnreadActivities($userId: String!) {
    hasUnreadActivities(userId: $userId)
  }
`;

export const GET_USER_ACTIVITIES = gql`
  query getUserActivities($userId: String!) {
    getUserActivities(userId: $userId) {
      _id
      actionUserId
      targetUserId
      commentText
      postImage
      date
    }
  }
`;
