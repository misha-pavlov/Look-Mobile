import React from 'react';
import { compose } from 'recompose';
import { useMutation, useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import Chat from './Chat';
import { TChat } from './Chat.types';
import { GET_MESSAGES_BY_GROUP_ID } from './gql/Chat.queries';
import { NAppNavigatorRouteProp } from '../../navigation/types/AppNavigator.types';
import { Messages } from '../../types/graphql';
import { ADD_MESSAGE, DELETE_MESSAGE, SET_READ_BY } from './gql/Chat.mutations';

const withMessagesByGroupId = (BaseComponent: React.FC<TChat>) => {
  return (props: TChat) => {
    const { params } = useRoute<NAppNavigatorRouteProp<'Chat'>>();
    const { data, loading } = useQuery(GET_MESSAGES_BY_GROUP_ID, {
      variables: { groupId: params.chatId },
      skip: !params.chatId,
      pollInterval: 2000,
    });

    const messages = (data?.getMessagesByGroupId ? [...data?.getMessagesByGroupId].reverse() : []) as [Messages];

    return <BaseComponent {...props} loading={loading} messages={messages} />;
  };
};

const withAddMessage = (BaseComponent: React.FC<TChat>) => {
  return (props: TChat) => {
    const [mutate] = useMutation(ADD_MESSAGE, { onError: e => console.log('ADD_MESSAGE = ', e) });
    return <BaseComponent {...props} addMessage={mutate} />;
  };
};

const withSetReadBy = (BaseComponent: React.FC<TChat>) => {
  return (props: TChat) => {
    const [mutate] = useMutation(SET_READ_BY, { onError: e => console.log('SET_READ_BY = ', e) });
    return <BaseComponent {...props} setReadBy={mutate} />;
  };
};

const withDeleteMessage = (BaseComponent: React.FC<TChat>) => {
  return (props: TChat) => {
    const [mutate] = useMutation(DELETE_MESSAGE, {
      onError: e => console.log('DELETE_MESSAGE = ', e),
    });
    return <BaseComponent {...props} deleteMessage={mutate} />;
  };
};

export const ChatContainer = compose(
  withCurrentUser,
  withMessagesByGroupId,
  withAddMessage,
  withSetReadBy,
  withDeleteMessage,
)(Chat);
