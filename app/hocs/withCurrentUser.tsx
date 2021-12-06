import React, { ComponentType } from 'react';
import { useQuery } from 'react-apollo';
import { ActivityIndicator } from 'react-native';
import { useUserId } from '../hooks/useUserId';
import { GET_USER } from '../gql/user.queries';
import { ApolloFetchPolicy } from '../common/apollo';

export const withCurrentUser = (BaseComponent: ComponentType) => {
  return (props: any) => {
    const { userId } = useUserId();

    const { data } = useQuery(GET_USER, {
      variables: { userId },
      fetchPolicy: ApolloFetchPolicy.NetworkOnly,
    });

    return data?.getUser ? <BaseComponent {...props} currentUser={data?.getUser} /> : <ActivityIndicator />;
  };
};
