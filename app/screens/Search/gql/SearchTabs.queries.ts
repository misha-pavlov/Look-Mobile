import gql from 'graphql-tag';
import { USER_FRAGMENT } from '../../../gql/user/user.queries';
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

export const SEARCH_USER = gql`
  query searchUser($userName: String!) {
    searchUser(userName: $userName) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
