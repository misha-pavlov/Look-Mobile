import React from 'react';
import { ActivityIndicator } from 'react-native';
import { BlackBlock } from '../../common/common.styles';

const Spinner = ({ withMarginTop }: { withMarginTop?: boolean }) => {
  return (
    <BlackBlock withMarginTop={withMarginTop}>
      <ActivityIndicator />
    </BlackBlock>
  );
};

export default Spinner;
