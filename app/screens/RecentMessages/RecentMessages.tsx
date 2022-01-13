import React from 'react';
import { DefaultContainer } from '../../common/common.styles';
import { TRecentMessages } from './RecentMessages.types';
import HeaderWithUser from '../../components/HeaderWithUser/HeaderWithUser';

const RecentMessages: React.FC<TRecentMessages> = ({}) => {
  return (
    <DefaultContainer>
      <HeaderWithUser />
    </DefaultContainer>
  );
};

export default RecentMessages;
