import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
// constants
import { screens } from '../config/screens';
import { colors } from '../config/colors';
// navigators
import FeedNavigator from './FeedNavigator';
import ChatNavigator from './ChatNavigator';
import ActivityNavigator from './ActivityNavigator';
import SearchNavigator from './SearchNavigator';
// styles
import { s } from './navigation.styles';
// hocs
import { withCurrentUser } from '../hocs/withCurrentUser';
// types
import { User } from '../types/graphql';
// graphql
import { HAS_UNREAD_ACTIVITIES } from '../gql/activity/activity.queries';
// components
import ActivityIcon from './components/ActivityIcon/ActivityIcon';
import { HAS_UNREAD_CHATS } from '../gql/chat/chat.queries';

const AppTab = createBottomTabNavigator();

const AppNavigator = (currentUser: { currentUser?: User }) => {
  const userId = currentUser.currentUser._id;
  const { data } = useQuery(HAS_UNREAD_ACTIVITIES, { variables: { userId }, skip: !userId, pollInterval: 5000 });
  const { data: dataChats } = useQuery(HAS_UNREAD_CHATS, { variables: { userId }, skip: !userId, pollInterval: 5000 });

  return (
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
            <ActivityIcon focused={focused} showBullet={dataChats?.hasUnreadChats} isChatIcon />
          ),
        }}
        name={screens.ChatNavigator}
        component={ChatNavigator}
      />
      <AppTab.Screen
        options={{
          tabBarIcon: ({ focused }) => <ActivityIcon focused={focused} showBullet={data?.hasUnreadActivities} />,
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
};

export default withCurrentUser(AppNavigator);
