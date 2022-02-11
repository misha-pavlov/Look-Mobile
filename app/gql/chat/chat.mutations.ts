import { gql } from '@apollo/client';

export const ADD_CHAT = gql`
  mutation addChat($title: String!, $members: [String!]!, $groupImage: String!) {
    addChat(title: $title, members: $members, groupImage: $groupImage) {
      _id
      title
      members
      lastMessage
      lastMessageTime
      groupImage
      readBy
      typingUsers
    }
  }
`;
