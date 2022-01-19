import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import Search from '../screens/Search/Search';

const SearchStack = createStackNavigator();

const SearchNavigator = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen options={{ headerShown: false }} name={screens.Search} component={Search} />
  </SearchStack.Navigator>
);

export default SearchNavigator;
