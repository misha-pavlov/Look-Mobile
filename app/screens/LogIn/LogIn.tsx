import React from 'react';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { BackBlock, SignUpBlock, WelcomeText } from '../SignUp/SignUp.styles';
import { colors } from '../../config/colors';
import { messages } from '../../config/messages';
import LogInForm from './components/LogInForm/LogInForm';
import { ApolloFetchPolicy } from '../../common/apollo';
import { GET_USERS } from '../../gql/user/user.queries';

const LogIn = () => {
  const { goBack } = useNavigation();
  const { data } = useQuery(GET_USERS, { fetchPolicy: ApolloFetchPolicy.CacheAndNetwork });

  return (
    <SignUpBlock>
      <BackBlock onPress={goBack}>
        <Octicons name="x" size={26} color={colors.white} />
      </BackBlock>
      <WelcomeText>{messages.welcomeBack}</WelcomeText>
      <LogInForm users={data?.users} />
    </SignUpBlock>
  );
};

export default LogIn;
