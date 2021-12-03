import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import Start from '../screens/Start/Start';
import SignUp from '../screens/SignUp/SignUp';
import LogIn from '../screens/LogIn/LogIn';

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name={screens.Start} component={Start} />
    <AuthStack.Screen name={screens.LogIn} component={LogIn} />
    <AuthStack.Screen name={screens.SignUp} component={SignUp} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
