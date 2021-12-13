import React from 'react';
import { PurpleButtonBlock, PurpleButtonText } from './PurpleButton.styles';

type TPurpleButton = {
  text: string;
  onPress: VoidFunction;
  isCreatePostScreen?: boolean;
};

const PurpleButton: React.FC<TPurpleButton> = ({ text, onPress, isCreatePostScreen }) => {
  return (
    <PurpleButtonBlock onPress={onPress} isCreatePostScreen={isCreatePostScreen}>
      <PurpleButtonText>{text}</PurpleButtonText>
    </PurpleButtonBlock>
  );
};

export default PurpleButton;
