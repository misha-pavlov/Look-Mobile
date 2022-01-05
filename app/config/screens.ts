import { NAuthStackParamList } from '../navigation/types/AuthNavigator.types';
import { NAppStackParamList } from '../navigation/types/AppNavigator.types';

export const screens = {
  /* Navigators */
  AppNavigator: 'AppNavigator',
  AuthNavigator: 'AuthNavigator',
  FeedNavigator: 'FeedNavigator',
  ChatNavigator: 'ChatNavigator',
  ActivityNavigator: 'ActivityNavigator',
  SearchNavigator: 'SearchNavigator',

  /* Auth */
  Start: 'Start',
  LogIn: 'LogIn' as keyof NAuthStackParamList,
  SignUp: 'SignUp' as keyof NAuthStackParamList,

  /* Post */
  Posts: 'Posts' as keyof NAppStackParamList,
  CreatePost: 'CreatePost' as keyof NAppStackParamList,

  /* User */
  UserProfile: 'UserProfile' as keyof NAppStackParamList,
  UserSettings: 'UserSettings' as keyof NAppStackParamList,
  UserPostsList: 'UserPostsList' as keyof NAppStackParamList,
};
