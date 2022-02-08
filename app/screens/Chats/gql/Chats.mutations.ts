import gql from 'graphql-tag';

export const DELETE_CHAT = gql`
  mutation deleteChat($chatId: String!) {
    deleteChat(chatId: $chatId)
  }
`;
