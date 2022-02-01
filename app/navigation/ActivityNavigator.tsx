import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import { ActivityContainer } from '../screens/Activity/ActivityContainer';
import { defaultScreenOptions } from '../common/defaultScreenOptions';
import { UserProfileContainer } from '../screens/UserProfile/UserProfileContainer';
import SoloPost from '../screens/SoloPost/SoloPost';

const ActivityStack = createStackNavigator();

const ActivityNavigator = () => (
  <ActivityStack.Navigator>
    <ActivityStack.Screen options={{ headerShown: false }} name={screens.Activity} component={ActivityContainer} />
    <ActivityStack.Screen options={defaultScreenOptions} name={screens.UserProfile} component={UserProfileContainer} />
    <ActivityStack.Screen options={defaultScreenOptions} name={screens.SoloPost} component={SoloPost} />
  </ActivityStack.Navigator>
);

export default ActivityNavigator;
