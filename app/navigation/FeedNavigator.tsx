import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import Posts from '../screens/Posts/Posts';
import UserProfile from '../screens/UserProfile/UserProfile';
import CreatePost from '../screens/CreatePost/CreatePost';

const FeedStack = createStackNavigator();

const FeedNavigator = () => (
  <FeedStack.Navigator>
    <FeedStack.Screen options={{ headerShown: false }} name={screens.Posts} component={Posts} />
    <FeedStack.Screen name={screens.UserProfile} component={UserProfile} />
    <FeedStack.Screen name={screens.CreatePost} component={CreatePost} />
  </FeedStack.Navigator>
);

export default FeedNavigator;
