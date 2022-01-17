import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPosts from '../screens/MyPosts/MyPosts';

const SearchStack = createStackNavigator();

const SearchNavigator = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name={'SearchNavigatorHeader'} component={MyPosts} />
  </SearchStack.Navigator>
);

export default SearchNavigator;
