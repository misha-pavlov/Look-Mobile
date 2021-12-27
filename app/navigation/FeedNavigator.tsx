import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import Posts from '../screens/Posts/Posts';
import CreatePost from '../screens/CreatePost/CreatePost';
import { defaultScreenOptions, screenOptionsWithTitle } from '../common/defaultScreenOptions';
import { UserProfileContainer } from '../screens/UserProfile/UserProfileContainer';
import UserSettings from '../screens/UserSettings/UserSettings';
import { messages } from '../config/messages';

const FeedStack = createStackNavigator();

const FeedNavigator = () => (
  <FeedStack.Navigator>
    <FeedStack.Screen options={{ headerShown: false }} name={screens.Posts} component={Posts} />
    <FeedStack.Screen options={defaultScreenOptions} name={screens.UserProfile} component={UserProfileContainer} />
    <FeedStack.Screen options={defaultScreenOptions} name={screens.CreatePost} component={CreatePost} />
    <FeedStack.Screen
      options={screenOptionsWithTitle(messages.settings)}
      name={screens.UserSettings}
      component={UserSettings}
    />
  </FeedStack.Navigator>
);

export default FeedNavigator;
