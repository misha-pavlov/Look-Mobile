import gql from 'graphql-tag';
import { POST_FRAGMENT } from '../../../gql/post/post.queries';

export const GET_POSTS_BY_TITLE = gql`
  query getPostsByTitle($title: String!) {
    getPostsByTitle(title: $title) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;

export const GET_POSTS_BY_TAG = gql`
  query getPostsByTag($tag: String!) {
    getPostsByTag(tag: $tag) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
