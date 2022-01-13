import { gql } from '@apollo/client';

export const GET_USER_POSTS = gql`
  query getUserPosts($userId: String!) {
    getUserPosts(userId: $userId) {
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

export const GET_FOLLOWERS = gql`
  query getFollowers($userId: String!) {
    getFollowers(userId: $userId) {
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
  }
`;

export const GET_FOLLOWING = gql`
  query getFollowing($userId: String!) {
    getFollowing(userId: $userId) {
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
  }
`;
