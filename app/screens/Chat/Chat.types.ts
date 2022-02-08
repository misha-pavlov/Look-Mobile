import { ApolloCache, DefaultContext, FetchResult, MutationFunctionOptions, OperationVariables } from '@apollo/client';
import { Messages, User } from '../../types/graphql';

export type TChat = {
  currentUser: User;
  loading: boolean;
  messages: [Messages];
  addMessage: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>,
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  setReadBy: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>,
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
};
