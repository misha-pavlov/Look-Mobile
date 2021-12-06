import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import Posts from '../screens/Posts/Posts';
import UserProfile from '../screens/UserProfile/UserProfile';

const AppStack = createStackNavigator();

const AppNavigator = () => (
  <AppStack.Navigator>
    <AppStack.Screen options={{ headerShown: false }} name={screens.Posts} component={Posts} />
    <AppStack.Screen name={screens.UserProfile} component={UserProfile} />
  </AppStack.Navigator>
);

export default AppNavigator;
