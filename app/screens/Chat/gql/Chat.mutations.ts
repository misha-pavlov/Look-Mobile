import gql from 'graphql-tag';

export const ADD_MESSAGE = gql`
  mutation addMessage($body: String!, $userSentId: String!, $groupId: String!, $reply: String) {
    addMessage(body: $body, userSentId: $userSentId, groupId: $groupId, reply: $reply) {
      _id
    }
  }
`;

export const SET_READ_BY = gql`
  mutation setReadBy($userId: String!, $messageId: String!) {
    setReadBy(userId: $userId, messageId: $messageId)
  }
`;

export const DELETE_MESSAGE = gql`
  mutation deleteMessage($messageId: String!) {
    deleteMessage(messageId: $messageId)
  }
`;

export const UPDATE_TYPING_USERS = gql`
  mutation updateTypingUsers($chatId: String!, $newArray: [String!]!) {
    updateTypingUsers(chatId: $chatId, newArray: $newArray)
  }
`;
