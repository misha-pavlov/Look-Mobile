import React, { useEffect, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './AppNavigator';
import { screens } from '../config/screens';
import Start from '../screens/Start/Start';
import LogIn from '../screens/LogIn/LogIn';
import SignUp from '../screens/SignUp/SignUp';
import { useUserId } from '../hooks/useUserId';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const [isUserLogged, setIsUserLogged] = useState(undefined);
  const isFirstRender = useRef(true);
  const { userId, loading } = useUserId();

  useEffect(() => {
    if (userId && !isFirstRender.current) {
      setIsUserLogged(true);
      return null;
    }
    setIsUserLogged(false);
    isFirstRender.current = false;
  }, [userId]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isUserLogged ? (
        <>
          <RootStack.Screen name={screens.AppNavigator} component={AppNavigator} />
          <RootStack.Screen name={screens.Start} component={Start} />
        </>
      ) : (
        <>
          <RootStack.Screen name={screens.Start} component={Start} />
          <RootStack.Screen name={screens.AppNavigator} component={AppNavigator} />
        </>
      )}
      <RootStack.Screen name={screens.LogIn} component={LogIn} />
      <RootStack.Screen name={screens.SignUp} component={SignUp} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
