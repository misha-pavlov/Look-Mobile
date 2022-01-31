import React from 'react';
import { DefaultContainer } from '../../common/common.styles';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import { screens } from '../../config/screens';

const Activity = () => {
  return (
    <DefaultContainer>
      <ScreenHeader text={screens.Activity} />
    </DefaultContainer>
  );
};

export default Activity;
