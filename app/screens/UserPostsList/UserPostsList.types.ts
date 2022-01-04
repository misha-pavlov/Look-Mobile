import { Posts, User } from '../../types/graphql';

export type TUserPostsList = {
  currentUser: User;
  posts: [Posts];
};
