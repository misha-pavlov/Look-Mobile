import gql from 'graphql-tag';

export const SET_UNREAD_ACTIVITY = gql`
  mutation setUnreadActivity($activityId: String!) {
    setUnreadActivity(activityId: $activityId) {
      commentText
    }
  }
`;
