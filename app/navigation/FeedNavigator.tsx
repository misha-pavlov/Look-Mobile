import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import Posts from '../screens/Posts/Posts';
import CreatePost from '../screens/CreatePost/CreatePost';
import { defaultScreenOptions } from '../common/defaultScreenOptions';
import { UserProfileContainer } from '../screens/UserProfile/UserProfileContainer';

const FeedStack = createStackNavigator();

const FeedNavigator = () => (
  <FeedStack.Navigator>
    <FeedStack.Screen options={{ headerShown: false }} name={screens.Posts} component={Posts} />
    <FeedStack.Screen options={defaultScreenOptions} name={screens.UserProfile} component={UserProfileContainer} />
    <FeedStack.Screen options={defaultScreenOptions} name={screens.CreatePost} component={CreatePost} />
  </FeedStack.Navigator>
);

export default FeedNavigator;
