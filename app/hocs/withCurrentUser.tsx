import React from 'react';
import { useQuery } from '@apollo/client';
import { ActivityIndicator } from 'react-native';
import { useUserId } from '../hooks/useUserId';
import { GET_USER } from '../gql/user.queries';
import { ApolloFetchPolicy } from '../common/apollo';
import { User } from '../types/graphql';
import { BlackBlock } from '../common/common.styles';

export const withCurrentUser = (BaseComponent: (currentUser?: { currentUser?: User }) => JSX.Element) => {
  return (props: any) => {
    const { userId } = useUserId();

    const { data } = useQuery(GET_USER, {
      variables: { userId },
      fetchPolicy: ApolloFetchPolicy.NetworkOnly,
    });

    return data?.getUser ? (
      <BaseComponent {...props} currentUser={data?.getUser} />
    ) : (
      <BlackBlock>
        <ActivityIndicator />
      </BlackBlock>
    );
  };
};
