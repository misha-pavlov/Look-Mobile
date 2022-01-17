import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPosts from '../screens/MyPosts/MyPosts';

const ActivityStack = createStackNavigator();

const ActivityNavigator = () => (
  <ActivityStack.Navigator>
    <ActivityStack.Screen name={'ActivityNavigatorHeader'} component={MyPosts} />
  </ActivityStack.Navigator>
);

export default ActivityNavigator;
