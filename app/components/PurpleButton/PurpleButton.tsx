import React from 'react';
import { PurpleButtonBlock, PurpleButtonText } from './PurpleButton.styles';

type TPurpleButton = {
  text: string;
  onPress: VoidFunction;
};

const PurpleButton: React.FC<TPurpleButton> = ({ text, onPress }) => {
  return (
    <PurpleButtonBlock onPress={onPress}>
      <PurpleButtonText>{text}</PurpleButtonText>
    </PurpleButtonBlock>
  );
};

export default PurpleButton;
