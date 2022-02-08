import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
  QueryLazyOptions,
} from '@apollo/client';
import { Chats, User } from '../../types/graphql';

export type TChats = {
  currentUser: User;
  loading: boolean;
  chats: [Chats];
  searchChats: [Chats];
  searchChat: (options?: QueryLazyOptions<OperationVariables>) => void;
  deleteChat: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>,
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
};
