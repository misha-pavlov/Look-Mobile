import React from 'react';
import { ActivityIndicator } from 'react-native';
import { LoadingScreenContainer } from './LoadingScreen.styles';

const LoadingScreen = () => {
  return (
    <LoadingScreenContainer>
      <ActivityIndicator size={'large'} />
    </LoadingScreenContainer>
  );
};

export default LoadingScreen;
