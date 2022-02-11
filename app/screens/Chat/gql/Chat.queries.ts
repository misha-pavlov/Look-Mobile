import gql from 'graphql-tag';

export const GET_MESSAGES_BY_GROUP_ID = gql`
  query getMessagesByGroupId($groupId: String!) {
    getMessagesByGroupId(groupId: $groupId) {
      _id
      body
      userSentId
      groupId
      readBy
    }
  }
`;

export const GET_CHAT = gql`
  query getChat($chatId: String!) {
    getChat(chatId: $chatId) {
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
