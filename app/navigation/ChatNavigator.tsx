import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import { ChatsContainer } from '../screens/Chats/ChatsContainer';
import AddChat from '../screens/AddChat/AddChat';
import { defaultScreenOptions, screenOptionsWithTitle } from '../common/defaultScreenOptions';
import { messages } from '../config/messages';
import { ChatContainer } from '../screens/Chat/ChatContainer';
import { UserProfileContainer } from '../screens/UserProfile/UserProfileContainer';

const ChatStack = createStackNavigator();

const ChatNavigator = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen options={{ headerShown: false }} name={screens.Chats} component={ChatsContainer} />
    <ChatStack.Screen
      options={screenOptionsWithTitle(messages.selectUserForChat)}
      name={screens.AddChat}
      component={AddChat}
    />
    <ChatStack.Screen options={{ headerShown: false }} name={screens.Chat} component={ChatContainer} />
    <ChatStack.Screen options={defaultScreenOptions} name={screens.UserProfile} component={UserProfileContainer} />
  </ChatStack.Navigator>
);

export default ChatNavigator;
