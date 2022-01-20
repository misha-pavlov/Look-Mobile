import { Posts, User } from '../../../../types/graphql';

export type TSearchTabs = {
  isSearchMode: boolean;
  loading: boolean;
  getAllPosts?: [Posts];
  users?: [User];
  currentUser: User;
};
