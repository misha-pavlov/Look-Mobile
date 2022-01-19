import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import PurpleButton from '../../../../components/PurpleButton/PurpleButton';
import { messages } from '../../../../config/messages';
import { ErrorText, InputBlock, s } from '../../../SignUp/components/SignUpForm/SignUpForm.styles';
import { colors } from '../../../../config/colors';
import { screens } from '../../../../config/screens';
import { TLogInForm } from '../../LogIn.types';
import { NAuthNavigatorNavigationProp } from '../../../../navigation/types/AuthNavigator.types';

const LogInForm: React.FC<TLogInForm> = ({ users }) => {
  const email = 'email';
  const password = 'password';
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
    formErrors: { email: '', password: '' },
  });
  const navigation = useNavigation<NAuthNavigatorNavigationProp<'AppNavigator'>>();

  const validateField = (text: string, field: string) => {
    let fieldValidationErrors = state.formErrors;
    let emailValid: RegExpMatchArray = null;
    let passwordValid = false;

    switch (field) {
      case email:
        emailValid = text.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
        break;
      case password:
        passwordValid = text.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : 'Password is too short';
        break;
      default:
        break;
    }
    setState({ ...state, formErrors: fieldValidationErrors });
  };

  const handleEdit = (text: string, field: string) => {
    validateField(text, field);
    setState({ ...state, [field]: text });
  };

  const onSubmit = () => {
    users.find(u => {
      if (u.email === state.email) {
        if (u.password === state.password) {
          setState({ ...state, formErrors: { email: '', password: '' } });
          AsyncStorage.setItem('userId', u._id).then(() => navigation.navigate(screens.AppNavigator));
          return;
        }
        setState({ ...state, formErrors: { email: state.formErrors.email, password: 'Incorrect password' } });
        return;
      }
      setState({ ...state, formErrors: { password: state.formErrors.password, email: 'Incorrect email' } });
      return;
    });
  };

  return (
    <View>
      <InputBlock>
        <Input
          placeholder="Email"
          leftIcon={<Entypo name="email" size={24} color={colors.gray1} />}
          onChangeText={e => handleEdit(e, email)}
          value={state.email}
          style={s.input}
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholderTextColor={colors.white}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {state.formErrors.email !== '' && <ErrorText>{state.formErrors.email}</ErrorText>}
      </InputBlock>
      <InputBlock>
        <Input
          placeholder="Password"
          leftIcon={<Ionicons name="lock-closed" size={24} color={colors.gray1} />}
          rightIcon={
            showPassword ? (
              <MaterialIcons
                name="visibility-off"
                size={24}
                color={colors.gray1}
                onPress={() => setShowPassword(!showPassword)}
              />
            ) : (
              <MaterialIcons
                name="visibility"
                size={24}
                color={colors.gray1}
                onPress={() => setShowPassword(!showPassword)}
              />
            )
          }
          onChangeText={e => handleEdit(e, password)}
          value={state.password}
          style={s.input}
          secureTextEntry={!showPassword}
          placeholderTextColor={colors.white}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {state.formErrors.password !== '' && <ErrorText>{state.formErrors.password}</ErrorText>}
      </InputBlock>

      <PurpleButton text={messages.logIn} onPress={onSubmit} />
    </View>
  );
};

export default LogInForm;
