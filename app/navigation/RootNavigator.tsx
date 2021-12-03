import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { screens } from '../config/screens';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={screens.AuthNavigator} component={AuthNavigator} />
      <RootStack.Screen name={screens.AppNavigator} component={AppNavigator} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
