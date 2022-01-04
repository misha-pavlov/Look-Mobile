import React from 'react';
import { useQuery } from '@apollo/client';
import { useUserId } from '../hooks/useUserId';
import { GET_USER } from '../gql/user.queries';
import { ApolloFetchPolicy } from '../common/apollo';
import { User } from '../types/graphql';
import Spinner from '../components/Spinner/Spinner';

export const withCurrentUser = (BaseComponent: (currentUser: { currentUser?: User }) => JSX.Element) => {
  return (props: { props?: { currentUser?: User } }) => {
    const { userId } = useUserId();

    const { data } = useQuery(GET_USER, {
      variables: { userId },
      fetchPolicy: ApolloFetchPolicy.NetworkOnly,
      pollInterval: 2000,
    });

    return data?.getUser ? <BaseComponent {...props} currentUser={data?.getUser} /> : <Spinner />;
  };
};
