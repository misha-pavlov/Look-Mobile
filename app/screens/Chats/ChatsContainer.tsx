import { compose } from 'recompose';
import React from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import Chats from './Chats';
import { TChats } from './Chats.types';
import { SEARCH_CHAT } from './gql/Chats.queries';
import { DELETE_CHAT } from './gql/Chats.mutations';
import withGetUserChats from '../../hocs/withGetUserChats';

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
