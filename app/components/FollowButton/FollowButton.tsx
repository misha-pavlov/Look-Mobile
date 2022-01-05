import React from 'react';
import { FollowButtonContainer, FollowButtonText } from './FollowButton.styles';
import { messages } from '../../config/messages';

const FollowButton = ({ followStatus, onPress }: { followStatus: boolean; onPress: VoidFunction }) => {
  return (
    <FollowButtonContainer followStatus={followStatus} onPress={onPress}>
      <FollowButtonText followStatus={followStatus}>
        {followStatus ? messages.following : messages.follow}
      </FollowButtonText>
    </FollowButtonContainer>
  );
};

export default FollowButton;
