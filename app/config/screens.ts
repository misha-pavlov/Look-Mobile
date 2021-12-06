import { NAuthStackParamList } from '../navigation/types/AuthNavigator.types';
import { NAppStackParamList } from '../navigation/types/AppNavigator.types';

export const screens = {
  /* Navigators */
  AppNavigator: 'AppNavigator',
  AuthNavigator: 'AuthNavigator',

  /* Auth */
  Start: 'Start',
  LogIn: 'LogIn' as keyof NAuthStackParamList,
  SignUp: 'SignUp' as keyof NAuthStackParamList,

  /* Post */
  /* Check and if need delete this row (16) */
  Posts: 'Posts' as keyof NAppStackParamList,

  /* User */
  UserProfile: 'UserProfile' as keyof NAppStackParamList,
};
