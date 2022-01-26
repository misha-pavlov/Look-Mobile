import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Posts, User } from '../../../../../types/graphql';
import Card from '../../../../../components/Card/Card';
import UsersItem from '../components/UserItem/UserItem';
import { screens } from '../../../../../config/screens';
import { NAppNavigatorNavigationProp } from '../../../../../navigation/types/AppNavigator.types';

export const createPostsMap = (array: Posts[], currentUser: User) => {
  const { navigate } = useNavigation<NAppNavigatorNavigationProp<'SoloPost'>>();

  return array?.map(g => (
    <Card key={g._id} post={g} onPress={() => navigate(screens.SoloPost, { post: g, currentUser })} isSearchScreen />
  ));
};

export const createUsersMap = (array: User[], currentUser: User) =>
  array?.map(u => <UsersItem key={u._id} user={u} currentUser={currentUser} />);
