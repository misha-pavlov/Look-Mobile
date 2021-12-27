import { Posts } from '../../../../../../types/graphql';

export type TUserPosts = {
  posts: [Posts];
  loading: boolean;
};
