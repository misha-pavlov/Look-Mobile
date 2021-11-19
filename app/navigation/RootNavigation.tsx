import React from 'react';
import { View, Text } from 'react-native';
import AuthNavigation from './AuthNavigation';

const RootNavigation = ({ isUserAuthorized }: { isUserAuthorized?: boolean }) => {
  return isUserAuthorized ? (
    <View>
      <Text>isUserAuthorized</Text>
    </View>
  ) : (
    <AuthNavigation />
  );
};

export default RootNavigation;
