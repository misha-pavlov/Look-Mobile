import React, { useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GrayInputBlock, Input, ReplyBlock, ReplyText, CancelReplyBlock, s } from './GrayInput.style';
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
  replyMessage,
  setIsReplyMessage,
}) => {
  const inputRef = useRef<TextInput>();

  useEffect(() => {
    if (setIsFocus) {
      setIsFocus(inputRef.current.isFocused());
    }
  });

  return (
    <>
      {replyMessage && (
        <ReplyBlock>
          <ReplyText>{replyMessage}</ReplyText>
          <CancelReplyBlock onPress={() => setIsReplyMessage(false)}>
            <MaterialIcons name="cancel" size={20} color={colors.white} />
          </CancelReplyBlock>
        </ReplyBlock>
      )}
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
    </>
  );
};

export default GrayInput;
