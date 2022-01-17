import { Posts, User } from '../../types/graphql';

export type TMyPosts = {
  currentUser: User;
  loading: boolean;
  getPostsForUser?: [Posts];

  refetch?: (() => void) | undefined;
};
