import React from 'react';
import { AddTagsButton, AddTagsText } from './AddButtonText.styles';

const AddButtonText = ({ text, onPress }: { text: string; onPress: VoidFunction }) => {
  return (
    <AddTagsButton onPress={onPress}>
      <AddTagsText>{text}</AddTagsText>
    </AddTagsButton>
  );
};

export default AddButtonText;
