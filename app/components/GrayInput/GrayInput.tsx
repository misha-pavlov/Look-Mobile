import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { GrayInputBlock, Input, s } from './GrayInput.style';
import { TGrayInput } from './GrayInput.types';
import { colors } from '../../config/colors';
import { common } from '../../common/common.styles';
import { messages } from '../../config/messages';

const GrayInput: React.FC<TGrayInput> = ({ comment, setComment, currentUser, rightElement }) => {
  return (
    <GrayInputBlock>
      <Image
        source={{
          uri: currentUser.img,
        }}
        style={s.img}
        PlaceholderContent={<ActivityIndicator color={colors.white} />}
        placeholderStyle={common.placeholder}
      />
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
