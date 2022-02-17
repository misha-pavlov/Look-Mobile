import { NAuthStackParamList } from '../navigation/types/AuthNavigator.types';
import { NAppStackParamList } from '../navigation/types/AppNavigator.types';

export const screens = {
  /* Navigators */
  AppNavigator: 'AppNavigator' as keyof NAuthStackParamList,
  AuthNavigator: 'AuthNavigator',
  FeedNavigator: 'FeedNavigator',
  ChatNavigator: 'ChatNavigator',
  ActivityNavigator: 'ActivityNavigator',
  SearchNavigator: 'SearchNavigator',

  /* Auth */
  Start: 'Start' as keyof NAppStackParamList,
  LogIn: 'LogIn' as keyof NAuthStackParamList,
  SignUp: 'SignUp' as keyof NAuthStackParamList,

  /* Post */
  Posts: 'Posts' as keyof NAuthStackParamList,
  CreatePost: 'CreatePost' as keyof NAppStackParamList,

  /* User */
  UserProfile: 'UserProfile' as keyof NAppStackParamList,
  UserSettings: 'UserSettings' as keyof NAppStackParamList,
  UserPostsList: 'UserPostsList' as keyof NAppStackParamList,
  EditProfile: 'EditProfile' as keyof NAppStackParamList,
  ChangePassword: 'ChangePassword' as keyof NAppStackParamList,
  BlockedUsers: 'BlockedUsers' as keyof NAppStackParamList,

  /* Messages */
  RecentMessages: 'RecentMessages' as keyof NAppStackParamList,

  /* Search */
  Search: 'Search' as keyof NAppStackParamList,
  SoloPost: 'SoloPost' as keyof NAppStackParamList,

  /* Activity */
  Activity: 'Activity' as keyof NAppStackParamList,

  /* Chats */
  Chats: 'Chats' as keyof NAppStackParamList,
  AddChat: 'AddChat' as keyof NAppStackParamList,
  Chat: 'Chat' as keyof NAppStackParamList,
};
