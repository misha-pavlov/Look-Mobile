import React from 'react';
import { View } from 'react-native';
import { ScreenHeaderText } from './ScreenHeader.styles';

const ScreenHeader = ({ text }: { text: string }) => {
  return (
    <View>
      <ScreenHeaderText>{text}</ScreenHeaderText>
    </View>
  );
};

export default ScreenHeader;
