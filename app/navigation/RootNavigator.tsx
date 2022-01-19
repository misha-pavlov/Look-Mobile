import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './AppNavigator';
import { screens } from '../config/screens';
import Start from '../screens/Start/Start';
import LogIn from '../screens/LogIn/LogIn';
import SignUp from '../screens/SignUp/SignUp';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={screens.Start} component={Start} />
      <RootStack.Screen name={screens.LogIn} component={LogIn} />
      <RootStack.Screen name={screens.SignUp} component={SignUp} />
      <RootStack.Screen name={screens.AppNavigator} component={AppNavigator} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
