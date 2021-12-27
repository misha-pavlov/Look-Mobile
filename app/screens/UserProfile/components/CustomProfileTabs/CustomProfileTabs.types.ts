import { Posts, User } from '../../../../types/graphql';

export type TCustomProfileTabsTypes = {
  currentUser: User;
  posts: [Posts];
  loading: boolean;
};
