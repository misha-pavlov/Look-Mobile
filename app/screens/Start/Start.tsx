import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../config/colors';
import { GrayText, PurpleText, StartBlock, StartText, TextBlock } from './Start.styles';
import { messages } from '../../config/messages';
import PurpleButton from '../../components/PurpleButton/PurpleButton';
import { CenterBlock } from '../../common/common.styles';

const Start = () => {
  return (
    <StartBlock>
      <CenterBlock>
        <MaterialIcons name="looks" size={110} color={colors.blue} />
      </CenterBlock>
      <StartText>{messages.appName}</StartText>
      <PurpleButton text={messages.signUp} />
      <TextBlock>
        <GrayText>{messages.haveAnAccount}</GrayText>
        <TouchableOpacity>
          <PurpleText>{messages.signIn}</PurpleText>
        </TouchableOpacity>
      </TextBlock>
    </StartBlock>
  );
};

export default Start;
