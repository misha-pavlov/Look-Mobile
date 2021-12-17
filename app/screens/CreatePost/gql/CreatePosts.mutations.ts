import gql from 'graphql-tag';

export const CREATE_POST = gql`
  mutation addPost($userId: String, $title: String, $img: String, $tags: [TagInput]) {
    addPost(userId: $userId, title: $title, img: $img, tags: $tags) {
      _id
      title
      img
      tags
      comments
      createdByUser
    }
  }
`;
