import gql from 'graphql-tag';
import { POST_FRAGMENT } from '../../../../../gql/post/post.queries';

export const GET_POST = gql`
  query getPost($postId: String!) {
    getPost(postId: $postId) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
