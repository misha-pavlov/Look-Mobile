import gql from 'graphql-tag';

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getAllPosts {
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
