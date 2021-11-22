import { NAuthStackParamList } from '../navigation/types/AuthNavigator.types';

export const screens = {
  /* Auth */
  Start: 'Start',
  LogIn: 'LogIn' as keyof NAuthStackParamList,
  SignUp: 'SignUp' as keyof NAuthStackParamList,
};
