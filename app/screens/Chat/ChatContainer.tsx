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
import { ADD_MESSAGE, SET_READ_BY } from './gql/Chat.mutations';

const withMessagesByGroupId = (BaseComponent: React.FC<TChat>) => {
  return (props: TChat) => {
    const { params } = useRoute<NAppNavigatorRouteProp<'Chat'>>();
    const { data, loading } = useQuery(GET_MESSAGES_BY_GROUP_ID, {
      variables: { groupId: '58e1631c-087b-48db-8350-31e32b39a73a' },
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

export const ChatContainer = compose(withCurrentUser, withMessagesByGroupId, withAddMessage, withSetReadBy)(Chat);
