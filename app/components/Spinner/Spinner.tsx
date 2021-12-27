import React from 'react';
import { ActivityIndicator } from 'react-native';
import { BlackBlock } from '../../common/common.styles';

const Spinner = () => {
  return (
    <BlackBlock>
      <ActivityIndicator />
    </BlackBlock>
  );
};

export default Spinner;
