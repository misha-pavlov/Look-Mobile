import gql from 'graphql-tag';

export const SEARCH_CHAT = gql`
  query searchChat($title: String!) {
    searchChat(title: $title) {
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
