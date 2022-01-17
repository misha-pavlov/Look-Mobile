import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// constants
import { screens } from '../config/screens';
import { messages } from '../config/messages';
// helpers
import { defaultScreenOptions, screenOptionsWithTitle } from '../common/defaultScreenOptions';
// screens
import CreatePost from '../screens/CreatePost/CreatePost';
import { UserProfileContainer } from '../screens/UserProfile/UserProfileContainer';
import UserSettings from '../screens/UserSettings/UserSettings';
import { UserPostsListContainer } from '../screens/UserPostsList/UserPostsListContainer';
import { EditProfileContainer } from '../screens/EditProfile/EditProfileContainer';
import { ChangePasswordContainer } from '../screens/ChangePassword/ChangePasswordContainer';
import { BlockedUsersContainer } from '../screens/BlockedUsers/BlockedUsersContainer';
import { MyPostsContainer } from '../screens/MyPosts/MyPostsContainer';

const FeedStack = createStackNavigator();

const FeedNavigator = () => (
  <FeedStack.Navigator>
    <FeedStack.Screen options={{ headerShown: false }} name={screens.Posts} component={MyPostsContainer} />
    <FeedStack.Screen options={defaultScreenOptions} name={screens.UserProfile} component={UserProfileContainer} />
    <FeedStack.Screen options={defaultScreenOptions} name={screens.CreatePost} component={CreatePost} />
    <FeedStack.Screen
      options={screenOptionsWithTitle(messages.settings)}
      name={screens.UserSettings}
      component={UserSettings}
    />
    <FeedStack.Screen options={defaultScreenOptions} name={screens.UserPostsList} component={UserPostsListContainer} />
    <FeedStack.Screen
      options={screenOptionsWithTitle(messages.editProfile)}
      name={screens.EditProfile}
      component={EditProfileContainer}
    />
    <FeedStack.Screen
      options={screenOptionsWithTitle(messages.changePassword)}
      name={screens.ChangePassword}
      component={ChangePasswordContainer}
    />
    <FeedStack.Screen
      options={screenOptionsWithTitle(messages.blockedUsers)}
      name={screens.BlockedUsers}
      component={BlockedUsersContainer}
    />
  </FeedStack.Navigator>
);

export default FeedNavigator;
