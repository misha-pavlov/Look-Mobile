import gql from 'graphql-tag';

export const HAS_UNREAD_ACTIVITIES = gql`
  query hasUnreadActivities($userId: String!) {
    hasUnreadActivities(userId: $userId)
  }
`;
