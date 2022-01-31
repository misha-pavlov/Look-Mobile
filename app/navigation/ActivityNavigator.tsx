import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import Activity from '../screens/Activity/Activity';

const ActivityStack = createStackNavigator();

const ActivityNavigator = () => (
  <ActivityStack.Navigator>
    <ActivityStack.Screen options={{ headerShown: false }} name={screens.Activity} component={Activity} />
  </ActivityStack.Navigator>
);

export default ActivityNavigator;
