import { useQuery } from '@apollo/client';
import { GET_USER } from '../gql/user/user.queries';
import { ApolloFetchPolicy } from '../common/apollo';
import { User } from '../types/graphql';

export const useGetUser = (userId: string): User => {
  const { data } = useQuery(GET_USER, {
    variables: { userId },
    fetchPolicy: ApolloFetchPolicy.NetworkOnly,
    pollInterval: 2000,
  });

  return data ? data?.getUser : undefined;
};
