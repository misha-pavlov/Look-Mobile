import { Posts, User } from '../../types/graphql';

export type TPostItem = {
  post: Posts;
  currentUser: User;
  showAllComments?: boolean;
};
