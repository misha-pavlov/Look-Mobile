import React from 'react';
import { FollowButtonContainer, FollowButtonText } from './FollowButton.styles';
import { messages } from '../../config/messages';

const FollowButton = ({
  followStatus,
  onPress,
  text,
}: {
  followStatus: boolean;
  onPress: VoidFunction;
  text?: string;
}) => {
  return (
    <FollowButtonContainer followStatus={followStatus} onPress={onPress}>
      {text ? (
        <FollowButtonText followStatus={false}>{text}</FollowButtonText>
      ) : (
        <FollowButtonText followStatus={followStatus}>
          {followStatus ? messages.following : messages.follow}
        </FollowButtonText>
      )}
    </FollowButtonContainer>
  );
};

export default FollowButton;
