import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type NAppStackParamList = {
  Posts: undefined;
  UserProfile: undefined;
  CreatePost: undefined;
  UserSettings: undefined;
  UserPostsList: undefined;
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
