import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import { ChatsContainer } from '../screens/Chats/ChatsContainer';

const ChatStack = createStackNavigator();

const ChatNavigator = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen options={{ headerShown: false }} name={screens.Chats} component={ChatsContainer} />
  </ChatStack.Navigator>
);

export default ChatNavigator;
