import { compose } from 'recompose';
import React from 'react';
import { useQuery } from '@apollo/client';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import Chats from './Chats';
import { TChats } from './Chats.types';
import { GET_USER_CHATS } from './gql/Chats.queries';

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

export const ChatsContainer = compose(withCurrentUser, withGetUserChats)(Chats);