import { gql } from '@apollo/client';

export const EDIT_PROFILE = gql`
  mutation changeUserMainFields(
    $userId: String!
    $userName: String!
    $email: String!
    $firstName: String
    $lastName: String
    $img: String
  ) {
    changeUserMainFields(
      userId: $userId
      userName: $userName
      email: $email
      firstName: $firstName
      lastName: $lastName
      img: $img
    ) {
      userName
    }
  }
`;
