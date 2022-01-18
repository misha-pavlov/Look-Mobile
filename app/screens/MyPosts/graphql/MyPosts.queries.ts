import gql from 'graphql-tag';

export const GET_POSTS_FOR_USER = gql`
  query getPostsForUser($userId: String!, $limit: Int) {
    getPostsForUser(userId: $userId, limit: $limit) {
      _id
      title
      img
      time
      tags {
        _id
        title
      }
      comments {
        _id
        title
        user {
          img
        }
      }
      time
      createdByUserId
    }
  }
`;
