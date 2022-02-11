import React, { useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
import { GrayInputBlock, Input, s } from './GrayInput.style';
import { TGrayInput } from './GrayInput.types';
import { colors } from '../../config/colors';
import { messages } from '../../config/messages';
import UserImage from '../UserImage/UserImage';

const GrayInput: React.FC<TGrayInput> = ({
  comment,
  setComment,
  currentUser,
  rightElement,
  isMessagesInput,
  setIsFocus,
}) => {
  const inputRef = useRef<TextInput>();

  useEffect(() => {
    if (setIsFocus) {
      setIsFocus(inputRef.current.isFocused());
    }
  });

  return (
    <GrayInputBlock isMessagesInput={isMessagesInput}>
      {!isMessagesInput && <UserImage uri={currentUser.img} styles={s.img} />}
      <Input
        ref={inputRef}
        value={comment}
        onChangeText={e => setComment(e)}
        placeholder={isMessagesInput ? messages.enterMessage : messages.enterComment}
        placeholderTextColor={colors.gray2}
        multiline
        isMessagesInput={isMessagesInput}
      />
      {rightElement}
    </GrayInputBlock>
  );
};

export default GrayInput;
