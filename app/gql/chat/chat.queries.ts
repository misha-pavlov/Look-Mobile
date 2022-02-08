import gql from 'graphql-tag';

export const HAS_UNREAD_CHATS = gql`
  query hasUnreadChats($userId: String!) {
    hasUnreadChats(userId: $userId)
  }
`;
