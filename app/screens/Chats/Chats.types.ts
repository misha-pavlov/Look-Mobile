import { OperationVariables, QueryLazyOptions } from '@apollo/client';
import { Chats, User } from '../../types/graphql';

export type TChats = {
  currentUser: User;
  loading: boolean;
  chats: [Chats];
  searchChats: [Chats];
  searchChat: (options?: QueryLazyOptions<OperationVariables>) => void;
};
