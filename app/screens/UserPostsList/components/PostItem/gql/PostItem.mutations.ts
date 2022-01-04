import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation addComment($title: String!, $userId: String!, $postId: String!) {
    addComment(title: $title, userId: $userId, postId: $postId) {
      comments {
        _id
        title
        user {
          userName
          img
        }
      }
    }
  }
`;
