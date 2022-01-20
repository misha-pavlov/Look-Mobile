import { gql } from '@apollo/client';
import { POST_FRAGMENT } from '../../../../../gql/post.queries';

export const GET_USER_POSTS = gql`
  query getUserPosts($userId: String!) {
    getUserPosts(userId: $userId) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
