import gql from 'graphql-tag';

export const HAS_UNREAD_CHATS = gql`
  query hasUnreadChats($userId: String!) {
    hasUnreadChats(userId: $userId)
  }
`;

export const GET_USER_CHATS = gql`
  query getUserChats($userId: String!) {
    getUserChats(userId: $userId) {
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
