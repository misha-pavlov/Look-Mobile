import { gql } from '@apollo/client';

export const GET_USER_POSTS = gql`
  query getUserPosts($userId: String!) {
    getUserPosts(userId: $userId) {
      _id
      title
      img
      tags {
        _id
        title
      }
      comments {
        _id
        title
        user {
          img
          userName
        }
      }
      createdByUserId
    }
  }
`;
