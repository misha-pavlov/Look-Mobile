import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'react-native-elements';
import { Entypo, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useMutation } from 'react-apollo';
import { ErrorText, InputBlock, s } from './SignUpForm.styles';
import { colors } from '../../../../config/colors';
import PurpleButton from '../../../../components/PurpleButton/PurpleButton';
import { messages } from '../../../../config/messages';
import { ADD_USER } from '../../gql/SignUp.mutations';
import { GET_USERS } from '../../../LogIn/gql/LogIn.queries';

const SignUpForm = () => {
  const name = 'name';
  const email = 'email';
  const password = 'password';
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    formErrors: { name: '', email: '', password: '' },
  });
  const [mutate] = useMutation(ADD_USER, { onError: error => console.log('ADD_USER = ', error) });
  const navigation = useNavigation();

  const validateField = (text: string, field: string) => {
    let fieldValidationErrors = state.formErrors;
    let nameValid = false;
    let emailValid: RegExpMatchArray = null;
    let passwordValid = false;

    switch (field) {
      case name:
        nameValid = text.length >= 4;
        fieldValidationErrors.name = nameValid ? '' : 'Name is too short';
        break;
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
    const { name, email, password } = state;
    mutate({
      variables: {
        userName: name,
        email,
        password,
      },
      refetchQueries: [{ query: GET_USERS }],
    });
    navigation.goBack();
  };

  return (
    <View>
      <InputBlock>
        <Input
          placeholder="Name"
          leftIcon={<FontAwesome name="user-secret" size={24} color={colors.gray1} />}
          onChangeText={e => handleEdit(e, name)}
          value={state.name}
          style={s.input}
          placeholderTextColor={colors.white}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {state.formErrors.name !== '' && <ErrorText>{state.formErrors.name}</ErrorText>}
      </InputBlock>
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
        />
        {state.formErrors.password !== '' && <ErrorText>{state.formErrors.password}</ErrorText>}
      </InputBlock>

      <PurpleButton text={messages.signUp} onPress={onSubmit} />
    </View>
  );
};

export default SignUpForm;
