import gql from 'graphql-tag';
import { POST_FRAGMENT } from '../../../gql/post.queries';

export const GET_POSTS_FOR_USER = gql`
  query getPostsForUser($userId: String!, $limit: Int) {
    getPostsForUser(userId: $userId, limit: $limit) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
