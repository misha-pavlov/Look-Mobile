import gql from 'graphql-tag';

export const POST_FRAGMENT = gql`
  fragment PostFragment on Posts {
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
`;
