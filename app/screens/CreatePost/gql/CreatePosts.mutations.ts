import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation addPost($userId: String!, $title: String!, $img: String!, $tags: [TagInput]!) {
    addPost(userId: $userId, title: $title, img: $img, tags: $tags) {
      _id
    }
  }
`;
