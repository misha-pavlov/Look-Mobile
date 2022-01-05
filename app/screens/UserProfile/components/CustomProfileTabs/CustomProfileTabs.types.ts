import { Posts, User } from '../../../../types/graphql';

export type TCustomProfileTabs = {
  currentUser: User;
  user: User;
  followers?: [User];
  following?: [User];
  posts: [Posts];
  loading: boolean;
  route?: {
    params: {
      createdByUserId?: string;
    };
  };
};

export type TCustomProfileTabsContainer = {
  currentUser: User;
  user: User;
};
