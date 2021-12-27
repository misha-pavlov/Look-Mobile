import { UserProfileTabs } from '../config/constants';

export const toValue = (tabName: string) => {
  switch (tabName) {
    case UserProfileTabs.POSTS:
      return 1;
    case UserProfileTabs.FOLLOWERS:
      return 100;
    default:
      return 237;
  }
};
