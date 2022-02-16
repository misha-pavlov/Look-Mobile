import React from 'react';
import { useQuery } from '@apollo/client';
import { TChats } from '../screens/Chats/Chats.types';
import { GET_USER_CHATS } from '../gql/chat/chat.queries';

const withGetUserChats = (BaseComponent: React.FC<TChats>) => {
  return (props: TChats) => {
    const { currentUser } = props;

    const { data, loading } = useQuery(GET_USER_CHATS, {
      variables: { userId: currentUser?._id },
      skip: !currentUser?._id,
      pollInterval: 5000,
    });

    return <BaseComponent {...props} loading={loading} chats={data?.getUserChats} />;
  };
};

export default withGetUserChats;
