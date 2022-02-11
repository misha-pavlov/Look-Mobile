import { FetchResult, MutationFunctionOptions } from '@apollo/client';
import { Messages, User } from '../../types/graphql';

type TMutation = (options?: MutationFunctionOptions) => Promise<FetchResult<any>>;

export type TChat = {
  currentUser: User;
  loading: boolean;
  messages: [Messages];
  addMessage: TMutation;
  setReadBy: TMutation;
  deleteMessage: TMutation;
};
