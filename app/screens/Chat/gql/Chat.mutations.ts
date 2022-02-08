import gql from 'graphql-tag';

export const ADD_MESSAGE = gql`
  mutation addMessage($body: String!, $userSentId: String!, $groupId: String!) {
    addMessage(body: $body, userSentId: $userSentId, groupId: $groupId) {
      _id
    }
  }
`;

export const SET_READ_BY = gql`
  mutation setReadBy($userId: String!, $messageId: String!) {
    setReadBy(userId: $userId, messageId: $messageId)
  }
`;
