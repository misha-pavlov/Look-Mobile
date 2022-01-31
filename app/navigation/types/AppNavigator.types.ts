import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Posts, User } from '../../types/graphql';
import { SearchTabsEnum } from '../../types/customTypes';

export type NAppStackParamList = {
  Posts: undefined;
  UserProfile: {
    user: User;
  };
  CreatePost: undefined;
  UserSettings: undefined;
  UserPostsList: {
    indexItem: number;
    createdByUserId: string;
  };
  EditProfile: undefined;
  ChangePassword: undefined;
  BlockedUsers: undefined;
  RecentMessages: undefined;
  Search: {
    startTab?: SearchTabsEnum;
    tag?: string;
  };
  Start: undefined;
  SoloPost: {
    post: Posts;
    currentUser: User;
  };
  Activity: undefined;
};

export type NAppNavigatorRouteProp<ScreenName extends keyof NAppStackParamList> = RouteProp<
  NAppStackParamList,
  ScreenName
>;

export type NAppNavigatorNavigationProp<ScreenName extends keyof NAppStackParamList> = StackNavigationProp<
  NAppStackParamList,
  ScreenName
>;

export interface NAppNavigatorScreenProps<ScreenName extends keyof NAppStackParamList> {
  route: NAppNavigatorRouteProp<ScreenName>;
  navigation: NAppNavigatorNavigationProp<ScreenName>;
}
