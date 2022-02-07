import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import { ChatsContainer } from '../screens/Chats/ChatsContainer';
import AddChat from '../screens/AddChat/AddChat';
import { screenOptionsWithTitle } from '../common/defaultScreenOptions';
import { messages } from '../config/messages';

const ChatStack = createStackNavigator();

const ChatNavigator = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen options={{ headerShown: false }} name={screens.Chats} component={ChatsContainer} />
    <ChatStack.Screen
      options={screenOptionsWithTitle(messages.selectUserForChat)}
      name={screens.AddChat}
      component={AddChat}
    />
  </ChatStack.Navigator>
);

export default ChatNavigator;
