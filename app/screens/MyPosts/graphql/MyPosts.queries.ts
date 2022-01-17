import gql from 'graphql-tag';

export const GET_POSTS_FOR_USER = gql`
  query getPostsForUser($userId: String!) {
    getPostsForUser(userId: $userId) {
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
