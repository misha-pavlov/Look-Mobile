import gql from 'graphql-tag';

export const GET_USER_CHATS = gql`
  query getUserChats($userId: String!) {
    getUserChats(userId: $userId) {
      _id
      title
      members
      lastMessage
      lastMessageTime
      groupImage
    }
  }
`;
