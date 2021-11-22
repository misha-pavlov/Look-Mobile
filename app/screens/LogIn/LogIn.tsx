import React from 'react';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BackBlock, SignUpBlock, WelcomeText } from '../SignUp/SignUp.styles';
import { colors } from '../../config/colors';
import { messages } from '../../config/messages';
import LogInForm from './components/LogInForm/LogInForm';

const LogIn = () => {
  const { goBack } = useNavigation();

  return (
    <SignUpBlock>
      <BackBlock onPress={goBack}>
        <Octicons name="x" size={26} color={colors.white} />
      </BackBlock>
      <WelcomeText>{messages.welcomeBack}</WelcomeText>
      <LogInForm />
    </SignUpBlock>
  );
};

export default LogIn;
