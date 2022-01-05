import { Posts, User } from '../../../../types/graphql';

export type TCustomProfileTabsTypes = {
  currentUser: User;
  followers?: [User];
  posts: [Posts];
  loading: boolean;
};
