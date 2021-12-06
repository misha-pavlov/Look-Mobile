import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { screens } from '../config/screens';
import FeedNavigator from './FeedNavigator';
import ChatNavigator from './ChatNavigator';
import ActivityNavigator from './ActivityNavigator';
import SearchNavigator from './SearchNavigator';
import { colors } from '../config/colors';
import { s } from './navigation.styles';

const AppTab = createBottomTabNavigator();

const AppNavigator = () => (
  <AppTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: s.bottomTabs,
    }}>
    <AppTab.Screen
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather name="tablet" size={25} color={focused ? colors.purple1 : colors.gray1} />
        ),
      }}
      name={screens.FeedNavigator}
      component={FeedNavigator}
    />
    <AppTab.Screen
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons name="chatbubble-outline" size={25} color={focused ? colors.purple1 : colors.gray1} />
        ),
      }}
      name={screens.ChatNavigator}
      component={ChatNavigator}
    />
    <AppTab.Screen
      options={{
        tabBarIcon: ({ focused }) => (
          <AntDesign name="hearto" size={25} color={focused ? colors.purple1 : colors.gray1} />
        ),
      }}
      name={screens.ActivityNavigator}
      component={ActivityNavigator}
    />
    <AppTab.Screen
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather name="search" size={25} color={focused ? colors.purple1 : colors.gray1} />
        ),
      }}
      name={screens.SearchNavigator}
      component={SearchNavigator}
    />
  </AppTab.Navigator>
);

export default AppNavigator;
