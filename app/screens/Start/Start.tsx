import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../config/colors';
import { GrayText, PurpleText, StartBlock, StartText, TextBlock } from './Start.styles';
import { messages } from '../../config/messages';
import PurpleButton from '../../components/PurpleButton/PurpleButton';
import { CenterBlock } from '../../common/common.styles';
import { screens } from '../../config/screens';
import { NAuthNavigatorNavigationProp } from '../../navigation/types/AuthNavigator.types';

const Start = () => {
  const { navigate } = useNavigation<NAuthNavigatorNavigationProp<'AppNavigator'>>();

  return (
    <StartBlock>
      <CenterBlock>
        <MaterialIcons name="looks" size={110} color={colors.blue} />
      </CenterBlock>
      <StartText>{messages.appName}</StartText>
      <PurpleButton text={messages.signUp} onPress={() => navigate(screens.SignUp)} />
      <TextBlock>
        <GrayText>{messages.haveAnAccount}</GrayText>
        <TouchableOpacity onPress={() => navigate(screens.LogIn)}>
          <PurpleText>{messages.logIn}</PurpleText>
        </TouchableOpacity>
      </TextBlock>
    </StartBlock>
  );
};

export default Start;
