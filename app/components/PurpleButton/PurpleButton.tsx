import React from 'react';
import { PurpleButtonBlock, PurpleButtonText } from './PurpleButton.styles';

type TPurpleButton = {
  text: string;
};

const PurpleButton: React.FC<TPurpleButton> = ({ text }) => {
  return (
    <PurpleButtonBlock>
      <PurpleButtonText>{text}</PurpleButtonText>
    </PurpleButtonBlock>
  );
};

export default PurpleButton;
