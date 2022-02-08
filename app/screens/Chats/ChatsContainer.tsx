import { compose } from 'recompose';
import React from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import Chats from './Chats';
import { TChats } from './Chats.types';
import { GET_USER_CHATS, SEARCH_CHAT } from './gql/Chats.queries';
import { DELETE_CHAT } from './gql/Chats.mutations';

const withGetUserChats = (BaseComponent: React.FC<TChats>) => {
  return (props: TChats) => {
    const { currentUser } = props;

    const { data, loading } = useQuery(GET_USER_CHATS, {
      variables: { userId: currentUser?._id },
      skip: !currentUser?._id,
    });

    return <BaseComponent {...props} loading={loading} chats={data?.getUserChats} />;
  };
};

const withSearchChat = (BaseComponent: React.FC<TChats>) => {
  return (props: TChats) => {
    const [searchChat, { data }] = useLazyQuery(SEARCH_CHAT);
    return <BaseComponent {...props} searchChat={searchChat} searchChats={data?.searchChat} />;
  };
};

const withDeleteChat = (BaseComponent: React.FC<TChats>) => {
  return (props: TChats) => {
    const [mutate] = useMutation(DELETE_CHAT, { onError: e => console.log('DELETE_CHAT = ', e) });
    return <BaseComponent {...props} deleteChat={mutate} />;
  };
};

export const ChatsContainer = compose(withCurrentUser, withGetUserChats, withSearchChat, withDeleteChat)(Chats);
