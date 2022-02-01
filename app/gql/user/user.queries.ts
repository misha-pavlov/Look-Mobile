import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    _id
    userName
    email
    img
    firstName
    lastName
    description
    followers
    following
    password
    blocked
  }
`;

export const GET_USER = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_USERS = gql`
  query {
    users {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_FOLLOWERS = gql`
  query getFollowers($userId: String!) {
    getFollowers(userId: $userId) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_FOLLOWING = gql`
  query getFollowing($userId: String!) {
    getFollowing(userId: $userId) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
