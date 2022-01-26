import React from 'react';
import { Posts, User } from '../../../../../types/graphql';
import Card from '../../../../../components/Card/Card';
import UsersItem from '../components/UserItem/UserItem';

export const createPostsMap = (array: Posts[]) =>
  array?.map(g => <Card key={g._id} post={g} onPress={() => console.log('123')} isSearchScreen />);

export const createUsersMap = (array: User[], currentUser: User) =>
  array?.map(u => <UsersItem key={u._id} user={u} currentUser={currentUser} />);
