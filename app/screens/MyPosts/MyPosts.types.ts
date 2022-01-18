import { Posts, User } from '../../types/graphql';

type TFetchMore = {
  variables: { limit: number };
};

export type TMyPosts = {
  currentUser: User;
  loading: boolean;
  getPostsForUser?: [Posts];

  refetch?: (() => void) | undefined;
  fetchMore: (props: TFetchMore) => void;
};
