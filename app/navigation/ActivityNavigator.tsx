import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import { ActivityContainer } from '../screens/Activity/ActivityContainer';

const ActivityStack = createStackNavigator();

const ActivityNavigator = () => (
  <ActivityStack.Navigator>
    <ActivityStack.Screen options={{ headerShown: false }} name={screens.Activity} component={ActivityContainer} />
  </ActivityStack.Navigator>
);

export default ActivityNavigator;
