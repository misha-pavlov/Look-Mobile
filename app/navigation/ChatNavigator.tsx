import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RecentMessagesContainer } from '../screens/RecentMessages/RecentMessagesContainer';
import { screens } from '../config/screens';

const ChatStack = createStackNavigator();

const ChatNavigator = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen
      options={{ headerShown: false }}
      name={screens.RecentMessages}
      component={RecentMessagesContainer}
    />
  </ChatStack.Navigator>
);

export default ChatNavigator;
