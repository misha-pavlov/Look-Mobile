import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { screens } from '../config/screens';
import Start from '../screens/Start/Start';

const AuthStack = createStackNavigator();

const g = () => {
  return (
    <View style={{ marginTop: 150 }}>
      <Text>!Login</Text>
    </View>
  );
};

const AuthNavigation = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name={screens.Start}
      component={Start}
      options={{
        headerShown: false,
      }}
    />
    <AuthStack.Screen name={screens.LogIn} component={g} />
    <AuthStack.Screen name={screens.SignUp} component={g} />
  </AuthStack.Navigator>
);

export default AuthNavigation;
