import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Posts from '../screens/Posts/Posts';

const ChatStack = createStackNavigator();

const ChatNavigator = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen name={'ChatNavigatorHeader'} component={Posts} />
  </ChatStack.Navigator>
);

export default ChatNavigator;
