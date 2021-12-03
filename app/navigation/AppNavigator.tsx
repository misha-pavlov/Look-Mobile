import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import Posts from '../screens/Posts/Posts';

const AppStack = createStackNavigator();

const AppNavigator = () => (
  <AppStack.Navigator>
    <AppStack.Screen options={{ headerShown: false }} name={screens.Posts} component={Posts} />
  </AppStack.Navigator>
);

export default AppNavigator;
