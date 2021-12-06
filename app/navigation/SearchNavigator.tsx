import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Posts from '../screens/Posts/Posts';

const SearchStack = createStackNavigator();

const SearchNavigator = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name={'SearchNavigatorHeader'} component={Posts} />
  </SearchStack.Navigator>
);

export default SearchNavigator;
