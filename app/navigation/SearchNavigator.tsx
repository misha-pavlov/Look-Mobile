import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import Search from '../screens/Search/Search';
import { defaultScreenOptions } from '../common/defaultScreenOptions';
import SoloPost from '../screens/SoloPost/SoloPost';

const SearchStack = createStackNavigator();

const SearchNavigator = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen options={{ headerShown: false }} name={screens.Search} component={Search} />
    <SearchStack.Screen options={defaultScreenOptions} name={screens.SoloPost} component={SoloPost} />
  </SearchStack.Navigator>
);

export default SearchNavigator;
