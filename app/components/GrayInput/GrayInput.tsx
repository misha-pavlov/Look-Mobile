import React from 'react';
import { GrayInputBlock, Input, s } from './GrayInput.style';
import { TGrayInput } from './GrayInput.types';
import { colors } from '../../config/colors';
import { messages } from '../../config/messages';
import UserImage from '../UserImage/UserImage';

const GrayInput: React.FC<TGrayInput> = ({ comment, setComment, currentUser, rightElement }) => {
  return (
    <GrayInputBlock>
      <UserImage uri={currentUser.img} styles={s.img} />
      <Input
        value={comment}
        onChangeText={e => setComment(e)}
        placeholder={messages.enterComment}
        placeholderTextColor={colors.gray2}
        multiline
      />
      {rightElement}
    </GrayInputBlock>
  );
};

export default GrayInput;
