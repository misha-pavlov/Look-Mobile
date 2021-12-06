import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Posts from '../screens/Posts/Posts';

const ActivityStack = createStackNavigator();

const ActivityNavigator = () => (
  <ActivityStack.Navigator>
    <ActivityStack.Screen name={'ActivityNavigatorHeader'} component={Posts} />
  </ActivityStack.Navigator>
);

export default ActivityNavigator;
