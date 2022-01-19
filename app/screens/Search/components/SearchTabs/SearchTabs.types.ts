import { Posts } from '../../../../types/graphql';

export type TSearchTabs = {
  isSearchMode: boolean;
  loading: boolean;
  getAllPosts?: [Posts];
};
