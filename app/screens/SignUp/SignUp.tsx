import React from 'react';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BackBlock, SignUpBlock, WelcomeText } from './SignUp.styles';
import { colors } from '../../config/colors';
import { messages } from '../../config/messages';
import SignUpForm from './components/SignUpForm/SignUpForm';

const SignUp = () => {
  const { goBack } = useNavigation();

  return (
    <SignUpBlock>
      <BackBlock onPress={goBack}>
        <Octicons name="x" size={26} color={colors.white} />
      </BackBlock>
      <WelcomeText>{messages.welcome}</WelcomeText>
      <SignUpForm />
    </SignUpBlock>
  );
};

export default SignUp;
